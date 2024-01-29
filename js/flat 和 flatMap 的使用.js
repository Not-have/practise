const nums1 = [10, 20, [1, 2], [[22, 33], [55, 66]], 66];
/**
 * 平铺成一维数组
 */
const flatNums1 = nums1.flat();
console.log(flatNums1); // [ 10, 20, 1, 2, [ 22, 33 ], [ 55, 66 ], 66 ]

const flatNums2 = nums1.flat(2);
console.log(flatNums2); // [10, 20,  1,  2, 22, 33, 55, 66, 66]

/**
 * flatMap
 */
const nums2 = [10, 20, 30];
const nums3 = nums2.flatMap(item => {
    console.log(item);
    return item + 1;
});

console.log(nums3);

// flatMap 的应用场景
const messages = ["a a", "b b", "c c", "哈哈哈"];

const strs = messages.flatMap(item => {
    console.log(item);

    return item.split(" ");
});

console.log(strs);