import Handlebars from 'handlebars/dist/cjs/handlebars';
import PageScroller from '../modules/pageScroller';

const html = `
<!-- Circle fills and scales -->
<div id="block-2" class="block-2 absolute-wrapper">
    <div id="block-2-text-left" class="text left">И что</div>
    <div id="block-2-text-right" class="text right">дальше?</div>

    <svg id="block-2-circle" class="lighting-stroke circle centered hidden" viewBox="0 0 100 100"><circle r="50" cx="50" cy="50"/></svg>
    <svg id="block-2-circle-shadow" class="lighting-stroke circle centered hidden" viewBox="0 0 100 100"><circle r="50" cx="50" cy="50"/></svg>
    <div id="block-2-circle-div" class="lighting-stroke circle centered hidden"></div>
</div>

<!-- Carousels -->
<div id="block-3" class="block-3 absolute-wrapper">
    <div id="block-3-bg-carousel" class="bg-carousel hidden">
        <img src="images/photo-1.jpg" alt=""/>
        <img src="images/photo-2.jpg" alt=""/>
        <img src="images/photo-3.jpg" alt=""/>
    </div>
    <div id="block-3-carousel" class="carousel-3d fullsize hidden">
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

<!-- 2 plates -->
<div id="block-1" class="block-1 absolute-wrapper">
    <div id="block-1-left" class="plate left fullsize"></div>
    <div id="block-1-right" class="plate right fullsize"></div>
    <div id="block-1-line-left" class="divide-line left animate"></div>
    <div id="block-1-line-right" class="divide-line right animate"></div>
    
    <div id="block-1-text-left" class="text left">
        Я тут наделал всяких красивых анимашек, может тебе понравится
    </div>
    <div id="block-1-text-right" class="text right">
        [Вставить какое-то классное приветствие] <br>
        (я забыл)
    </div>
    <img id="block-1-scroll-image" src="images/arrow-down.gif" class="bottom-image">
</div>

<!-- Line moves down -->
<div id="block-4" class="block-4 absolute-wrapper hidden">
    <svg id="block-4-spikes" class="spikes fullsize hidden" preserveAspectRatio="none" viewBox="0 0 100 100">
        <radialGradient id="radial-grad" fx="50%" fy="100%" cy="0.5" r="0.7">
            <stop offset="50%" stop-color="white" stop-opacity="0.8"></stop>  
            <stop offset="100%" stop-color="white" stop-opacity="0.0"></stop>
        </radialGradient>
        <path id="block-4-spikes-path" d="M 0 100 l 10 -20 l -5 -10 l 2 -3 l 1 -4 l 4 -3 l 1 -6 l -2 -7 l 1 -4 l -2 -5 l 10 -4 l -4 -3 l 3 -8 l 8 -2 l 1 -4 l 3 4 l 5 -9 l 1 3 l 4 2 l 3 -6 l 5 -2 l 4 10 l 2 5 l 4 2 l 2 -12 l 2 -3 l 5 8 l 1 10 l 4 -4 l 7 -2 l -3 4 l 2 5 l 8 1 l 2 5 l -5 3 l 3 2 l 6 5 l -3 2 l -1 3 l -2 5 l 3 7 l 3 1 l -3 5 l 7 8 l -2 3 L 100 100 L 100 0 L 0 0 Z" fill="url(#radial-grad)"/>
    </svg>
    <svg id="block-4-outer-text-path" class="text-path hidden" viewBox="0 -5 100 610" xmlns="//www.w3.org/2000/svg" xmlns:xlink="//www.w3.org/1999/xlink">
        <path id="text-path" d="M 0 300 v -250 c 0 -70, 100 -70, 100 0 v 500 c 0 70, -100 70, -100 0 Z"/>
        <text id="block-4-text-path" dy="0px" dx="0px">
            <textPath xlink:href="#text-path">
                ЧТО ПРОИСХОДИТ?
            </textPath>
        </text>
    </svg>
    <div id="block-4-inside-circle" class="inside-circle"></div>
    <div id="block-4-vertical-line" class="vertical-line"></div>
    
    <div class="info-block">
        <div id="block-4-info-1" class="right closed">
            <div class="text">Ты попал сюда по очень важной причине. Давай сделаем тебе такой же классный сайт</div>    
            <div class="underline"></div>    
        </div>
        <div id="block-4-info-2" class="left closed">
            <div class="text">Он будет интерессовать людей так же, как интересно листать эту страницу</div>    
            <div class="underline"></div>    
        </div>
        <div id="block-4-info-3" class="right closed">
            <div class="text">Мы не используем Cookies потому что нам лень</div>    
            <div class="underline"></div>    
        </div>
        <div id="block-4-info-4" class="left closed">
            <div class="text">Листая дальше, вы принимаете пользовательское соглашение, передаёте права на всё своё имущество, а так же отдаёте себя в рабство</div>    
            <div class="underline"></div>    
        </div>
    </div>
    
    <div id="block-4-go-text" class="text centered hidden stack" style="--stacks: 3; pointer-events: none;">
        <span style="--index: 0;">Р*Б*ТАЙ Б***Ь!</span>
        <span style="--index: 1;">Р*Б*ТАЙ Б***Ь!</span>
        <span style="--index: 2;">Р*Б*ТАЙ Б***Ь!</span>
    </div>
    <img id="block-4-image-click" src="images/click.gif" class="centered image-click hidden">
</div>
`;

window.x = document.documentElement.clientWidth;
window.y = document.documentElement.clientHeight;
window.max = Math.max(window.x, window.y);
window.min = Math.min(window.x, window.y);

const divideLinesWidth = 1.5;
const divideLinesBetween = 1;
const divideLinesXOffset = 7;
const block1TextOffset = 5; // %
const block1TextMoving = 25; // %

const block2CircleViewPortDiameter = 50;
const block2CircleDiameter = window.min * 0.2; // 150;
const block2CircleMaxScale = window.max / block2CircleDiameter * 1.5;

const block4CircleMinDiameter = Math.max(window.min * 0.020, 10); // 10;
const block4CircleMaxDiameter = window.min * 0.5; // 300;
const block4CircleMaxestDiameter = window.min * 0.7; // 500;
const block4LineMinWidth = Math.max(window.min * 0.008, 3); // 4;
const block4LineMaxWidth = Math.min(window.min * 0.020, 10); // 10;
const block4CircleMinWidth = Math.max(window.min * 0.002, 1); // 1;
const block4CircleMaxWidth = Math.min(window.min * 0.010, 5); // 5;
const block4CircleMaxestWidth = Math.min(window.min * 0.020, 10); // 10;
const block4InfoHeight = 350;
const block4TextPathHeight = window.min * 1.8;

/**
 * Renders page and "activating" it's js
 *
 * @param {object} element html element to be rendered in
 * @param {object} app object of a main App class
 */
export async function handler(element, app) {
    /* const response = await app.apiGet('/user');
    let username, avatarUrl;
    if (response.ok) {
        const data = await response.json();
        ({ username, avatarUrl } = data);
        app.storage.username = username;
        app.storage.avatarUrl = avatarUrl;
    } */
    // --- Render page
    const template = Handlebars.compile(html);
    element.innerHTML = template();/* template({
        username: username,
        avatarUrl: (avatarUrl?.length > 0) ? app.apiUrl + '/' + avatarUrl : app.defaultAvatarUrl
    }); */
    element.classList.add('landing');

    // --- Start page logic
    const block1Left = document.getElementById('block-1-left');
    const block1Right = document.getElementById('block-1-right');
    const block1LineLeft = document.getElementById('block-1-line-left');
    const block1LineRight = document.getElementById('block-1-line-right');
    const block1TextRight = document.getElementById('block-1-text-right');
    const block1TextLeft = document.getElementById('block-1-text-left');
    const block1ScrollImage = document.getElementById('block-1-scroll-image');

    const block2 = document.getElementById('block-2');
    const block2Circle = document.getElementById('block-2-circle');
    const block2CircleShadow = document.getElementById('block-2-circle-shadow');
    const block2CircleDiv = document.getElementById('block-2-circle-div');
    const block2TextLeft = document.getElementById('block-2-text-left');
    const block2TextRight = document.getElementById('block-2-text-right');

    const block3BgCarousel = document.getElementById('block-3-bg-carousel');
    const block3Carousel = document.getElementById('block-3-carousel');
    const block3CarouselFigure1 = document.getElementById('block-3-carousel-figure-1');
    const block3CarouselFigure2 = document.getElementById('block-3-carousel-figure-2');
    const block3CarouselFigure3 = document.getElementById('block-3-carousel-figure-3');

    const block4 = document.getElementById('block-4');
    const block4Spikes = document.getElementById('block-4-spikes');
    const block4SpikesPath = document.getElementById('block-4-spikes-path');
    const block4OuterTextPath = document.getElementById('block-4-outer-text-path');
    const block4TextPath = document.getElementById('block-4-text-path');
    const block4VerticalLine = document.getElementById('block-4-vertical-line');
    const block4InsideCircle = document.getElementById('block-4-inside-circle');
    const block4Info1 = document.getElementById('block-4-info-1');
    const block4Info2 = document.getElementById('block-4-info-2');
    const block4Info3 = document.getElementById('block-4-info-3');
    const block4Info4 = document.getElementById('block-4-info-4');
    const block4GoText = document.getElementById('block-4-go-text');
    const block4ImageClick = document.getElementById('block-4-image-click');

    setTimeout(() => block1LineLeft.classList.remove('animate'), 500);
    setTimeout(() => block1LineRight.classList.remove('animate'), 750);

    const pathModsAbs = [];
    for (let i = 0; i < 100; i++) {
        pathModsAbs.push(Math.random() * 10 - 5);
    }

    const hidingTimeouts = [];
    function show(element, _classname = 'show') {
        element.classList.remove('hide', 'hidden');
        element.classList.add(_classname);
        hidingTimeouts.forEach((timeout, idx) => {
            if (timeout.element === element) {
                clearTimeout(timeout.timeout);
            }
            hidingTimeouts.splice(idx, 1);
        });
    }
    function showfast(element) {
        show(element, 'showed');
    }
    function hide(element, _classname = 'hide') {
        element.classList.remove('show', 'showed');
        element.classList.add(_classname);
        hidingTimeouts.push({
            element: element,
            timeout: setTimeout(() => { element.classList.add('hidden'); }, 300)
        });
    }
    function hidefast(element) {
        hide(element, 'hidden');
    }

    const Scroller = new PageScroller();
    Scroller.setHandlers([
        // --- Block 1
        { // left plate goes to left
            duration: 1,
            onstart: () => {
                showfast(block1LineLeft);
                showfast(block1Left);
                showfast(block1TextLeft);
                // show(block1ScrollImage);
            },
            onprogress: (progress) => {
                const reProgress = 1 - progress;
                block1LineLeft.classList.remove('animate');
                block1LineLeft.style.clipPath = `polygon(${(50 - divideLinesBetween / 2 - divideLinesWidth + divideLinesXOffset) * reProgress}% 0%,  ${(50 - divideLinesBetween / 2 + divideLinesXOffset) * reProgress}% 0%,  ${(50 - divideLinesBetween / 2 - divideLinesXOffset) * reProgress}% 100%,  ${(50 - divideLinesBetween / 2 - divideLinesWidth - divideLinesXOffset) * reProgress}% 100%)`;
                block1Left.style.clipPath = `polygon(0% 0%, ${(50 - divideLinesBetween / 2 - divideLinesWidth + divideLinesXOffset) * reProgress}% 0%,  ${(50 - divideLinesBetween / 2 - divideLinesWidth - divideLinesXOffset) * reProgress}% 100%, 0% 100%)`;

                block1TextLeft.style.transform = `translateY(-50%) rotate3d(0, 1, -0.1, ${-80 * progress}deg)`;
                block1TextLeft.style.left = `${block1TextOffset - block1TextMoving * progress}%`;
                block1TextLeft.style.filter = `blur(${10 * progress}px)`;
                block1TextLeft.style.opacity = `${1 - progress}`;
            },
            onendTop: () => {
            },
            onendBottom: () => {
                hidefast(block1LineLeft);
                hidefast(block1Left);
                hidefast(block1TextLeft);
            }
        },
        { // right plate goes to right
            duration: 2,
            onstart: () => {
                showfast(block1LineRight);
                showfast(block1Right);
                showfast(block1TextRight);
                hide(block1ScrollImage);
            },
            onprogress: (progress) => {
                progress = 100 / (50 + divideLinesBetween / 2 - divideLinesXOffset) * progress;
                block1LineRight.classList.remove('animate');
                // const leftDownPointX = 100 - (50 - divideLinesBetween / 2 + divideLinesXOffset) * (1 - progress);
                // block1LineRight.style.clipPath = `polygon(${leftDownPointX + divideLinesXOffset * 2}% 0%,  ${leftDownPointX + divideLinesXOffset * 2 + divideLinesWidth}% 0%,  ${leftDownPointX + divideLinesWidth}% 100%,  ${leftDownPointX}% 100%)`;
                // block1Right.style.clipPath = `polygon(${leftDownPointX + divideLinesWidth + divideLinesXOffset * 2}% 0%, 100% 0%, 100% 100%,  ${leftDownPointX + divideLinesWidth}% 100%)`;
                block1LineRight.style.clipPath = `polygon(${(50 + divideLinesBetween / 2 + divideLinesXOffset) * (1 + progress)}% 0%,  ${(50 + divideLinesBetween / 2 + divideLinesWidth + divideLinesXOffset) * (1 + progress)}% 0%,  ${(50 + divideLinesBetween / 2 + divideLinesWidth - divideLinesXOffset) * (1 + progress)}% 100%,  ${(50 + divideLinesBetween / 2 - divideLinesXOffset) * (1 + progress)}% 100%)`;
                block1Right.style.clipPath = `polygon(${(50 + divideLinesBetween / 2 + divideLinesWidth + divideLinesXOffset) * (1 + progress)}% 0%, 100% 0%, 100% 100%,  ${(50 + divideLinesBetween / 2 + divideLinesWidth - divideLinesXOffset) * (1 + progress)}% 100%)`;

                block1TextRight.style.transform = `translateY(-50%) rotate3d(0, 1, 0.1, ${80 * progress}deg)`;
                block1TextRight.style.right = `${block1TextOffset - block1TextMoving * progress}%`;
                block1TextRight.style.filter = `blur(${10 * progress}px)`;
                block1TextRight.style.opacity = `${1 - progress}`;
            },
            onendTop: () => {
            },
            onendBottom: () => {
                hidefast(block1LineRight);
                hidefast(block1Right);
                hidefast(block1TextRight);
            }
        },

        // --- Block 2
        { // circle stroke fills around
            duration: 2,
            onstart: () => {
                show(block2Circle);
                show(block2CircleShadow);
                block2TextRight.classList.add('moved');
                block2TextLeft.classList.add('moved');
            },
            onprogress: (progress) => {
                block2CircleShadow.style.strokeDasharray = block2Circle.style.strokeDasharray = 2 * Math.PI * block2CircleViewPortDiameter * progress + ' 1000';
            },
            onendTop: () => {
                hide(block2Circle);
                hide(block2CircleShadow);
                block2TextRight.classList.remove('moved');
                block2TextLeft.classList.remove('moved');
            },
            onendBottom: () => {
                hidefast(block2Circle);
                hidefast(block2CircleShadow);
            }
        },
        { // circle scales over the screen
            duration: 1,
            onstart: () => {
                showfast(block2CircleDiv);
                block2CircleDiv.classList.add('filled');
                block2Circle.classList.add('filled');
            },
            onprogress: (progress) => {
                block2CircleDiv.style.transform = block2CircleDiv.style.transform = `rotate(-90deg) translate(50%, -50%) scale(${1 + block2CircleMaxScale * progress})`;
            },
            onendTop: () => {
                hidefast(block2CircleDiv);
                block2CircleDiv.classList.remove('filled');
                block2Circle.classList.remove('filled');
                block2Circle.classList.remove('filled');
                showfast(block2Circle);
                showfast(block2CircleShadow);
            },
            onendBottom: () => {
                block2Circle.classList.remove('filled');
                hidefast(block2TextRight);
                hidefast(block2TextLeft);
            }
        },

        // --- Block 3
        { // carousel turns and moves down
            duration: 5,
            onstart: () => {
                show(block3Carousel);
                showfast(block3BgCarousel);
            },
            onprogress: (progress) => {
                block3CarouselFigure1.style.transform = `rotateY(${130 + 720 * progress}deg) translateY(${-160 + 255 * progress}%) translateX(${25 - 50 * progress}%)`;
                block3CarouselFigure2.style.transform = `rotateY(${270 - 720 * progress}deg) translateY(${-75 + 200 * progress}%) translateX(${-150 + 300 * progress}%)`;
                block3CarouselFigure3.style.transform = `rotateY(${180 + 720 * progress}deg) translateY(${-25 + 225 * progress}%) translateX(${150 - 200 * progress}%)`;
                block3BgCarousel.style.transform = `translateX(${-130 + (150 * 1.33) * progress}%)`;
            },
            onendTop: () => {
                hide(block3Carousel);
                hidefast(block3BgCarousel);

                showfast(block2TextRight);
                showfast(block2TextLeft);
            },
            onendBottom: () => {
                hide(block3Carousel);
                hidefast(block3BgCarousel);
            }
        },

        // --- Block 4
        { // circle scales inside the screen
            duration: 1,
            onstart: () => {
                show(block4);
                show(block2CircleDiv);
                block2CircleDiv.classList.add('filled');
            },
            onprogress: (progress) => {
                block4InsideCircle.style.opacity = progress;
                block2CircleDiv.style.transform = block2CircleDiv.style.transform = `rotate(-90deg) translate(50%, -50%) scale(${1 + block2CircleMaxScale * (1 - progress)})`;
            },
            onendTop: () => {
                hidefast(block4);
            },
            onendBottom: () => {
                block2CircleDiv.classList.remove('filled');
            }
        },
        { // text moves around circle and inside circle moves to center
            duration: 2,
            onstart: () => {
                show(block4Spikes);
                show(block4OuterTextPath);
            },
            onprogress: (progress) => {
                block4TextPath.setAttribute('dx', 500 * progress + 'px');
                block4InsideCircle.style.height = block4InsideCircle.style.width = block2CircleDiameter - (block2CircleDiameter - block4CircleMinDiameter) * progress + 'px';

                const pathMods = pathModsAbs.map((el) => el * progress / 2);
                const path = `M 0 100 L ${10 + pathMods[0]} ${80 + pathMods[1]} L ${5 + pathMods[2]} ${70 + pathMods[3]} L ${7 + pathMods[4]} ${67 + pathMods[5]} L ${8 + pathMods[6]} ${63 + pathMods[7]} L ${12 + pathMods[8]} ${60 + pathMods[9]} L ${13 + pathMods[10]} ${54 + pathMods[11]} L ${11 + pathMods[12]} ${47 + pathMods[13]} L ${12 + pathMods[14]} ${43 + pathMods[15]} L ${10 + pathMods[16]} ${38 + pathMods[17]} L ${20 + pathMods[18]} ${34 + pathMods[19]} L ${16 + pathMods[20]} ${31 + pathMods[21]} L ${19 + pathMods[22]} ${23 + pathMods[23]} L ${27 + pathMods[24]} ${21 + pathMods[25]} L ${28 + pathMods[26]} ${17 + pathMods[27]} L ${31 + pathMods[28]} ${21 + pathMods[29]} L ${36 + pathMods[30]} ${12 + pathMods[31]} L ${37 + pathMods[32]} ${15 + pathMods[33]} L ${41 + pathMods[34]} ${17 + pathMods[35]} L ${44 + pathMods[36]} ${11 + pathMods[37]} L ${49 + pathMods[38]} ${9 + pathMods[39]} L ${53 + pathMods[40]} ${19 + pathMods[41]} L ${55 + pathMods[42]} ${24 + pathMods[43]} L ${59 + pathMods[44]} ${26 + pathMods[45]} L ${61 + pathMods[46]} ${14 + pathMods[47]} L ${63 + pathMods[48]} ${11 + pathMods[49]} L ${68 + pathMods[50]} ${19 + pathMods[51]} L ${69 + pathMods[52]} ${29 + pathMods[53]} L ${73 + pathMods[54]} ${25 + pathMods[55]} L ${80 + pathMods[56]} ${23 + pathMods[57]} L ${77 + pathMods[58]} ${27 + pathMods[59]} L ${79 + pathMods[60]} ${32 + pathMods[61]} L ${87 + pathMods[62]} ${33 + pathMods[63]} L ${89 + pathMods[64]} ${38 + pathMods[65]} L ${84 + pathMods[66]} ${41 + pathMods[67]} L ${87 + pathMods[68]} ${43 + pathMods[69]} L ${93 + pathMods[70]} ${48 + pathMods[71]} L ${90 + pathMods[72]} ${50 + pathMods[73]} L ${89 + pathMods[74]} ${53 + pathMods[75]} L ${87 + pathMods[76]} ${58 + pathMods[77]} L ${90 + pathMods[78]} ${65 + pathMods[79]} L ${93 + pathMods[80]} ${66 + pathMods[81]} L ${90 + pathMods[82]} ${71 + pathMods[83]} L ${97 + pathMods[84]} ${79 + pathMods[85]} L ${95 + pathMods[86]} ${82 + pathMods[87]} L 100 100 L 100 0 L 0 0 Z`;
                block4SpikesPath.setAttribute('d', path);
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
                block4VerticalLine.style.height = block4LineMinWidth / 2 + lineScroll + 'px';
                block4InsideCircle.style.marginTop = lineScroll + 'px';

                const pathMods = pathModsAbs.map((el) => el * (0.5 + progress / 2));
                const path = `M 0 100 L ${10 + pathMods[0]} ${80 + pathMods[1]} L ${5 + pathMods[2]} ${70 + pathMods[3]} L ${7 + pathMods[4]} ${67 + pathMods[5]} L ${8 + pathMods[6]} ${63 + pathMods[7]} L ${12 + pathMods[8]} ${60 + pathMods[9]} L ${13 + pathMods[10]} ${54 + pathMods[11]} L ${11 + pathMods[12]} ${47 + pathMods[13]} L ${12 + pathMods[14]} ${43 + pathMods[15]} L ${10 + pathMods[16]} ${38 + pathMods[17]} L ${20 + pathMods[18]} ${34 + pathMods[19]} L ${16 + pathMods[20]} ${31 + pathMods[21]} L ${19 + pathMods[22]} ${23 + pathMods[23]} L ${27 + pathMods[24]} ${21 + pathMods[25]} L ${28 + pathMods[26]} ${17 + pathMods[27]} L ${31 + pathMods[28]} ${21 + pathMods[29]} L ${36 + pathMods[30]} ${12 + pathMods[31]} L ${37 + pathMods[32]} ${15 + pathMods[33]} L ${41 + pathMods[34]} ${17 + pathMods[35]} L ${44 + pathMods[36]} ${11 + pathMods[37]} L ${49 + pathMods[38]} ${9 + pathMods[39]} L ${53 + pathMods[40]} ${19 + pathMods[41]} L ${55 + pathMods[42]} ${24 + pathMods[43]} L ${59 + pathMods[44]} ${26 + pathMods[45]} L ${61 + pathMods[46]} ${14 + pathMods[47]} L ${63 + pathMods[48]} ${11 + pathMods[49]} L ${68 + pathMods[50]} ${19 + pathMods[51]} L ${69 + pathMods[52]} ${29 + pathMods[53]} L ${73 + pathMods[54]} ${25 + pathMods[55]} L ${80 + pathMods[56]} ${23 + pathMods[57]} L ${77 + pathMods[58]} ${27 + pathMods[59]} L ${79 + pathMods[60]} ${32 + pathMods[61]} L ${87 + pathMods[62]} ${33 + pathMods[63]} L ${89 + pathMods[64]} ${38 + pathMods[65]} L ${84 + pathMods[66]} ${41 + pathMods[67]} L ${87 + pathMods[68]} ${43 + pathMods[69]} L ${93 + pathMods[70]} ${48 + pathMods[71]} L ${90 + pathMods[72]} ${50 + pathMods[73]} L ${89 + pathMods[74]} ${53 + pathMods[75]} L ${87 + pathMods[76]} ${58 + pathMods[77]} L ${90 + pathMods[78]} ${65 + pathMods[79]} L ${93 + pathMods[80]} ${66 + pathMods[81]} L ${90 + pathMods[82]} ${71 + pathMods[83]} L ${97 + pathMods[84]} ${79 + pathMods[85]} L ${95 + pathMods[86]} ${82 + pathMods[87]} L 100 100 L 100 0 L 0 0 Z`;
                block4SpikesPath.setAttribute('d', path);
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
                block4VerticalLine.style.height = block4LineMinWidth / 2 + lineScroll + 'px';
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
                block4VerticalLine.style.height = block4LineMinWidth / 2 + lineScroll + 'px';
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
                block4VerticalLine.style.height = block4LineMinWidth / 2 + lineScroll + 'px';
                block4InsideCircle.style.marginTop = lineScroll + 'px';
            },
            onendTop: () => {
                block4Info3.classList.add('closed');
            },
            onendBottom: () => {
            }
        },
        { // page scrolls down and circle gets higher
            duration: 1,
            onstart: () => {
                block4Info4.classList.remove('closed');
                show(block4OuterTextPath);
            },
            onprogress: (progress) => {
                const lineScroll = block4InfoHeight * (progress * 2 + 4.5);
                const pageScroll = 2.5 * block4InfoHeight * progress + block4InfoHeight * 4;
                block4TextPath.setAttribute('dx', 500 + 1000 * progress + 'px');
                block2.style.top = block4.style.top = -pageScroll + 'px';
                block4VerticalLine.style.height = block4LineMinWidth / 2 + lineScroll + 'px';
                block4InsideCircle.style.marginTop = lineScroll + 'px';
                const insideCircleSize = block4CircleMinDiameter + (block4CircleMaxDiameter - block4CircleMinDiameter) * progress;
                block4InsideCircle.style.height = block4InsideCircle.style.width = insideCircleSize + 'px';
                block4InsideCircle.style.borderWidth = block4CircleMinWidth + (block4CircleMaxWidth - block4CircleMinWidth) * progress + 'px';
                block4OuterTextPath.style.marginTop = lineScroll - block4TextPathHeight + insideCircleSize + 'px';
            },
            onendTop: () => {
                block4Info4.classList.add('closed');
                hide(block4OuterTextPath);
            },
            onendBottom: () => {
            }
        },
        { // page scrolled to end, make symbol "I/O"
            duration: 0.3,
            onstart: () => {
                const lineScroll = block4InfoHeight * 6.5;
                const pageScroll = block4InfoHeight * 6.5;
                block2.style.top = block4.style.top = -pageScroll + 'px';
                block4VerticalLine.classList.add('bouncy');
                block4InsideCircle.style.marginTop = lineScroll + 'px';
                block4InsideCircle.style.height = block4InsideCircle.style.width = block4CircleMaxestDiameter + 'px';
                block4VerticalLine.style.marginTop = lineScroll - 0.7 * block4CircleMaxestDiameter + 'px';
                block4VerticalLine.style.height = block4CircleMaxestDiameter / 2 + 'px';
                block4InsideCircle.style.borderWidth = block4CircleMaxestWidth + 'px';
                block4VerticalLine.style.width = block4LineMaxWidth + 'px';
                block4VerticalLine.style.borderRadius = block4LineMaxWidth / 2 + 'px';
                show(block4GoText);
                block4GoText.classList.add('activated');
                block4InsideCircle.classList.add('button');
                show(block4ImageClick);
                block4ImageClick.style.marginTop = pageScroll + 'px';
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
                hide(block4ImageClick);
            },
            onendBottom: () => {
            }
        }
    ]);

    block4InsideCircle.addEventListener('click', () => {
        element.classList.remove('landing');
        Scroller.clear();
        app.goto('/contacts');
    });
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
