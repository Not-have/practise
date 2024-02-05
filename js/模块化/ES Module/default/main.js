/**
 * 可以异步加载代码
 */
import("./test.js").then(res => {
    console.log(res.add(1, 2));
})

console.log("后面的逻辑");

/**
 * import.meta 元数据属性的对象
 * {url: "当前模块地址"}
 */
console.log(import.meta);