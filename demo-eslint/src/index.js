import {
  javascript,
  command,
  comments,
  ignores,
  importX,
  jsdoc,
  jsx,
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
  DEFAULT,
  vue
].flat();

const REACT = [
  DEFAULT,
  jsx,
  react
].flat();

export default DEFAULT;

export {
  REACT,
  VUE
};
