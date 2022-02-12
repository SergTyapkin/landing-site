import './styles/global.styl';
import './styles/main.styl';
import './styles/carousel3D.styl';
import './styles/formControls.styl';
import './styles/popupMessages.styl';
import './styles/glitch.styl';
import './styles/show-hide.styl';

import { registerSW } from './modules/sw-installer.js';
import App from './app';

// const API_BASE_URL = 'https://your-site/api';
const API_BASE_URL = undefined;
const APP_TITLE = 'Landing';

const headContentHTML = '<link rel="icon" href="/images/favicon.ico" type="image/x-icon">';
const baseContentHTML = `<div id="app" class="fullsize"></div>`;

/**
 * Main function (entry point) of a frontend
 *
 */
async function main() {
    document.head.innerHTML += headContentHTML;
    document.body.innerHTML = baseContentHTML + document.body.innerHTML;

    await registerSW();

    const { hostname, origin, pathname, search } = window.location;
    let apiUrl = API_BASE_URL;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
        apiUrl = `${origin}/api`;
    }
    const app = new App(APP_TITLE, apiUrl, 'app');

    /* const response = await app.apiGet('/user');
    if (response.ok) {
        const { username, avatarUrl } = await response.json();
        app.updateStorage(username, avatarUrl);
    } */

    await app.goto(pathname + search);
}

await main();
