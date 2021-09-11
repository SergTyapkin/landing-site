/**
 * Renders page with animation
 *
 * @param {string} target id of html element to render in
 * @param {function<HTMLElement, object>} handler function of a page (from .html.js)
 * @param {string} background background of a page <body>
 * @param {string} title page title
 * @param {object} app object of a main App class
 * @returns {Promise} promise that will be resolved, when page is displayed
 */
export function render(target, handler, background, title, app) {
    return new Promise((resolve, reject) => {
        document.title = title;
        const bodyElement = document.querySelector('body');
        bodyElement.style.background = background;
        const el = document.getElementById(target);
        try {
            el.style.opacity = '0';

            // new page animation
            setTimeout(async () => {
                handler(el, app);
                el.style.opacity = '1';
                resolve();
            }, 200);
        } catch {
            el.innerHTML = 'Error occurred while trying to render';
            resolve();
        }
    });
}
