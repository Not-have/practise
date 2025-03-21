// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'

// export default tseslint.config(
//   { ignores: ['dist'] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// )

// .eslintrc.js
// module.exports = {
//   // "extends": "@alicloud/eslint-config/tsx",
//   ignorePatterns: [".eslintrc.js"],
//   rules: {
//       "react/jsx-wrap-multilines": "off",
//       "react/jsx-closing-tag-location": "off",
//       "@typescript-eslint/no-invalid-void-type": "off",
//       "max-len": 0,
//       "@typescript-eslint/no-shadow": ["off"],
//       // 解决 Forbidden non-null assertion.eslint@typescript-eslint/no-non-null-assertion
//       "@typescript-eslint/no-non-null-assertion": "off",
//       // 修改为 4个空格
//       indent: ["error", 4],
//       "react/jsx-indent-props": ["error", 4],
//       "react/jsx-indent": ["error", 4],
//       "@typescript-eslint/indent": [
//           "error",
//           4,
//           // 建议复制过来
//           {
//               // 设置为 1 时，依然报错
//               SwitchCase: 0,
//               VariableDeclarator: 1,
//               outerIIFEBody: 1,
//               // MemberExpression: null,
//               FunctionDeclaration: {
//                   parameters: 1,
//                   body: 1,
//               },
//               FunctionExpression: {
//                   parameters: 1,
//                   body: 1,
//               },
//               CallExpression: {
//                   arguments: 1,
//               },
//               ArrayExpression: 1,
//               ObjectExpression: 1,
//               ImportDeclaration: 1,
//               flatTernaryExpressions: false,
//               ignoredNodes: [
//                   "JSXElement",
//                   "JSXElement > *",
//                   "JSXAttribute",
//                   "JSXIdentifier",
//                   "JSXNamespacedName",
//                   "JSXMemberExpression",
//                   "JSXSpreadAttribute",
//                   "JSXExpressionContainer",
//                   "JSXOpeningElement",
//                   "JSXClosingElement",
//                   "JSXText",
//                   "JSXEmptyExpression",
//                   "JSXSpreadChild",
//               ],
//               ignoreComments: false,
//           },
//       ],
//   },
// };

import EsLint, {
  react
} from "mb-eslint-config";

export default [
  ...EsLint,
  ...react,
  {
    rules: {
      "react/jsx-no-bind": "off",
      "no-extra-parens": "warn",
      "no-confusing-arrow": ["error", {
        "onlyOneSimpleParam": true
      }]
    }
  }
];
