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

function fun() {
    console.log("Hello World! ");
    console.log(obj.name);
}

watchFn(fun);
watchFn(function demo() { // 这块也可以是匿名函数
    console.log("demo");
});

function bar() {
    console.log("不需要响应");
}

obj.name = "哈哈哈";
depend.notify();
