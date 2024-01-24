/**
 *  set类似于数组，但是里面的数据是不能重复的
 */
const setArr = new Set();

setArr.add(10);
setArr.add(10); // 这个 10 在 Set 中是不存在的
setArr.add(20);
setArr.add(30);
setArr.add(40);
setArr.add(60);

// 他是存在两份的，因为 对象不是一个（分别是两个内存地址）
setArr.add({age: 10});
setArr.add({age: 10});
//但是下面这样写，就会只存在一个了，因为指向了同一个内存地址
const obj = {age: 16};
setArr.add(obj);
setArr.add(obj);

console.log(setArr);

/**
 * 使用 Set 的特性进行去重
 */

const arr = [11, 22, 33, 44, 55, 55, {age: 18}, {age: 18}, obj, obj];

const setArr2 = new Set(arr);
const newArr = [...setArr2]
console.log(newArr); // [ 11, 22, 33, 44, 55, { age: 18 }, { age: 18 }, { age: 16 } ]


// size 属性
console.log(setArr2.size);

/**
 * delete 删除元素
 */
setArr2.delete(11)
console.log(setArr2);

/**
 * has 是否存在，存在返回 true，不存在返回 false
 */
console.log(setArr2.has(22));