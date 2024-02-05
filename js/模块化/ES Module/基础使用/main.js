/**
 * 1、普通导入
 */
/*
import {
    name1,
    name2,
    name3Alias
} from "./test.js"; // 必须加 ”.js“

console.log(name1);
console.log(name2);
console.log(name3Alias);
*/
/**
 * 2、起别名（导出时起别名的情况很少，一版都是在这起别名）
 */
/*
import {
    name1 as name1Alias,
    name2 as name2Alias,
    name3Alias as name3
} from "./test.js";

console.log(name1Alias);
console.log(name2Alias);
console.log(name3);
 */
/**
 * 3、将导入的内容放到一个标识符中
 * 语法：import * as 名字 from './test.js';
 */
import * as all from './test.js';

console.log(all);
console.log(all.name1);
console.log(all.name2);
console.log(all.name3Alias);