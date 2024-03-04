module.exports = {
    root: true,
    extends: '@react-native',
    rules: {
        'comma-dangle': ['error', 'never'],
        'react/no-unstable-nested-components': ['warn', { allowAsProps: true }]
    }
    // rules: {
    //     'object-curly-newline': [
    //         'error',
    //         {
    //             ObjectExpression: {multiline: true, consistent: true},
    //             ObjectPattern: {multiline: true, consistent: true},
    //             ImportDeclaration: {multiline: true, consistent: true},
    //             ExportDeclaration: {multiline: true, consistent: true},
    //         },
    //     ],
    // }
};
