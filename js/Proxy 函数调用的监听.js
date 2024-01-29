/**
 * 拦截对函数的调用的捕获器
 * @param target target new Proxy 所代理的 obj（监听的对象）
 * @param thisArg 调用函数时绑定的 this 值
 * @param argArray 调用函数时传递的参数列表
 */
// apply(target, thisArg, argArray) {
//     console.log("Apply handler is invoked.");
//     // 调用原始函数，并在其结果前后添加一些内容
//
// },


const obj = {
    name: "里斯",
    age: 16
};

const objProxy = new Proxy(obj, {

    /**
     * 监听判断对象是否可以扩展捕获器
     * 只能拦截 Object.preventExtensions()
     * @param target new Proxy 所代理的 obj（监听的对象）
     */
    preventExtensions(target) {
        console.log("拦截 Object.preventExtensions() 的调用");
        // 在这里可以添加自定义逻辑，然后阻止对象扩展
        // 返回 true 或其他真值表示阻止对象扩展，返回 false 或其他假值表示允许对象扩展
        return Reflect.preventExtensions(target);
    }
});

Object.preventExtensions(objProxy);
// 尝试添加新属性，但因为上面的 preventExtensions 捕获器阻止了扩展，所以下面的语句不会生效，并且会 TypeError
objProxy.adders = "帝企鹅";
console.log(objProxy);