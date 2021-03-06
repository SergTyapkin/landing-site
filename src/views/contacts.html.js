const html = `
<div class="absolute-wrapper fullsize">
    <div class="standalone-form centered">
        <div class="title">
            <div class="primary">Сергей Тяпкин</div>
            <a class="secondary" href="https://github.com/SergTyapkin">Githib: SergTyapkin</a>
            <a class="secondary" href="https://vk.com/tyapkin_s">VK (лучше сюда): tyapkin_s</a>
            <a class="secondary" href="https://t.me/tyapkin_s">Telegram: @tyapkin_s</a>
        </div>
        <div class="form" style="margin-top: 50px;">
            <linkbutton href="/" class="btn">На главную</linkbutton>
        </div>
    </div>
</div>
`;

/**
 * Renders page and "activating" it's js
 *
 * @param {object} element html element to be rendered in
 * @param {object} app object of a main App class
 */
export async function handler(element, app) {
    element.innerHTML = html;
}
