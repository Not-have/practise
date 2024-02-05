/**
 * 导出的第一种方式
 */
export const name1 = "我是 name1";

/**
 * 导出的第二种方式
 */
const name2 = "我是 name2";
export { // 里面可写多个
    name2
};

/**
 * 导出的第三种方式（起别名）
 * 不常用
 */
const name3 = "我是 name3";
export { // 里面可写多个
    name3 as name3Alias
};