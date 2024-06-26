// @ts-check
const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended'
    ],
    globals: {
        wx: true
    },
    rules: {
        'prettier/prettier': 'error',
        'vue/no-setup-props-destructure': 'off',
        'vue/script-setup-uses-vars': 'error',
        'vue/no-reserved-component-names': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'vue/custom-event-name-casing': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        /**
         * @link https://typescript-eslint.io/rules/no-unused-vars
         */
        '@typescript-eslint/no-unused-vars': ['error', {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: true
        }],
        'space-before-function-paren': 'off',

        'vue/attributes-order': 'off',
        'vue/one-component-per-file': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/require-default-prop': 'off',
        'vue/require-explicit-emits': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ],
        'vue/multi-word-component-names': 'off',
        'vue/no-v-html': 'off',
        'vue/require-toggle-inside-transition': 'off',
        // 自定义配置
        'eqeqeq': ['error', 'always', { null: 'ignore' }], // 使用 === 替代 ==
        'no-const-assign': 2, //禁止修改const声明的变量
        'semi': ['error', 'always'],
        "no-unused-vars": "off",
        // "@typescript-eslint/no-unsafe-optional-chaining": "off"
        // "prettier/prettier": [
        //     "error",
        //     {
        //         "singleQuote": true,
        //         "semi": true,
        //         "trailingComma": "none",
        //         "bracketSpacing": true,
        //         "jsxBracketSameLine": false
        //     }
        // ]
    }
})
