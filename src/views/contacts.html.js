import Handlebars from 'handlebars/dist/cjs/handlebars';

const html = `
<div style="background: mediumseagreen; width: 50%; height: 50vh" class="hidden">
Какой-то блок
</div>
`;

/**
 * Renders page and "activating" it's js
 *
 * @param {object} element html element to be rendered in
 * @param {object} app object of a main App class
 */
export async function handler(element, app) {
    // --- Render page
    const template = Handlebars.compile(html);
    element.innerHTML = template();

    console.log('NORM');
}
