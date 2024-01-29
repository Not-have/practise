const obj = {
    name: "里斯"
};

const testWeakMap = new WeakMap();

/**
 * set key 不能使用基础数据类型
 * get 获取指定 key 的value
 * has 是否包含某个 key
 * delete 删除指定 key 的元素
 */

testWeakMap.set(obj, "哈哈哈");
console.log(testWeakMap.get(obj));
console.log(testWeakMap.has(obj));
console.log(testWeakMap.delete(obj));

console.log(testWeakMap);