import Handlebars from 'handlebars/dist/cjs/handlebars';
import PageScroller from '../modules/pageScroller';

const html = `
<div id="block-1" class="block-1 absolute-wrapper">
    <div id="block-1-left" class="plate left fullsize"></div>
    <div id="block-1-right" class="plate right fullsize"></div>
    <div id="block-1-line-left" class="divide-line left animate"></div>
    <div id="block-1-line-right" class="divide-line right animate"></div>
</div>

<div id="block-2" class="block-2 absolute-wrapper">
    <svg id="block-2-circle" class="lighting-stroke circle centered hide" viewBox="0 0 100 100"><circle r="50" cx="50" cy="50"/></svg>
    <svg id="block-2-circle-shadow" class="lighting-stroke circle centered hide" viewBox="0 0 100 100"><circle r="50" cx="50" cy="50"/></svg>
    <div id="block-2-circle-div" class="lighting-stroke circle centered hide"></div>
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
    <svg id="block-4-spikes" class="spikes fullsize hide" preserveAspectRatio="none" viewBox="0 0 100 100">
        <radialGradient id="radial-grad" fx="50%" fy="100%" cy="0.5" r="0.7">
            <stop offset="50%" stop-color="white" stop-opacity="0.8"></stop>  
            <stop offset="100%" stop-color="white" stop-opacity="0.0"></stop>
        </radialGradient>
        <path d="M 0 100 l 10 -20 l -5 -10 l 2 -3 l 1 -4 l 4 -3 l 1 -6 l -2 -7 l 1 -4 l -2 -5 l 10 -4 l -4 -3 l 3 -8 l 8 -2 l 1 -4 l 3 4 l 5 -9 l 1 3 l 4 2 l 3 -6 l 5 -2 l 4 10 l 2 5 l 4 2 l 2 -12 l 2 -3 l 5 8 l 1 10 l 4 -4 l 7 -2 l -3 4 l 2 5 l 8 1 l 2 5 l -5 3 l 3 2 l 6 5 l -3 2 l -1 3 l -2 5 l 3 7 l 3 1 l -3 5 l 7 8 l -2 3 L 100 100 L 100 0 L 0 0 Z" fill="url(#radial-grad)"/>
    </svg>
    <svg id="block-4-outer-text-path" class="text-path hide" viewBox="0 -5 100 610" xmlns="//www.w3.org/2000/svg" xmlns:xlink="//www.w3.org/1999/xlink">
        <path id="text-path" d="M 0 300 v -250 c 0 -70, 100 -70, 100 0 v 500 c 0 70, -100 70, -100 0 Z"/>
        <text id="block-4-text-path" dy="0px" dx="0px">
            <textPath xlink:href="#text-path">
                SOME TEXT
            </textPath>
        </text>
    </svg>
    <div id="block-4-inside-circle" class="inside-circle"></div>
    <div id="block-4-vertical-line" class="vertical-line"></div>
    
    <div class="info-block">
        <div id="block-4-info-1" class="right closed">
            <div class="text">Some more text there about something with important information about our first working area</div>    
            <div class="underline"></div>    
        </div>
        <div id="block-4-info-2" class="left closed">
            <div class="text">Some more text there about something with important information about our second working area</div>    
            <div class="underline"></div>    
        </div>
        <div id="block-4-info-3" class="right closed">
            <div class="text">Some more text there about something with important information about our third working area</div>    
            <div class="underline"></div>    
        </div>
        <div id="block-4-info-4" class="left closed">
            <div class="text">Some more text there about something with important information about our fourth working area</div>    
            <div class="underline"></div>    
        </div>
    </div>
    
    <div id="block-4-go-text" class="text centered hide stack" style="--stacks: 3;">
        <span style="--index: 0;">Р*Б*ТАЙ Б***Ь!</span>
        <span style="--index: 1;">Р*Б*ТАЙ Б***Ь!</span>
        <span style="--index: 2;">Р*Б*ТАЙ Б***Ь!</span>
    </div>
</div>
`;

const divideLinesWidth = 1.5;
const divideLinesBetween = 1;
const divideLinesXOffset = 7;

const block2CircleViewPortDiameter = 50;

const block2CircleDiameter = 150;
const block2CircleMaxScale = Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight) / block2CircleDiameter * 1.5;

const block4CircleMinDiameter = 10;
const block4CircleMaxDiameter = 300;
const block4CircleMaxestDiameter = 500;
const block4LineMinWidth = 4;
const block4LineMaxWidth = 10;
const block4CircleMinWidth = 1;
const block4CircleMaxWidth = 5;
const block4CircleMaxestWidth = 10;
const block4InfoHeight = 300;

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
    const block2CircleDiv = document.getElementById('block-2-circle-div');

    const block3Carousel = document.getElementById('block-3-carousel');
    const block3CarouselFigure1 = document.getElementById('block-3-carousel-figure-1');
    const block3CarouselFigure2 = document.getElementById('block-3-carousel-figure-2');
    const block3CarouselFigure3 = document.getElementById('block-3-carousel-figure-3');

    const block4 = document.getElementById('block-4');
    const block4Spikes = document.getElementById('block-4-spikes');
    const block4OuterTextPath = document.getElementById('block-4-outer-text-path');
    const block4TextPath = document.getElementById('block-4-text-path');
    const block4VerticalLine = document.getElementById('block-4-vertical-line');
    const block4InsideCircle = document.getElementById('block-4-inside-circle');
    const block4Info1 = document.getElementById('block-4-info-1');
    const block4Info2 = document.getElementById('block-4-info-2');
    const block4Info3 = document.getElementById('block-4-info-3');
    const block4Info4 = document.getElementById('block-4-info-4');
    const block4GoText = document.getElementById('block-4-go-text');

    setTimeout(() => block1LineLeft.classList.remove('animate'), 500);
    setTimeout(() => block1LineRight.classList.remove('animate'), 750);

    function show(element) {
        element.classList.remove('hide');
    }
    function hide(element) {
        element.classList.add('hide');
    }
    const Scroller = new PageScroller();
    Scroller.setHandlers([
        // --- Block 1
        { // left plate goes to left
            duration: 1,
            onstart: () => {
                show(block1LineLeft);
                show(block1Left);
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
                hide(block1LineLeft);
                hide(block1Left);
            }
        },
        { // right plate goes to right
            duration: 1,
            onstart: () => {
                show(block1LineRight);
                show(block1Right);
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
                hide(block1LineRight);
                hide(block1Right);
            }
        },

        // --- Block 2
        { // circle stroke fills around
            duration: 1,
            onstart: () => {
                show(block2Circle);
                show(block2CircleShadow);
            },
            onprogress: (progress) => {
                block2CircleShadow.style.strokeDasharray = block2Circle.style.strokeDasharray = 2 * Math.PI * block2CircleViewPortDiameter * progress + ' 1000';
            },
            onendTop: () => {
                hide(block2Circle);
                hide(block2CircleShadow);
            },
            onendBottom: () => {
                hide(block2Circle);
                hide(block2CircleShadow);
            }
        },
        { // circle scales over the screen
            duration: 1,
            onstart: () => {
                show(block2CircleDiv);
                block2CircleDiv.classList.add('filled');
                block2Circle.classList.add('filled');
            },
            onprogress: (progress) => {
                block2CircleDiv.style.transform = block2CircleDiv.style.transform = `rotate(-90deg) translate(50%, -50%) scale(${1 + block2CircleMaxScale * progress})`;
            },
            onendTop: () => {
                hide(block2CircleDiv);
                block2CircleDiv.classList.remove('filled');
                block2Circle.classList.remove('filled');
                block2Circle.classList.remove('filled');
            },
            onendBottom: () => {
                block2Circle.classList.remove('filled');
            }
        },

        // --- Block 3
        { // carousel turns and moves down
            duration: 5,
            onstart: () => {
                show(block3Carousel);
            },
            onprogress: (progress) => {
                block3CarouselFigure1.style.transform = `rotateY(${130 + 720 * progress}deg) translateY(${-160 + 255 * progress}%) translateX(${25 - 50 * progress}%)`;
                block3CarouselFigure2.style.transform = `rotateY(${270 - 720 * progress}deg) translateY(${-75 + 200 * progress}%) translateX(${-150 + 300 * progress}%)`;
                block3CarouselFigure3.style.transform = `rotateY(${180 + 720 * progress}deg) translateY(${-25 + 225 * progress}%) translateX(${150 - 200 * progress}%)`;
            },
            onendTop: () => {
                hide(block3Carousel);
            },
            onendBottom: () => {
                hide(block3Carousel);
            }
        },

        // --- Block 4
        { // circle scales inside the screen
            duration: 1,
            onstart: () => {
                show(block2CircleDiv);
                block2CircleDiv.classList.add('filled');
            },
            onprogress: (progress) => {
                block4InsideCircle.style.opacity = progress;
                block2CircleDiv.style.transform = block2CircleDiv.style.transform = `rotate(-90deg) translate(50%, -50%) scale(${1 + block2CircleMaxScale * (1 - progress)})`;
            },
            onendTop: () => {
            },
            onendBottom: () => {
                block2CircleDiv.classList.remove('filled');
            }
        },
        { // text moves around circle and inside circle moves to center
            duration: 1,
            onstart: () => {
                show(block4Spikes);
                show(block4OuterTextPath);
            },
            onprogress: (progress) => {
                block4TextPath.setAttribute('dx', 500 * progress + 'px');
                block4InsideCircle.style.height = block4InsideCircle.style.width = block2CircleDiameter - (block2CircleDiameter - block4CircleMinDiameter) * progress + 'px';
            },
            onendTop: () => {
                hide(block4Spikes);
                hide(block4OuterTextPath);
            },
            onendBottom: () => {
                hide(block4OuterTextPath);
            }
        },
        { // page scrolls down and text continue to moves down, vertical line starts moving
            duration: 0.75,
            onstart: () => {
                show(block4VerticalLine);
            },
            onprogress: (progress) => {
                const lineScroll = 1.5 * block4InfoHeight * progress;
                const pageScroll = block4InfoHeight * progress;
                block4TextPath.setAttribute('dx', 500 + 750 * progress + 'px');
                block2.style.top = block4.style.top = -pageScroll + 'px';
                block4VerticalLine.style.height = block4CircleMinDiameter / 2 + lineScroll + 'px';
                block4InsideCircle.style.marginTop = lineScroll + 'px';
            },
            onendTop: () => {
                hide(block4VerticalLine);
            },
            onendBottom: () => {
            }
        },
        { // page scrolls down and line moves down and to side
            duration: 0.5,
            onstart: () => {
                block4Info1.classList.remove('closed');
            },
            onprogress: (progress) => {
                progress += 1;
                const lineScroll = block4InfoHeight * (progress + 0.5);
                const pageScroll = block4InfoHeight * progress;
                block2.style.top = block4.style.top = -pageScroll + 'px';
                block4VerticalLine.style.height = block4CircleMinDiameter / 2 + lineScroll + 'px';
                block4InsideCircle.style.marginTop = lineScroll + 'px';
            },
            onendTop: () => {
                block4Info1.classList.add('closed');
            },
            onendBottom: () => {
            }
        },
        { // page scrolls down and line moves down and to side
            duration: 0.5,
            onstart: () => {
                block4Info2.classList.remove('closed');
            },
            onprogress: (progress) => {
                progress += 2;
                const lineScroll = block4InfoHeight * (progress + 0.5);
                const pageScroll = block4InfoHeight * progress;
                block2.style.top = block4.style.top = -pageScroll + 'px';
                block4VerticalLine.style.height = block4CircleMinDiameter / 2 + lineScroll + 'px';
                block4InsideCircle.style.marginTop = lineScroll + 'px';
            },
            onendTop: () => {
                block4Info2.classList.add('closed');
            },
            onendBottom: () => {
            }
        },
        { // page scrolls down and line moves down and to side
            duration: 0.5,
            onstart: () => {
                block4Info3.classList.remove('closed');
            },
            onprogress: (progress) => {
                progress += 3;
                const lineScroll = block4InfoHeight * (progress + 0.5);
                const pageScroll = block4InfoHeight * progress;
                block2.style.top = block4.style.top = -pageScroll + 'px';
                block4VerticalLine.style.height = block4CircleMinDiameter / 2 + lineScroll + 'px';
                block4InsideCircle.style.marginTop = lineScroll + 'px';
            },
            onendTop: () => {
                block4Info3.classList.add('closed');
            },
            onendBottom: () => {
            }
        },
        { // page scrolls down and line moves down and to side
            duration: 1,
            onstart: () => {
                block4Info4.classList.remove('closed');
                show(block4OuterTextPath);
            },
            onprogress: (progress) => {
                const lineScroll = block4InfoHeight * (progress * 2 + 4.5);
                const pageScroll = 2.5 * block4InfoHeight * progress + block4InfoHeight * 4;
                block4TextPath.setAttribute('dx', 500 + 1000 * progress + 'px');
                block4OuterTextPath.style.marginTop = block2CircleDiameter * (-1 + 2 * progress) + 'px';
                block2.style.top = block4.style.top = -pageScroll + 'px';
                block4VerticalLine.style.height = block4CircleMinDiameter / 2 + lineScroll + 'px';
                block4InsideCircle.style.marginTop = lineScroll + 'px';
                block4InsideCircle.style.height = block4InsideCircle.style.width = block4CircleMinDiameter + (block4CircleMaxDiameter - block4CircleMinDiameter) * progress + 'px';
                block4InsideCircle.style.borderWidth = block4CircleMinWidth + (block4CircleMaxWidth - block4CircleMinWidth) * progress + 'px';
            },
            onendTop: () => {
                block4Info4.classList.add('closed');
                hide(block4OuterTextPath);
            },
            onendBottom: () => {
            }
        },
        { // page scrolled to end, make symbol "I/O"
            duration: 0.1,
            onstart: () => {
                const lineScroll = block4InfoHeight * 6.5;
                const pageScroll = block4InfoHeight * 6.5;
                block2.style.top = block4.style.top = -pageScroll + 'px';
                block4VerticalLine.classList.add('bouncy');
                block4InsideCircle.style.marginTop = lineScroll + 'px';
                block4InsideCircle.style.height = block4InsideCircle.style.width = block4CircleMaxestDiameter + 'px';
                block4VerticalLine.style.marginTop = lineScroll - 1.2 * block4InfoHeight + 'px';
                block4VerticalLine.style.height = 33 + '%';
                block4InsideCircle.style.borderWidth = block4CircleMaxestWidth + 'px';
                block4VerticalLine.style.width = block4LineMaxWidth + 'px';
                block4VerticalLine.style.borderRadius = block4LineMaxWidth / 2 + 'px';
                show(block4GoText);
                block4GoText.classList.add('activated');
                block4InsideCircle.classList.add('button');
            },
            onprogress: (progress) => {
            },
            onendTop: () => {
                block4VerticalLine.style.marginTop = -block4LineMinWidth / 2 + 'px';
                block4VerticalLine.style.width = block4LineMinWidth + 'px';
                block4VerticalLine.style.borderRadius = block4LineMinWidth / 2 + 'px';
                block4VerticalLine.classList.remove('bouncy');
                hide(block4GoText);
                block4GoText.classList.remove('activated');
                block4InsideCircle.classList.remove('button');
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
