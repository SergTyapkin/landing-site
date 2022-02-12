const html = `
<div class="absolute-wrapper fullsize">
    <div class="standalone-form centered">
        <div class="title">
            <div class="primary">Ошибка 404</div>
            <div class="secondary">Страница не найдена!</div>
        </div>
        <div class="form" style="margin-top: 50px;">
            <linkbutton href="/" class="btn">На главную</linkbutton>
        </div>
    </div>
</div>
`;

/**
 * Renders auth page and "activating" it's js
 *
 * @param {object} element html element to be rendered in
 * @param {object} app object of a main App class
 */
export async function handler(element, app) {
    element.innerHTML = html;
}
