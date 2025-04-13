export default {
  extends: ["@mt-kit/stylelint-config/vue"],

  // 在这添加忽略文件，在内部集成的不生效，待解决
  ignoreFiles: [
    "**/*.json",
    "**/*.mjs",
    "**/*.cjs",
    "**/*.svg",
    "**/*.ico",
    "**/*.js",
    "**/*.ts",
    "node_modules/**",
    "dist/**",
    "**/*.jsx",
    "**/*.md"
  ],
  root: true
};
