export default function Carousel3D(element) {
    element = element.firstElementChild;
    // const images = element.children;
    // const n = images.length;
    // const theta = 2 * Math.PI / n;
    // let currImage = 0;
    let curDegree = 0;
    // setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    /* window.addEventListener('resize', () => {
        setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    }); */

    setInterval(() => {
        // currImage++;
        curDegree++;
        rotateCarousel(curDegree);
    }, 50);

    /* function setupCarousel(n, s) {
        const apothem = s / (2 * Math.tan(Math.PI / n));
        // element.style.transformOrigin = `50% 50% ${-apothem}px`;
        for (let i = 0; i < n; i++) {
            images[i].style.transformOrigin = `50% 50% ${-apothem}px`;
            images[i].style.transform = `rotateY(${i * theta}rad)`;
        }
        rotateCarousel(curDegree);
    } */

    function rotateCarousel(degree) {
        // element.style.transform = `rotateY(${imageIndex * -theta}rad)`;
        element.style.transform = `rotateY(${degree}deg)`;
    }
}
