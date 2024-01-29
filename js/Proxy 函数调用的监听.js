const obj = {
    name: "里斯",
    age: 16
};
const objPrototype = {
    study() {
        console.log(`${this.name} is studying.`);
    }
};

const objProxy = new Proxy(obj, {
    /**
     * 拦截对函数的调用的捕获器
     * @param target target new Proxy 所代理的 obj（监听的对象）
     * @param thisArg 调用函数时绑定的 this 值
     * @param argArray 调用函数时传递的参数列表
     */
    apply(target, thisArg, argArray) {
        console.log("Apply handler is invoked.");
        // 调用原始函数，并在其结果前后添加一些内容

    }
});
