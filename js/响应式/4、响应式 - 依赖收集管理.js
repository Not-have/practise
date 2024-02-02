class Depend {
    constructor() {
        this.receiverFns = [];
    }

    addDepend(receiverFn) {
        this.receiverFns.push(receiverFn);
    }

    /**
     * 通知已经改变的依赖
     */
    notify() {
        console.log(this.receiverFns);
        this.receiverFns.forEach(item => {
            item();
        });
    }
}

/**
 * 封装一个获取 depend 的函数
 * 只要是一个数据结构的封装，主要看  Map、WeakMap 的使用
 */
const targetMap = new WeakMap();

function getDepend(target, key) {
    let map = targetMap.get(target, key);
    if (!map) {
        map = new Map();
        targetMap.set(target, map);
    }
    // 根据 key 获取 depend 对象
    let depend = map.get(key);

    if (!depend) {
        depend = new Depend();
        map.set(key, depend);
    }
    return depend;
}

/**
 * watchFn 需要响应的函数，都传进来
 * @param fn 函数
 */
const depend = new Depend();

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

const obj1 = {
    name: "里斯",
    age: 18,
    address: "西安"
};

const objProxy = new Proxy(obj1, {
    get(target, key, receiver) {
        // 根据 target 和 key 可以获取 depend
        const depend = getDepend(target, key);
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