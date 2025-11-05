import EsLint, {
  typescript, vue
} from "@mt-kit/eslint-config";

export default [
  ...EsLint,
  typescript,
  ...vue,
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "public"
    ]
  }
];
