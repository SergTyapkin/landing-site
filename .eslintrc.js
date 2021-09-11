module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: [
        'standard'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12
    },
    plugins: [
        'jsdoc',
        '@typescript-eslint'
    ],
    rules: {
        indent: ['error', 4],
        'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
        semi: ['error', 'always'],
        quotes: ['error', 'single', { allowTemplateLiterals: true }]
    }
};
