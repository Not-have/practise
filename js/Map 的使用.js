const obj1 = {
    name: "里斯"
};

const obj2 = {
    age: 18
};

/**
 * js 中不允许对象为 key
 */
const info = {
    [obj1]: "啊啊啊",
    [obj2]: "哈哈哈"
};

console.log(info); // { '[object Object]': '哈哈哈' }

/**
 * Map 允许 key 为对象
 */
const mapTest1 = new Map();
mapTest1.set(obj1, "啊啊啊");
mapTest1.set(obj2, "哈哈哈");
mapTest1.set(1, "呵呵呵");

console.log(mapTest1);

// 也可使用下面的方式创建
const mapTest2 = new Map();
mapTest2.set(obj1, "啊啊啊");
mapTest2.set(obj2, "哈哈哈");
mapTest2.set(2, "呵呵呵");

console.log(mapTest2);

/**
 * Map 的属性
 * set
 * get 传入 key 获取对应的 value
 * has 判断某个 key 是否存在
 * delete 删除指定 key 的元素
 * clear 清除
 */
console.log(mapTest2.get(2));
console.log(mapTest2.has(2));
mapTest2.delete(2);
console.log(mapTest2);
mapTest2.clear();
console.log(mapTest2);

/**
 * 遍历
 */
mapTest1.forEach((item, index) => {
    console.log(item, index);
})

for (const item of mapTest1) {
    const [key, value] = item;
    console.log(item, key, value);
}