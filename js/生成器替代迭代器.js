/**
 * 创建迭代器
 */

/*
function createArrayIterator(arr) {
    let index = 0;
    return {
        next: () => {
            if (index < arr.length) {
                return {done: false, value: arr[index++]};
            } else {
                return {done: true, value: undefined};
            }
        }
    };
}

const arr = [1, 2, 3];
const arrIterator = createArrayIterator(arr);

console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());
*/

/**
 * 生成器替代迭代器
 */
// function* createArrayIterator(arr) {
//     /*
//     // 下面的可以替换成 yield* 后面跟可迭代对象
//     for (const item of arr) {
//         yield item
//     }
//     */
//     yield* arr
// }
//
// const arr = [1, 2, 3];
// const arrIterator = createArrayIterator(arr);
//
// console.log(arrIterator.next());
// console.log(arrIterator.next());
// console.log(arrIterator.next());
// console.log(arrIterator.next());


