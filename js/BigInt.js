// 计算机最大的数字展示
const maxInt = Number.MAX_SAFE_INTEGER;
console.log(maxInt); // 9007199254740991

/**
 * 新增了一个数据类型 bigInt
 * 你必须在数字后加个 n
 * BigInt() 进行大数字的转换
 */
const bigInt = 9007199254740991011212n;
// console.log(bigInt + 10); // 直接 + 10 是不允许的
// 加 10 的写法
console.log(bigInt + 10n);
// 也可通过 BigInt() 进行转化
console.log(bigInt + BigInt(10));