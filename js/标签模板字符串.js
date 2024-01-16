/**
 * 1、模板字符串
 */

/**
 * 标签模板字符串
 * @param m 第一个参数依然是模块字符串中整个字符串，只是被切成多块,放到了一个数组中
 * @param n 第二个参数是模块字符串中，第一个
 * @param x 第三个参数是模块字符串中，第二个
 * 模板中传入了多少，就会有多少个参数，依次去获取值
 */
function fun1(m, n, x) {
    console.log(m, n, x);
}

const one = "第一个参数";
const two = "第二个参数";
fun1`你好${one}拉拉${two}。`;

/**
 * 2、函数的默认参数
 */
function fun2(m = 3, n = 4) {
    console.log(m, n);
}

fun2();