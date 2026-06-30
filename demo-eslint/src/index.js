import {
  javascript,
  command,
  comments,
  ignores,
  importX,
  jsdoc,
  jsonc,
  regexp,
  stylistic,
  typescript,
  unicorn,
  vue
} from "./config/index.js";

const DEFAULT = [
  javascript,
  command,
  comments,
  ignores,
  importX,
  jsdoc,
  jsonc,
  regexp,
  stylistic,
  typescript,
  unicorn,
  vue
].flat();

export default DEFAULT;
