/**
 * 不对原来的对象，进行任何操作，这个时候，就使用了 new Proxy
 * 但是在不使用 Reflect 的情况下，你在 new Proxy 修改，他会依然改变了 obj
 */
const obj = {
    name: "里斯",
    age: 16
};

const objProxy = new Proxy(obj, {
    get(target, key, receiver) {
        return Reflect.get(target, key);
    },
    set(target, key, newValue, receiver) {
        /**
         * target[key] = newValue 和 Reflect.set(target, key, newValue) 的区别
         * target[key] = newValue 设置是否成功时不知道的
         * Reflect.set(target, key, newValue) 设置成功失败时会返回 Boolean
         */
        const result = Reflect.set(target, key, newValue);
        // 可以在这进行成功 / 失败的某些操作

    }
});

objProxy.name = "哈哈哈";

console.log(objProxy);
console.log(obj);