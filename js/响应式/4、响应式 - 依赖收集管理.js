class Depend {
    constructor() {
        this.reactiveFns = [];
    }

    addDepend(receiverFn) {
        this.reactiveFns.push(receiverFn);
    }

    /**
     * 通知已经改变的依赖
     */
    notify() {
        this.reactiveFns.forEach(fn => {
            fn();
        });
    }
}

/**
 * watchFn
 * 找到 depend 对象
 * 让传入的函数，默认执行一次
 *
 */
let activeReactiveFn = null;

function watchFn(fn) {
    activeReactiveFn = fn;
    fn();
    activeReactiveFn = null;
}

/**
 * 封装一个获取 depend 的函数
 * 只要是一个数据结构的封装，主要看  Map、WeakMap 的使用
 */
const targetMap = new WeakMap();

function getDepend(target, key) {
    // 根据target对象获取map的过程
    let map = targetMap.get(target);
    if (!map) {
        map = new Map();
        targetMap.set(target, map);
    }

    // 根据key获取depend对象
    let depend = map.get(key);
    if (!depend) {
        depend = new Depend();
        map.set(key, depend);
    }
    return depend;
}

const obj1 = {
    name: "里斯",
    age: 18,
    address: "西安"
};

const objProxy = new Proxy(obj1, {
    get(target, key, receiver) {
        // 根据 target 和 key 可以获取 depend
        const depend = getDepend(target, key)
        depend.addDepend(activeReactiveFn);

        return Reflect.get(target, key, receiver);
    },
    set(target, key, newValue, receiver) {
        Reflect.set(target, key, newValue, receiver);
        const depend = getDepend(target, key);
        depend.notify();
    }
});

watchFn(function () {
    console.log("name 改变", objProxy.name);
});

watchFn(function () {
    console.log("age 改变", objProxy.age);
});

objProxy.name = "哈哈哈";
objProxy.name = "呵呵呵";

objProxy.age = 14;


// const obj2 = {
//     address: "西安"
// };
// watchFn(function () {
//     console.log("obj2 中的 address 改变");
// });