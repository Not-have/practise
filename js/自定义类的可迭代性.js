class Person {
    /**
     * 这里可以不止有 names 一个参数，你可以根据情况自己添加
     */
    constructor(names) {
        this.names = names;
    }

    entry(newName) {
        this.names.push(newName);
    }

    /**
     * 下面这样就可以获取 class 中指定的迭代器了
     */
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.names.length) {
                    return {done: false, value: this.names[index++]};
                } else {
                    return {done: true, value: undefined};
                }
            },
            // 这个不会经常使用
            return: () => {
                console.log("迭代器提前截至了");
                return {done: true, value: undefined};
            }
        };
    }
}

const p1 = new Person(["小明", "小花", "哈哈哈"]);

for (const item of p1) {
    console.log(item);
}

for (const item of p1) {
    if (item === "小花") break;
    console.log(item);
}