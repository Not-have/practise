const str1 = undefined; // 定义未赋值的时候，就是 undefined
/**
 * 逻辑 或
 * 缺点：当 str1 为 “” 或 0 时，他就会展示逻辑或后面的，但是我其实是有值的
 * console.log(0 || "你好"); // 你好
 */
const str2 = str1 || "你好";
console.log(str2); // undefined

/**
 * 空置合并运算 ??
 * 只要不为 undefined 或 null 时，都会为真，不影响 “” 或 0 的展示
 */
const str3 = "" ?? "你好";
console.log(str3); // undefined

