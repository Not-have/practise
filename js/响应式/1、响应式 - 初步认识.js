/**
 * watchFn 需要响应的函数，都传进来
 * @param fn 函数
 */
let receiverFns = [];
function watchFn(fn) {
    receiverFns.push(fn)
}

const obj = {
    name: "里斯",
    age: 16
};

function fun() {
    console.log("Hello World! ");
    console.log(obj.name);
}

watchFn(fun)
watchFn(function demo() { // 这块也可以是匿名函数
    console.log("demo");
})

function bar() {
    console.log("不需要响应");
}

obj.name = "哈哈哈";
receiverFns.forEach(item => {
    item();
})
console.log(obj);
