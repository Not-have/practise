export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'no-descending-specificity': null,
    'import-notation': 'string',
    'no-empty-source': null,

    'custom-property-pattern': null,
    'selector-class-pattern': null,

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'v-deep'],
      },
    ],

    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],

    'media-query-no-invalid': null,
    'declaration-property-value-no-unknown': null,
  },
  overrides: [
    {
      files: ['**/*.html', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
}
