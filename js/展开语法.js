const names = ["哈哈", "啊啊啊", "呵呵"];
const name = "哦哦哦";
const info = {name: "小明", age: 16};

/**
 * 1、函数调用
 */
// 方法一
function fun1(...args) {
    console.log(args);
}

// fun1.apply(null, names);
fun1(...names);
fun1(name);

// 方法二
function fun2(x, y, z) {
    console.log(x, y, z);
}

fun2(...names);
fun2(...name);

/**
 * 2、构造数组
 */
const newNames = [...names, ...name];
console.log(newNames);

/**
 * 3、构建对象字面量
 * 后面添加的覆盖前面的
 */
const obj = {...info, address: "中国"};
console.log(obj);
obj.age = 18;
console.log(info.age);