function* fun(value) {
    console.log(value, "函数开始");

    console.log(100);
    const parame1 = yield 100;

    console.log(200, parame1);
    const parame2 = yield 200;

    console.log(300, "parame2", parame2);
    const parame3 = yield 300;

    console.log("函数结束", parame3);
    return "函数结束";
}


const generator = fun("你好");
generator.next();
// 第二段代码 终止执行，后面的就不会在执行了
console.log(generator.return(15));
generator.next();

