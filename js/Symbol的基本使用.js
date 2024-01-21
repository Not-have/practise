
const obj = {
    name: "哈哈哈",
    age: 16,
    friend: {    name: "啊啊啊", age: 23}
}

obj["name"] = "呵呵";

console.log(obj);

/**
 * Symbol 是一个函数
 * 他会生成一个唯一的值
 * 使用 Symbol("test").description 可以获取到描述（也就是 Symbol() 中传入的内容）
 */
const sl = Symbol("test");

console.log(sl.description); // test