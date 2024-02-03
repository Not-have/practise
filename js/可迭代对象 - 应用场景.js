const iterableObj = {
    arr: ["你好", "哈哈", "啊啊"],
    // Symbol.iterator 是一个函数
    [Symbol.iterator]: function () {
        let index = 0;
        return {
            // 不使用箭头函数的话 this 指向存在问题
            next: () => {
                if (index < this.arr.length) {
                    return {done: false, value: this.arr[index++]};
                } else {
                    return {done: true, value: undefined};
                }
            }
        };
    }
};

const [item1, item2] = iterableObj;

const set = new Set(iterableObj)

const arr = Array.from(iterableObj);
console.log(arr);

Promise.all(iterableObj).then(res => {
    console.log(res);
})