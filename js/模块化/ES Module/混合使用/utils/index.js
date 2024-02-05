/**
 * 导入导出结合使用
 * 代码规范：
 * 在这统一出口
 * 使用的时候，只需要定位到这个文件就好
 */

/**
 * 第一种导出方式
 */
/*
import {
    add,
    reduce
} from './test-01.js';
import {
    formattedDate
} from "./test-02.js";

export {
    add,
    reduce,
    formattedDate
};
 */

/**
 * 第二种导出方式（推荐）
 * 简化了上面的代码
 */
/*
export {
    add,
    reduce
} from './test-01.js';
export {
    formattedDate
} from "./test-02.js";
*/

/**
 * 第三种导出方式
 * 只有当前文件中所有的方法都导出时使用，负责不要使用
 */
export * from './test-01.js';
export * from "./test-02.js";