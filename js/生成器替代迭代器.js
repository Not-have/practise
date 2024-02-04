/**
 * 创建迭代器
 */

/*
function createArrayIterator(arr) {
    let test-03.js = 0;
    return {
        next: () => {
            if (test-03.js < arr.length) {
                return {done: false, value: arr[test-03.js++]};
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


