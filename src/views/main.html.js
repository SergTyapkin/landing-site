import Handlebars from 'handlebars/dist/cjs/handlebars';
import PageScroller from '../modules/pageScroller';

import { getImageAsDataURL } from '@korolion/get-image-as-dataurl/getImageAsDataUrl.js';
import { validateEmail, validateFullname } from '../modules/validators';

const html = `
<div id="block-1" class="absolute-wrapper fullsize">
    <div id="block-1-left" class="block-1-bg left fullsize"></div>
    <div id="block-1-right" class="block-1-bg right fullsize"></div>
    <div id="block-1-line-left" class="divide-line left"></div>
    <div id="block-1-line-right" class="divide-line right"></div>
</div>
`;

/**
 * Renders profile page and "activating" it's js
 *
 * @param {object} element html element to be rendered in
 * @param {object} app object of a main App class
 */
export async function handler(element, app) {
    const block1Left = document.getElementById("block-1-left");
    const block1Right = document.getElementById("block-1-right");
    const block1LineLeft = document.getElementById("block-1-line-left");
    const block1LineRight = document.getElementById("block-1-line-right");

    const response = await app.apiGet('/user');
    let username, avatarUrl;
    if (response.ok) {
        const data = await response.json();
        ({username, avatarUrl} = data);
        app.storage.username = username;
        app.storage.avatarUrl = avatarUrl;
    }

    const template = Handlebars.compile(html);
    element.innerHTML = template({
        username: username,
        avatarUrl: (avatarUrl?.length > 0) ? `${app.apiUrl}/${avatarUrl}` : app.defaultAvatarUrl
    });

    const scroller = new PageScroller(document.body, [
        (event, progress) => {
            console.log(progress);
            block1LineLeft.style.clipPath = `polygon((${50 - progress/200}% 0%,  ${50 - progress/200 + 1.5} 0%,  (${50 - progress/200 + 1.5 - 7} 100%,  ${50 - progress/200 - 7} 100%)`;
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
