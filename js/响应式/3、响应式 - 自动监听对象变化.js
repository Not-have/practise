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
        this.receiverFns.forEach(item => {
            item();
        });
    }
}

/**
 * watchFn 需要响应的函数，都传进来
 * @param fn 函数
 */
const depend = new Depend();

function watchFn(fn) {
    depend.addDepend(fn);
}

const obj = {
    name: "里斯",
    age: 18
};

const objProxy = new Proxy(obj, {
    get(target, key, receiver) {
        return Reflect.get(target, key, receiver);
    },
    set(target, key, newValue, receiver) {
        Reflect.set(target, key, newValue, receiver);
        depend.notify();
    }
});

function fun() {
    console.log(objProxy.name);
    console.log("Hello World! ");
}

watchFn(fun);
watchFn(function demo() { // 这块也可以是匿名函数
    console.log("demo，需要响应 obj 的变化");
});

watchFn(function (){
    console.log("age 改变");
})

objProxy.name = "哈哈哈";
objProxy.name = "呵呵呵";

objProxy.age = 14;
