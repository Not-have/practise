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
      ".next",
      "node_modules",
      "dist",
      "build",
      "public",
      "next-env.d.ts"
    ]
  }
];
