import Handlebars from 'handlebars/dist/cjs/handlebars';
import PageScroller from '../modules/pageScroller';

const html = `
<div id="block-2" class="block-2 absolute-wrapper landing-block">
    <div id="block-2-circle-plate" class="block-2-circle plate hide"></div>
    <svg id="block-2-circle" class="lighting-stroke block-2-circle" viewBox="0 0 100 100"><circle r="50" cx="50" cy="50"/></svg>
    <svg id="block-2-circle-shadow" class="lighting-stroke block-2-circle" viewBox="0 0 100 100"><circle r="50" cx="50" cy="50"/></svg>
</div>

<div id="block-1" class="block-1 absolute-wrapper landing-block">
    <div id="block-1-left" class="block-1-plate left fullsize"></div>
    <div id="block-1-right" class="block-1-plate right fullsize"></div>
    <div id="block-1-line-left" class="divide-line left animate"></div>
    <div id="block-1-line-right" class="divide-line right animate"></div>
</div>
`;

const divideLinesWidth = 1.5;
const divideLinesBetween = 1;
const divideLinesXOffset = 7;

const block2CircleViewPortDiameter = 50;

const block2CircleDiameter = 150;
const block2CircleMaxScale = Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight) / block2CircleDiameter * 1.5;
/**
 * Renders profile page and "activating" it's js
 *
 * @param {object} element html element to be rendered in
 * @param {object} app object of a main App class
 */
export async function handler(element, app) {
    const response = await app.apiGet('/user');
    let username, avatarUrl;
    if (response.ok) {
        const data = await response.json();
        ({ username, avatarUrl } = data);
        app.storage.username = username;
        app.storage.avatarUrl = avatarUrl;
    }
    // --- Render page
    const template = Handlebars.compile(html);
    element.innerHTML = template({
        username: username,
        avatarUrl: (avatarUrl?.length > 0) ? app.apiUrl + '/' + avatarUrl : app.defaultAvatarUrl
    });
    element.classList.add('landing');

    // --- Start page logic
    const block1Left = document.getElementById('block-1-left');
    const block1Right = document.getElementById('block-1-right');
    const block1LineLeft = document.getElementById('block-1-line-left');
    const block1LineRight = document.getElementById('block-1-line-right');

    const block2Circle = document.getElementById('block-2-circle');
    const block2CircleShadow = document.getElementById('block-2-circle-shadow');
    const block2CirclePlate = document.getElementById('block-2-circle-plate');

    setTimeout(() => block1LineLeft.classList.remove('animate'), 500);
    setTimeout(() => block1LineRight.classList.remove('animate'), 750);

    const Scroller = new PageScroller();
    Scroller.setHandlers([
        // --- Block 1
        { // left plate goes to left
            onstart: () => {
                block1LineLeft.classList.remove('hide');
                block1Left.classList.remove('hide');
            },
            onprogress: (progress) => {
                const reProgress = 1 - progress;
                block1LineLeft.classList.remove('animate');
                block1LineLeft.style.clipPath = `polygon(${(50 - divideLinesBetween / 2 - divideLinesWidth + divideLinesXOffset) * reProgress}% 0%,  ${(50 - divideLinesBetween / 2 + divideLinesXOffset) * reProgress}% 0%,  ${(50 - divideLinesBetween / 2 - divideLinesXOffset) * reProgress}% 100%,  ${(50 - divideLinesBetween / 2 - divideLinesWidth - divideLinesXOffset) * reProgress}% 100%)`;
                block1Left.style.clipPath = `polygon(0% 0%, ${(50 - divideLinesBetween / 2 - divideLinesWidth + divideLinesXOffset) * reProgress}% 0%,  ${(50 - divideLinesBetween / 2 - divideLinesWidth - divideLinesXOffset) * reProgress}% 100%, 0% 100%)`;
            },
            onendTop: () => {
            },
            onendBottom: () => {
                block1LineLeft.classList.add('hide');
                block1Left.classList.add('hide');
            }
        },
        { // right plate goes to right
            onstart: () => {
                block1LineRight.classList.remove('hide');
                block1Right.classList.remove('hide');
            },
            onprogress: (progress) => {
                progress = 100 / (50 + divideLinesBetween / 2 - divideLinesXOffset) * progress;
                block1LineRight.classList.remove('animate');
                block1LineRight.style.clipPath = `polygon(${(50 + divideLinesBetween / 2 + divideLinesXOffset) * (1 + progress)}% 0%,  ${(50 + divideLinesBetween / 2 + divideLinesWidth + divideLinesXOffset) * (1 + progress)}% 0%,  ${(50 + divideLinesBetween / 2 + divideLinesWidth - divideLinesXOffset) * (1 + progress)}% 100%,  ${(50 + divideLinesBetween / 2 - divideLinesXOffset) * (1 + progress)}% 100%)`;
                block1Right.style.clipPath = `polygon(${(50 + divideLinesBetween / 2 + divideLinesWidth + divideLinesXOffset) * (1 + progress)}% 0%, 100% 0%, 100% 100%,  ${(50 + divideLinesBetween / 2 + divideLinesWidth - divideLinesXOffset) * (1 + progress)}% 100%)`;
            },
            onendTop: () => {
            },
            onendBottom: () => {
                block1LineRight.classList.add('hide');
                block1Right.classList.add('hide');
            }
        },

        // --- Block 2
        { // circle stroke fills around
            onstart: () => {
                block2Circle.classList.remove('hide');
                block2CircleShadow.classList.remove('hide');
                block2CirclePlate.classList.add('hide');
            },
            onprogress: (progress) => {
                block2Circle.style.strokeDasharray = 2 * Math.PI * block2CircleViewPortDiameter * progress + ' 1000';
                block2CircleShadow.style.strokeDasharray = 2 * Math.PI * block2CircleViewPortDiameter * progress + ' 1000';
            },
            onendTop: () => {
                block2Circle.classList.add('hide');
                block2CircleShadow.classList.add('hide');
            },
            onendBottom: () => {
                block2CirclePlate.classList.remove('hide');
            }
        },
        { // circle scales over the screen
            onstart: () => {
                block2Circle.classList.remove('hide');
                block2CircleShadow.classList.remove('hide');
            },
            onprogress: (progress) => {
                block2Circle.style.transform = `rotate(-90deg) scale(${1 + block2CircleMaxScale * progress})`;
                block2CircleShadow.style.transform = `rotate(-90deg) scale(${1 + block2CircleMaxScale * progress})`;
                block2CirclePlate.style.transform = `rotate(-90deg) scale(${1 + block2CircleMaxScale * progress})`;
            },
            onendTop: () => {
            },
            onendBottom: () => {
                block2Circle.classList.add('hide');
                block2CircleShadow.classList.add('hide');
            }
        }
    ]);

    /*
    const avatarDataURL = document.getElementById('avatarDataURL');
    if (avatarUrl) {
        avatarDataURL.value = avatarUrl;
    }

    const editProfileForm = document.getElementById('editProfileForm');
    editProfileForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const fullnameGroup = document.getElementById('fullnameGroup');
        const fullnameErrorText = document.getElementById('fullnameErrorText');
        const reserveEmailGroup = document.getElementById('reserveEmailGroup');
        const reserveEmailErrorText = document.getElementById('reserveEmailErrorText');

        fullnameGroup.classList.remove('error');
        fullnameErrorText.innerHTML = '';
        reserveEmailGroup.classList.remove('error');
        reserveEmailErrorText.innerHTML = '';

        const formData = new FormData(editProfileForm);
        const fullname = formData.get('fullname').trim();
        const reserveEmail = formData.get('reserveEmail').trim();

        if (reserveEmail && !validateEmail(reserveEmail)) {
            reserveEmailGroup.classList.add('error');
            reserveEmailErrorText.innerHTML = 'Некорректный EMail';
            return;
        }
        if (fullname && !validateFullname(fullname)) {
            fullnameGroup.classList.add('error');
            fullnameErrorText.innerHTML = 'Некорректное полное имя';
            return;
        }

        const response = await app.apiPut(`/user/${username}`, { fullname, reserveEmail });
        if (!response.ok) {
            app.messages.error(`Ошибка ${response.status}!`, 'Не удалось изменить данные!');
            return;
        }
        app.messages.success('Успех!', 'Данные успешно изменены!');
    });

    document.getElementById('logoutButton').addEventListener('click', async (event) => {
        event.preventDefault();
        await app.apiDelete('/user/session');
        app.clearStorage();
        app.messages.success('До свидания!', 'Вы успешно вышли из аккаунта!');
        await app.goto('/auth');
    });

    const avatarImage = document.getElementById('avatarImage');
    document.getElementById('avatarChange').addEventListener('click', async () => {
        // if "Cancel" button will be pressed - Promise never resolves, but there's no event to resolve on cancel =(
        const dataURL = await getImageAsDataURL();
        if (avatarDataURL.value === dataURL) {
            return;
        }

        avatarDataURL.value = dataURL;

        const formData = new FormData(editProfileForm);
        const avatarUrl = formData.get('avatarDataURL');

        const response = await app.apiPut(`/user/${username}/avatar`, { avatarUrl });
        if (response.ok) {
            app.storage.avatar = avatarUrl;
            avatarImage.src = dataURL;
            app.messages.success('Успех', 'Аватар успешно изменён');
        }
    });
     */
}
