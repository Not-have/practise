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
  jsonc
].flat();

export default DEFAULT;
