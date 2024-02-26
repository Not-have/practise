export default {
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
        },
        project: './tsconfig.*?.json',
        createDefaultProgram: false,
        extraFileExtensions: ['.vue']
    },
    plugins: ['vue', '@typescript-eslint', 'import'],
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    rules: {
        'no-unused-vars': 'off',
        'no-case-declarations': 'off',
        'no-use-before-define': 'off',
        'space-before-function-paren': 'off',

        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',

        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }
        ],
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'vue/script-setup-uses-vars': 'error',
        // 配置空格数
        // 'vue/script-indent': ['error', 2, { baseIndent: 0 }],
        // indent: ['error', 4, { ignoredNodes: ['TemplateLiteral > *'] }],
        'vue/no-reserved-component-names': 'off',
        'vue/custom-event-name-casing': 'off',
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
        'vue/multi-word-component-names': 'off'
        // 'sort-imports': [
        //   'error',
        //   {
        //     ignoreCase: true,
        //     ignoreDeclarationSort: false,
        //     ignoreMemberSort: false,
        //     memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        //     allowSeparatedGroups: false,
        //   },
        // ],
    },
    globals: { defineOptions: 'readonly' }
}
