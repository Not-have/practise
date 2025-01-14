import EsLint, {
  vue
} from "mb-eslint-config";

export default [
  ...EsLint,
  ...vue,
  {
    rules: {

      // 允许使用 console
      "no-console": "warn"
    }
  }
];
