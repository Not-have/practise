import {
  javascript,
  command,
  comments,
  ignores,
  jsdoc,
  jsonc,
  regexp,
  typescript
} from "./config/index.js";

const DEFAULT = [
  javascript,
  command,
  comments,
  ignores,
  jsdoc,
  jsonc,
  regexp,
  typescript
].flat();

export default DEFAULT;
