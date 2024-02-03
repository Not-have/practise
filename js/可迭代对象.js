//
const iterableObj = {
    arr: ["你好", "哈哈", "啊啊"],
    // Symbol.iterator 是一个函数
    [Symbol.iterator]: function () {
        let index = 0;
        return {
            // 不使用箭头函数的话 this 指向存在问题
            next: () => {
                /**
                 * if (index < 1) { 时
                 * for (const item of iterableObj) {
                 *     console.log(item);
                 * } 他只会遍历一次，因为 for...of 的本质也是使用 next 进行遍历的
                 */
                if (index < this.arr.length) {
                    return {done: false, value: this.arr[index++]};
                } else {
                    return {done: true, value: undefined};
                }
            }
        };
    }
};

/*
// 下面的代码，一般情况下是不会使用的
const iterator1 = iterableObj[Symbol.iterator]();
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());

const iterator2 = iterableObj[Symbol.iterator]();
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
 */

// for...of 可以遍历的东西，必须是一个可迭代的对象
for (const item of iterableObj) {
    console.log(item);
}