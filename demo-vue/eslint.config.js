import EsLint, {
  vue,
  typescript
} from "@mt-kit/eslint-config";

export default [
  ...EsLint,
  typescript,
  ...vue
];
