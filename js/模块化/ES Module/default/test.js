// function add(num1, num2) {
//     return num1 + num2;
// }
//
// function reduce(num1, num2) {
//     return num1 - num2;
// }
//
// export {
//     /**
//      * 默认导出
//      * 名字 as default
//      * 该方法不常用
//      */
//     add as default,
//     reduce
// }

/**
 * 常用
 * 默认导出 只能有一个（在一个文件中，他是唯一的）
 */
export default function add(num1, num2) {
    return num1 + num2;
}