import parserVue from "vue-eslint-parser";

import parserTs from "@typescript-eslint/parser";

/**
 * Vue SFC parser
 *
 * 只负责让 .vue 文件按单文件组件解析；具体 Vue 规则后续可单独接入 eslint-plugin-vue。
 */
export default {
  files: [
    "**/*.vue"
  ],
  languageOptions: {

    // 使用 vue-eslint-parser 解析 <template>、<script>、<script setup>
    parser: parserVue,
    parserOptions: {

      // <script setup>、<script setup lang="ts">、<script setup lang="tsx"> 内部继续交给 TypeScript parser
      parser: parserTs,

      // 允许 Vue SFC 中的 JSX / TSX 脚本内容
      ecmaFeatures: {
        jsx: true
      },

      // 使用最新 ECMAScript 语法
      ecmaVersion: "latest",

      // 按 ES Module 方式解析 <script>
      sourceType: "module"
    }
  }
};
