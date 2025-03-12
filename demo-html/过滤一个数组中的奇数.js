// 原始数组
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 过滤奇数，保留偶数，保留奇数为 n % 2 !== 0
const evenNumbers = numbers.filter(n => n % 2 === 0);

console.log(evenNumbers); // 输出: [2, 4, 6, 8, 10]