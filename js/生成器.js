/**
 * yield 是暂停执行
 * return 是停止执行，后面在执行 next，也不会给下面走了
 */
function* fun() {
    console.log("函数开始");

    console.log(100);
    // 这里不能写 return，这里写了后，后面的全部不执行了
    // return 100;
    // 需要返回值的话，给 yield 后面写，不写时，返回的是：{ value: undefined, done: false }
    yield 100;

    console.log(200);
    yield 200;

    console.log(300);
    yield 300;

    console.log("函数结束");
    return "函数结束";
}

// 调用生成器函数（fun）时，会给我们返回一个生成器对象
const generator = fun();
console.log(generator.next());
generator.next();
generator.next();
console.log(generator.next());

