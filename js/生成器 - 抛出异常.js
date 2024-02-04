function* fun(value) {
    const num1 = 1;
    console.log("第一段代码");
    // yield;
    try {
        yield;
    } catch (err) {
        console.log("捕获到异常", err);
        // 这里也可以写 yield "返回的参数"
    }

    const num2 = 1;
    console.log("第二段代码");
    yield;

    console.log("函数结束");
}


const generator = fun("你好");
generator.next();
generator.throw("异常信息"); // 捕获到异常时，这块就不会报错了

