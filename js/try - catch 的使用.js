function fun() {
    throw new Error("error");
}

function test() {
    fun();
}

function demo() {
    test();
}

/**
 * 不处理的话，异常会一步步抛出，直到最顶层，例如这块会抛到 demo 里，并且程序会终止执行，并报错
 */
// demo();

/**
 * try 可以写在顶层，也可以写在 可能出现异常的地方（也就是看你想写在那）
 * 写在 try 里，后续的代码不会终止
 */
try {
    fun();
// } catch (err) { // err 在不需要的时候，是可以省略的，省略的写法：catch {
} catch (err) {
    console.log("函数调用异常", err.message);
} finally { // 语句块无论是否发生异常都会执行
    console.log("语句块无论是否发生异常都会执行");
}

console.log("后面代码逻辑");
