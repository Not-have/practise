function* fun(value) {
    console.log(value, "函数开始");

    console.log(100);
    // 这里不能写 return，这里写了后，后面的全部不执行了
    // return 100;
    // 需要返回值的话，给 yield 后面写，不写时，返回的是：{ value: undefined, done: false }
    const parame1 = yield 100;

    console.log(200, parame1);
    const parame2 = yield 200;

    console.log(300, "parame2", parame2);
    const parame3 = yield 300;

    console.log("函数结束", parame3);
    return "函数结束";
}

// 调用生成器函数（fun）时，会给我们返回一个生成器对象
const generator = fun("你好");
generator.next(); // 第一段代码，比较特赦，无法传递参数
generator.next(10); // 在这传入参数，可以在上面，进行参数的接受，如：const parame1 = yield 100; parame1 就是这块传入的 10
generator.next(20);
generator.next(30);

