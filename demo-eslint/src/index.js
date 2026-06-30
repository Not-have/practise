import {
  javascript,
  command,
  comments,
  ignores,
  jsdoc,
  jsonc
} from "./config/index.js";

const DEFAULT = [
  javascript,
  command,
  comments,
  ignores,
  jsdoc,
  ...jsonc
];

export default DEFAULT;
