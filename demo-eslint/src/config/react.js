import eslintReact from "@eslint-react/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";
import reactCompiler from "eslint-plugin-react-compiler";

const REACT_FILES = [
  "**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"
];

const REACT_RECOMMENDED_CONFIG = eslintReact.configs["recommended-typescript"] ?? eslintReact.configs.recommended;

/**
 * React
 *
 * 使用 @eslint-react/eslint-plugin 替代 eslint-plugin-react。
 * eslint-plugin-jsx-a11y 当前未安装，暂不接入 a11y 规则。
 */
export default {
  files: REACT_FILES,
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {

        // 允许解析 JSX / TSX
        jsx: true
      },

      // 使用最新 ECMAScript 语法
      ecmaVersion: "latest",

      // 按 ES Module 方式解析 React 文件
      sourceType: "module"
    }
  },
  plugins: {

    // @eslint-react 的推荐配置会注册该插件，这里保留显式注册便于 react.js 单独使用
    ...REACT_RECOMMENDED_CONFIG.plugins,

    // React Compiler 官方规则
    "react-compiler": reactCompiler,

    // 迁移原 eslint-plugin-react 中 JSX 排版类规则到 @stylistic
    "@stylistic": stylistic
  },
  settings: {

    // 继承 @eslint-react 的 React 版本探测和 importSource 设置
    ...REACT_RECOMMENDED_CONFIG.settings
  },
  rules: {

    // 启用 @eslint-react 推荐的 React / JSX / DOM / Web API 规则
    ...REACT_RECOMMENDED_CONFIG.rules,

    // React Compiler 编译兼容性检查
    "react-compiler/react-compiler": "error",

    // Hook 调用规则，替代当前无法加载的 eslint-plugin-react-hooks
    "@eslint-react/rules-of-hooks": "error",

    // Hook 依赖数组检查，替代当前无法加载的 eslint-plugin-react-hooks
    "@eslint-react/exhaustive-deps": "error",

    // 禁止使用数组索引作为 key
    "@eslint-react/no-array-index-key": "error",

    // 禁止缺失组件 displayName
    "@eslint-react/no-missing-component-display-name": "error",

    // 统一 useState 变量和 setter 的命名
    "@eslint-react/use-state": "error",

    // 禁止在组件内部定义嵌套组件，替代 react/no-multi-comp 的主要风险控制
    "@eslint-react/no-nested-component-definitions": "error",

    // 禁止给 void DOM 元素传 children
    "@eslint-react/dom-no-void-elements-with-children": "error",

    // 参考原配置：暂不强制 JSX key
    "@eslint-react/no-missing-key": "off",

    // 禁止非必要 Fragment
    "@eslint-react/jsx-no-useless-fragment": "error",

    // 禁止 bind / inline function 这类旧 react/jsx-no-bind 暂无等价替代，先不强行模拟

    // 多行 JSX 闭合标签与起始行对齐
    "@stylistic/jsx-closing-tag-location": [
      "error",
      "line-aligned"
    ],

    // JSX 每行最多一个 props
    "@stylistic/jsx-max-props-per-line": [
      "error",
      {
        maximum: 1
      }
    ],

    // JSX props 缩进统一为 2 个空格
    "@stylistic/jsx-indent-props": [
      "error",
      2
    ],

    // JSX 子元素之间不允许出现容易误读的空白
    "@stylistic/jsx-child-element-spacing": "error",

    // JSX 相邻表达式按规则换行
    "@stylistic/jsx-newline": [
      "warn",
      {
        prevent: true,
        allowMultilines: true
      }
    ],

    // JSX 每行只保留一个表达式
    "@stylistic/jsx-one-expression-per-line": [
      "error",
      {
        allow: "literal"
      }
    ],

    // 无子元素的组件和 HTML 标签必须自闭合
    "@stylistic/jsx-self-closing-comp": [
      "error",
      {
        component: true,
        html: true
      }
    ],

    // JSX 右括号放在 props 之后
    "@stylistic/jsx-closing-bracket-location": [
      "error",
      "after-props"
    ],

    // JSX 花括号内不保留空格
    "@stylistic/jsx-curly-spacing": [
      "error",
      {
        when: "never",
        children: {
          when: "never"
        }
      }
    ],

    // JSX props 和 children 中不必要的花括号要去掉
    "@stylistic/jsx-curly-brace-presence": [
      "error",
      {
        props: "never",
        children: "never"
      }
    ],

    // JSX 多行表达式需要括号包裹
    "@stylistic/jsx-wrap-multilines": [
      "error",
      {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "parens-new-line",
        logical: "parens-new-line",
        prop: "parens-new-line"
      }
    ],

    // JSX 首个 prop 在多 prop 场景下换行
    "@stylistic/jsx-first-prop-new-line": [
      "error",
      "multiline-multiprop"
    ],

    // JSX 标签空格风格
    "@stylistic/jsx-tag-spacing": [
      "error",
      {
        closingSlash: "never",
        beforeSelfClosing: "always",
        afterOpening: "never",
        beforeClosing: "never"
      }
    ],

    // 关闭 core 多余括号规则，避免和 JSX / TSX 场景产生冲突
    "no-extra-parens": "off"
  }
};
