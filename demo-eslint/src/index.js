import {
  javascript,
  command,
  comments,
  ignores,
  importX,
  jsdoc,
  jsonc,
  react,
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
  unicorn
].flat();

const VUE = [
  ...DEFAULT,
  vue
];

const REACT = [
  ...DEFAULT,
  react
];

export default DEFAULT;

export {
  REACT,
  VUE
};
