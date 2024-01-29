const arr = [11, 22, 33, 44, 55, 66, 77];

/**
 * 第一个参数 判断数组中是否包含
 * 第二个参数 从下标几开始判断是否包含
 * 返回值 包含返回 true，不包含返回 false
 * 注：indexOf 无法判断是否包含 NaN
 */
if (arr.includes(11, 2)) {
    console.log("包含");
}
