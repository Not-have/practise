/**
 * 下面就是一个迭代器
 * 但是他是毫无作用的
 */

/*
const iterator = {
    next: function () {
        return {done: true, value: "test"};
    }
};
*/

/**
 * 创建一个迭代器，去访问一个数组
 * 如果迭代器能够生成序列中的下一个值，则返回 false 布尔值。（这等价于没有指定 done 这个属性。）
 *
 * 如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。
 */
function createArrayIterator(arr) {
    let index = 0;
    const arrIterator = {
        next: function () {
            // return {done: false, value: "你好"};
            // return {done: false, value: "哈哈"};
            // return {done: false, value: "啊啊"};
            // return {done: true, value: undefined};
            if (index < arr.length) {
                return {done: false, value: arr[index++]};
            } else {
                return {done: true, value: undefined};
            }
        }
    };
    return arrIterator;
}

const arr1 = ["你好", "哈哈", "啊啊"];
const arr1Iterator = createArrayIterator(arr1);

console.log(arr1Iterator.next());
console.log(arr1Iterator.next());
console.log(arr1Iterator.next());
// 前面的都能访问到，后面的就无法访问了
console.log(arr1Iterator.next());
console.log(arr1Iterator.next());

const arr2 = [1, 2, 3, 4, 5, 6];
const arr2Iterator = createArrayIterator(arr2);
console.log(arr2Iterator.next());
console.log(arr2Iterator.next());
console.log(arr2Iterator.next());
console.log(arr2Iterator.next());
console.log(arr2Iterator.next());
console.log(arr2Iterator.next());
console.log(arr2Iterator.next());
console.log(arr2Iterator.next());
