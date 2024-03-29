module.exports = {
    printWidth: 100,
    tabWidth: 4,
    semi: true, // 设置结尾处有分号
    vueIndentScriptAndStyle: false,
    singleQuote: true,
    trailingComma: 'none',
    arrowParens: 'avoid',
    proseWrap: 'never',
    htmlWhitespaceSensitivity: 'strict',
    endOfLine: 'auto',
    plugins: ['prettier-plugin-packagejson'],
    overrides: [
        {
            files: '.*rc',
            options: {
                parser: 'json'
            }
        },
        {
            files: ['*.vue'],
            options: {
                htmlWhitespaceSensitivity: 'ignore' // 取消首行缩进
            }
        }
    ]
};
