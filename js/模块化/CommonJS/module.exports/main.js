/**
 * 使用另外一个导出的对象
 *  require("./test-01") 返回一个对象（也可对这个对象进行结构），这个对象 也就是 test-01 导出的对象
 */
const test01 = require("./test-01.js");

console.log(test01);

setTimeout(() => {
    console.log(test01.name, "从这可以可以看出，他们是指向同一份内存地址的。");
    // 当然你也可以在这修改 test-01 的数据，但是不推荐
    test01.age = 18;
}, 2000);