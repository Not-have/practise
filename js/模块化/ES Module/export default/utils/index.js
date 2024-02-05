/**
 * 这样方便管理 export default 的导出
 * 完整写法：
 * import addModule from "./add.js";
 * export { addModule as add };
 */
export { default as add } from "./add.js";
export { default as reduce } from "./reduce.js";