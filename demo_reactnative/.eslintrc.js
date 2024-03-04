module.exports = {
    root: true,
    extends: '@react-native',
    rules: {
        'comma-dangle': ['error', 'never'],
        'react/no-unstable-nested-components': ['warn', { allowAsProps: true }]
    }
};
