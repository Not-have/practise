import { add } from "./js/es-module";
const { fun } = require("./js/common");


/**
 * 如果使用对每个模块的热替换，这个时候 你就不能使用，以前的写法了
 * 要替换成下面的写法：
 */
import "./js/element"
if(module.hot){
    module.hot.accept("./js/element.js", () => {
        console.log("模块的热替换");
    })
}

console.log(add(10, 10));
console.log(fun());


const str = "你好！2222";
const arr = ["abc", 12, "哈哈"]
arr.forEach(item => {
    console.log(item);
});
console.log(str);