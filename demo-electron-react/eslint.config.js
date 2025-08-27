// import EsLint, {
//   react,
//   typescript
// } from "@mt-kit/eslint-config";
// import {
//   defineConfig
// } from "eslint/config";

// export default defineConfig([
//   {
//     files: [
//       "**/*.?([cm])[t]s?(x)",
//       "**/*.json",
//       "**/*.json5",
//       "**/*.jsonc",
//       "**/*.js",
//       "**/*.mjs"
//     ],
//     extends: [
//       EsLint,
//       typescript
//     ]
//   },
//   {
//     files: [
//       "**/*.tsx",
//       "**/*.ts",
//       "**/*.jsx",
//       "**/*.js"
//     ],
//     extends: [
//       react
//     ]
//   }
// ]);

import EsLint, {
  react,
  typescript
} from "@mt-kit/eslint-config";

export default [
  ...EsLint,
  ...react,
  typescript,
  {
    ignores: [
      ".vite",
      "node_modules",
      "dist",
      "build",
      "public",
      "forge.env.d.ts"
    ]
  }
];
