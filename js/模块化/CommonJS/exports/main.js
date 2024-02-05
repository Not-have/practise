/**
 * 使用另外一个导出的对象
 *  require("./test") 返回一个对象（也可对这个对象进行结构），这个对象 也就是 test 导出的对象
 */
const test = require("./test.js");

console.log(test);
