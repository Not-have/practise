/**
 * Symbol 是一个函数
 * 他会生成一个唯一的值
 * 使用 Symbol("test").description 可以获取到描述（也就是 Symbol() 中传入的内容）
 */
const sl1 = Symbol();
const sl2 = Symbol();
const sl3 = Symbol("test");

console.log(sl3.description); // test

const obj = {
    [sl1]: '哈哈哈'
};

obj[sl2] = "啊啊啊";

Object.defineProperty(obj, sl3, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "呵呵呵"
});

/**
 * 获取
 * 不能使用 . 语法
 */
console.log(obj[sl2]);

/**
 * 使用 Symbol 作为 key 的属性名，在遍历 Object.keys 等中是获取不到这些 Symbol 值的
 */
console.log(Object.keys(obj)); // 获取不到的
console.log(Object.getOwnPropertyNames(obj)); // 获取不到的

/**
 * 真实的获取 和 遍历
 */
console.log(Object.getOwnPropertySymbols(obj));

const slKeys = Object.getOwnPropertySymbols(obj);

for (const key of slKeys) {
    console.log(obj[key]);
}

/**
 * Symbol 创建一个相同的 key
 * Symbol.for(key)
 */

const sl4 = Symbol.for("same");
const sl5 = Symbol.for("same");
console.log(sl4 === sl5);
// 获取key
const sameKey = Symbol.keyFor(sl4);
console.log(sameKey);