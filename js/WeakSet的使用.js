const arr1 = new WeakSet();

const obj1 = {
    age: 16
};
const obj2 = {
    age: 18
};
const obj3 = {
    age: 20
};

/**
 * add 添加元素
 */
arr1.add(obj1);
arr1.add(obj2);
arr1.add(obj3);

/**
 * delete 删除元素
 */
arr1.delete(obj1);

/**
 * has 是否包含
 */
console.log(arr1.has(obj2));

console.log(arr1);

/**
 * 应用场景
 */
const personSet = new WeakSet();

class Person {
    constructor() {
        personSet.add(this);
    }

    running() {
        if (!personSet.has(this)) {
            throw new Error("不能通过非构造方法创建出来的对象调用 running 方法");
        }
        console.log("跑步", this);
    }
}

const p = new Person();
p.running();

// 这里等于 null 的话 const personSet = new WeakSet(); 会直接销毁掉
// p = null;

p.running.call({name: "小明"});
