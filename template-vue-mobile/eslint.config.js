import EsLint, {
  typescript,
  vue
} from "@mt-kit/eslint-config";

export default [
  ...EsLint,
  typescript,
  ...vue
];
