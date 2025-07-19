import {
  javascript,
  typescript,
  vue
} from "@mt-kit/eslint-config";

const _vue = [
  ...vue,
  {
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/require-default-prop": "off"
    }
  }
];

export default [
  javascript,
  typescript,
  ..._vue,
  {
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/naming-convention": "off",
      "no-console": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "default-param-last": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-types": "off",
      "no-new": "off",
      "no-useless-catch": "off",
      "no-return-await": "off",
      "no-async-promise-executor": "off",
      "guard-for-in": "off",
      "no-case-declarations": "off",
      "no-self-assign": "off"
    }
  }
];
