import {
  javascript,
  command,
  comments,
  ignores,
  jsdoc,
  jsonc,
  regexp,
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
  typescript,
  unicorn
].flat();

export default DEFAULT;
