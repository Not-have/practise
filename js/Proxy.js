const obj = {
    name: "里斯",
    age: 16
};
const objPrototype = {
    study() {
        console.log(`${this.name} is studying.`);
    }
};

/**
 *
 * @param obj 要进行代理的对象
 * @param obj {
 *     get 获取值的捕获器
 *     set 设置值的捕获器
 *     has 监听 in 捕获器
 *     deleteProperty 监听 delete 捕获器
 * } 捕获器（不对其重写，会自动完成对原来对象的操作）
 *
 */
const objProxy = new Proxy(obj, {
    /**
     * 获取值的捕获器
     * @param target new Proxy 所代理的 obj（监听的对象）
     * @param key 读取的属性（key），如：name
     * @param receiver 调用代理的对象
     */
    get(target, key, receiver) {
        console.log(`监听到`, target, `属性 ${key} 被读取`);
        return target[key];
    },
    /**
     * 设置值的捕获器
     * @param target new Proxy 所代理的 obj（监听的对象）
     * @param key 读取的属性（key），如：name
     * @param newValue 新属性值
     * @param receiver 调用代理的对象
     */
    set(target, key, newValue, receiver) {
        console.log(`监听到`, target, ` 属性中 ${key}，被修改为 ${newValue}`);
        target[key] = newValue;
    },
    /**
     * 监听 in 捕获器
     * demo：console.log("name" in objProxy);
     * @param target new Proxy 所代理的 obj（监听的对象）
     * @param key 被捕获的属性 key
     */
    has(target, key) {
        return key in target;
    },
    /**
     * 监听 delete 捕获器
     * @param target new Proxy 所代理的 obj（监听的对象）
     * @param key 被捕获的属性 key
     */
    deleteProperty(target, key) {
        delete target[key];
    },
    /**
     * 监听获取对象原型捕获器
     * @param target new Proxy 所代理的 obj（监听的对象）
     */
    getPrototypeOf(target) {
        console.log(target);
        return target;
    },
    /**
     * 监听设置对象的原型捕获器
     * @param target new Proxy 所代理的 obj（监听的对象）
     * @param newProto 新的原型对象
     */
    setPrototypeOf(target, newProto) {
        return Reflect.setPrototypeOf(newProto, target);
    },
    /**
     * 监听判断对象是否可以扩展捕获器
     * @param target new Proxy 所代理的 obj（监听的对象）
     * 使用 Object.isExtensible(objProxy) 触发
     */
    isExtensible(target) {
        console.log("判断对象是否可以扩展");
        return Reflect.isExtensible(target);
    },
    /**
     * 监听获取对象属性的描述符捕获器
     * @param target new Proxy 所代理的 obj（监听的对象）
     * @param key 被捕获的属性 key
     */
    getOwnPropertyDescriptor(target, key) {
        console.log(`获取属性 ${key} 的描述符`);
        return Object.getOwnPropertyDescriptor(target, key);
    },
    /**
     * 通过 Object.defineProperty 或 Reflect.defineProperty 定义属性时进行拦截和修改，这个捕获器在代理对象上被触发，允许你对属性定义的过程进行定制
     * 属性定义的拦截和修改：你可以在属性被定义时拦截，并在捕获器中实现自定义逻辑
     * 动态属性定义：你可以根据某些条件决定是否允许或修改属性的定义
     * @param target target new Proxy 所代理的 obj（监听的对象）
     * @param key 要定义或修改的属性的名称
     * @param attributes 描述属性特性的对象，与 Object.defineProperty 的参数相同
     */
    defineProperty(target, key, attributes) {
        console.log(`定义属性 ${key}`);
        if (key === "blockedProperty") {
            console.log("属性定义被阻止");
            // return false; // 阻止定义属性（会报 TypeError），所以你想进行其他操作时，需要在这进行处理，并且不能返回 false，负责他会引起代码的异常
            return true;
        }

        return Object.defineProperty(target, key, descriptor);
    },
    /**
     * 拦截对对象自身属性的获取操作
     * 使用 Object.keys、Object.getOwnPropertyNames、Object.getOwnPropertySymbols 等
     * @param target target new Proxy 所代理的 obj（监听的对象）
     */
    ownKeys(target) {
        console.log("拦截获取 key");
        // 拦截获取对象自身属性键的操作（拦截获取 name）
        return Reflect.ownKeys(target).filter(key => key !== 'name');
    }
});

objProxy.name = "哈哈";
objProxy.age = 22;

// delete
delete objProxy.age;
console.log(objProxy);

// 监听 in 捕获器
console.log("name" in objProxy);

// 获取对象原型
console.log(Object.getPrototypeOf(objProxy));

// 设置对象原型
Object.setPrototypeOf(objProxy, objPrototype);
objPrototype.study();

// 判断对象是否可以扩展
console.log(Object.isExtensible(objProxy));  // 输出: true
// Object.preventExtensions(objProxy);
// console.log(Object.isExtensible(objProxy));  // 输出: false

// 获取对象属性的描述符
const descriptor = Object.getOwnPropertyDescriptor(objProxy, "name");
console.log(descriptor);

// 定义或修改对象的属性
Object.defineProperty(objProxy, "name", {
    value: "John",
    writable: true,
    enumerable: true,
    configurable: true
}); // 成功
Object.defineProperty(objProxy, "blockedProperty", {
    value: "Blocked",
    writable: true,
    enumerable: true,
    configurable: true
}); // 失败，捕获器返回 false，属性定义被阻止

// 拦截对对象自身属性的获取操作
console.log(Object.keys(objProxy));