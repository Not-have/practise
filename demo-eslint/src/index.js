import {
  javascript,
  command,
  comments,
  ignores,
  jsdoc,
  jsonc,
  regexp
} from "./config/index.js";

const DEFAULT = [
  javascript,
  command,
  comments,
  ignores,
  jsdoc,
  jsonc,
  regexp
].flat();

export default DEFAULT;
