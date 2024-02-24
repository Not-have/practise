/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript'
    ],
    parserOptions: {
        // ecmaVersion: 'latest': 指定使用 ECMAScript 的最新版本。在这里，它表示你希望 ESLint 支持最新的 ECMAScript 版本
        ecmaVersion: 'latest'
    },
    rules: {
        // 允许单词的组件名
        'vue/multi-word-component-names': 'off'
    },
    overrides: [
        {
            files: ['*.vue'], // 可以根据需要调整匹配的文件模式
            rules: {
                'vue/valid-template-root': 'off' // 取消 The template requires child element.（eslintvue/valid-template-root）
            },
        },
    ],
};
