import EsLint, {
  typescript,
  react
} from "@mt-kit/eslint-config";

export default [
  ...EsLint,
  typescript,
  ...react,
  {
    ignores: [
      "node_modules/**"

      // "packages-**/**/node_modules/**",
      // "packages-**/**/dist/**",
      // "packages-**/**/build/**",
      // "packages-**/**/src/.umi/**",
      // "packages-**/**/src/.umi-production/**",
      // "packages-**/**/src/.umi-test/**"
    ]
  }

  // {
  //   files: [
  //     "**/*.tsx",
  //     "**/*.jsx"
  //   ],
  //   rules: {
  //     "react/jsx-max-depth": "warn",
  //     "react/jsx-no-bind": "warn",
  //     "no-console": "warn"
  //   }
  // }
];
