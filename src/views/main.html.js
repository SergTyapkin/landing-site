import Handlebars from 'handlebars/dist/cjs/handlebars';
import PageScroller from '../modules/pageScroller';

const html = `
<div id="block-1" class="block-1 absolute-wrapper">
    <div id="block-1-left" class="block-1-plate left fullsize"></div>
    <div id="block-1-right" class="block-1-plate right fullsize"></div>
    <div id="block-1-line-left" class="divide-line left animate"></div>
    <div id="block-1-line-right" class="divide-line right animate"></div>
</div>

<div id="block-2" class="block-2 absolute-wrapper">
    <svg id="block-2-circle" class="lighting-stroke svg-circle hide" viewBox="0 0 100 100"><circle r="50" cx="50" cy="50"/></svg>
    <svg id="block-2-circle-shadow" class="lighting-stroke svg-circle hide" viewBox="0 0 100 100"><circle r="50" cx="50" cy="50"/></svg>
</div>

<div id="block-3" class="block-3 absolute-wrapper">
    <div id="block-3-carousel" class="carousel-3d fullsize hide">
        <figure id="block-3-carousel-figure-1">
            <img src="images/photo-1.jpg" alt=""/>
            <img src="images/photo-2.jpg" alt=""/>
            <img src="images/photo-3.jpg" alt=""/>
            <img src="images/photo-4.jpeg" alt=""/>
            <img src="images/photo-5.jpg" alt=""/>
            <img src="images/photo-6.jpg" alt=""/>
        </figure>
        <figure id="block-3-carousel-figure-2">
            <img src="images/photo-1.jpg" alt=""/>
            <img src="images/photo-2.jpg" alt=""/>
            <img src="images/photo-3.jpg" alt=""/>
            <img src="images/photo-4.jpeg" alt=""/>
            <img src="images/photo-5.jpg" alt=""/>
            <img src="images/photo-6.jpg" alt=""/>
        </figure>
        <figure id="block-3-carousel-figure-3">
            <img src="images/photo-1.jpg" alt=""/>
            <img src="images/photo-2.jpg" alt=""/>
            <img src="images/photo-3.jpg" alt=""/>
            <img src="images/photo-4.jpeg" alt=""/>
            <img src="images/photo-5.jpg" alt=""/>
            <img src="images/photo-6.jpg" alt=""/>
        </figure>
    </div>
</div>

<div id="block-4" class="block-4 absolute-wrapper">
    <svg id="block-4-spikes" class="block-4-spikes fullsize hide" preserveAspectRatio="none" viewBox="0 0 100 100">
        <radialGradient id="radial-grad" fx="50%" fy="100%" cy="0.5" r="0.7">
            <stop offset="50%" stop-color="white" stop-opacity="0.8"></stop>  
            <stop offset="100%" stop-color="white" stop-opacity="0.0"></stop>
        </radialGradient>
        <path d="M 0 100 l 10 -20 l -5 -10 l 2 -3 l 1 -4 l 4 -3 l 1 -6 l -2 -7 l 1 -4 l -2 -5 l 10 -4 l -4 -3 l 3 -8 l 8 -2 l 1 -4 l 3 4 l 5 -9 l 1 3 l 4 2 l 3 -6 l 5 -2 l 4 10 l 2 5 l 4 2 l 2 -12 l 2 -3 l 5 8 l 1 10 l 4 -4 l 7 -2 l -3 4 l 2 5 l 8 1 l 2 5 l -5 3 l 3 2 l 6 5 l -3 2 l -1 3 l -2 5 l 3 7 l 3 1 l -3 5 l 7 8 l -2 3 L 100 100 L 100 0 L 0 0 Z" fill="url(#radial-grad)"/>
    </svg>
    <svg class="block-4-text-path" viewBox="0 -5 100 610" xmlns="//www.w3.org/2000/svg" xmlns:xlink="//www.w3.org/1999/xlink">
        <path id="text-path" d="M 0 550 v -500 c 0 -70, 100 -70, 100 0 v 500 c 0 70, -100 70, -100 0 Z"/>
        <text id="block-4-text-path" dy="0px" dx="0px">
            <textPath xlink:href="#text-path">
                SOME TEXT
            </textPath>
        </text>
    </svg>
</div>

<!--block-4 is the same as block-2 and html from block-2 uses in js-->
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

    const block2 = document.getElementById('block-2');
    const block2Circle = document.getElementById('block-2-circle');
    const block2CircleShadow = document.getElementById('block-2-circle-shadow');

    const block3Carousel = document.getElementById('block-3-carousel');
    const block3CarouselFigure1 = document.getElementById('block-3-carousel-figure-1');
    const block3CarouselFigure2 = document.getElementById('block-3-carousel-figure-2');
    const block3CarouselFigure3 = document.getElementById('block-3-carousel-figure-3');

    const block4 = document.getElementById('block-4');
    const block4Spikes = document.getElementById('block-4-spikes');
    const block4TextPath = document.getElementById('block-4-text-path');
    const block4Circle = document.getElementById('block-4-circle');
    const block4CircleShadow = document.getElementById('block-4-circle-shadow');

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
            },
            onprogress: (progress) => {
                block2CircleShadow.style.strokeDasharray = block2Circle.style.strokeDasharray = 2 * Math.PI * block2CircleViewPortDiameter * progress + ' 1000';
            },
            onendTop: () => {
                block2Circle.classList.add('hide');
                block2CircleShadow.classList.add('hide');
            },
            onendBottom: () => {
            }
        },
        { // circle scales over the screen
            onstart: () => {
                block2Circle.classList.remove('hide');
                block2CircleShadow.classList.remove('hide');
                block2Circle.classList.add('filled');
            },
            onprogress: (progress) => {
                block2CircleShadow.style.transform = block2Circle.style.transform = `rotate(-90deg) scale(${1 + block2CircleMaxScale * progress})`;
            },
            onendTop: () => {
                block2Circle.classList.remove('filled');
            },
            onendBottom: () => {
                block2CircleShadow.classList.add('hide');
            }
        },

        // --- Block 3
        { // carousel turns and moves down
            onstart: () => {
                block3Carousel.classList.remove('hide');
            },
            onprogress: (progress) => {
                block3CarouselFigure1.style.transform = `rotateY(${130 + 720 * progress}deg) translateY(${-160 + 255 * progress}%) translateX(${25 - 50 * progress}%)`;
                block3CarouselFigure2.style.transform = `rotateY(${270 - 720 * progress}deg) translateY(${-75 + 200 * progress}%) translateX(${-150 + 300 * progress}%)`;
                block3CarouselFigure3.style.transform = `rotateY(${180 + 720 * progress}deg) translateY(${-25 + 225 * progress}%) translateX(${150 - 200 * progress}%)`;
            },
            onendTop: () => {
                block3Carousel.classList.add('hide');
            },
            onendBottom: () => {
                block3Carousel.classList.add('hide');
            }
        },

        // --- Block 4
        { // circle scales inside the screen
            onstart: () => {
                block2Circle.classList.remove('hide');
                block2CircleShadow.classList.remove('hide');
                block2Circle.classList.add('filled');
            },
            onprogress: (progress) => {
                progress = 1 - progress;
                block2CircleShadow.style.transform = block2Circle.style.transform = `rotate(-90deg) scale(${1 + block2CircleMaxScale * progress})`;
            },
            onendTop: () => {
                block2CircleShadow.classList.add('hide');
            },
            onendBottom: () => {
                block2Circle.classList.remove('filled');
            }
        },
        { // text moves around circle
            onstart: () => {
                block4Spikes.classList.remove('hide');
            },
            onprogress: (progress) => {
                block4TextPath.setAttribute('dx', 500 * progress + 'px');
            },
            onendTop: () => {
                block4Spikes.classList.add('hide');
            },
            onendBottom: () => {
            }
        },
        { // page scrolls down and text continue to moves down
            onstart: () => {
            },
            onprogress: (progress) => {
                block4TextPath.setAttribute('dx', 500 + 1000 * progress + 'px');
                block2.style.top = block4.style.top = -100 * progress + 'vh';
            },
            onendTop: () => {
            },
            onendBottom: () => {
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
