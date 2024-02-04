function fun() {
    throw new Error("error");
}

function test() {
    fun()
}

function demo() {
    test()
}

/**
 * 不处理的话，异常会一步步抛出，直到最顶层，例如这块会抛到 demo 里，并且程序会终止执行，并报错
 */
// demo();

/**
 * try 可以写在顶层，也可以写在 可能出现异常的地方
 * 写在 try 里，后续的代码不会终止
 */
try {
    fun()
} catch (err){
    console.log("函数调用异常");
} finally { // 捕获到异常后的执行
    console.log(111);
}

console.log("后面代码逻辑");
