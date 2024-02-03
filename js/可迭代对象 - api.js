/**
 * 数组本身就是一个可迭代对象
 * 也就是说数组中本身就有 Symbol.iterator
 * Map/Set 也是可迭代对象
 * 函数中 arguments 也是一个可迭代对象
 * 字符串
 * 只有可迭代对象，才可以使用 for...of...
 * 注：对象是不可以的
 */
const arr = ["你好", "哈哈", "啊啊"];

const iterator = arr[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());