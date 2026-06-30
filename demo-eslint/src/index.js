import {
  javascript,
  command,
  comments,
  ignores,
  jsdoc,
  jsonc,
  regexp,
  stylistic,
  typescript,
  unicorn
} from "./config/index.js";

const DEFAULT = [
  javascript,
  command,
  comments,
  ignores,
  jsdoc,
  jsonc,
  regexp,
  stylistic,
  typescript,
  unicorn
].flat();

export default DEFAULT;
