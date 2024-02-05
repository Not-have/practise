/**
 * 导出
 * 在 test-02 中使用 test-01 的方式
 * 但是你一定要去 main 中去加载这个模块
 * 也可以在加载  test-02 的时候，去加载 test-01 模块（不用在 main 中加载，但是一定要注册），加载方式：define(["test01"], function (value) {
 *     console.log(value, "在 test-02 中使用 test-01 的数据");
 * });
 */
define(function () {
    require([ "test01" ], function (value) {
        console.log(value, "在 test-02 中使用 test-01 的数据");
    });

    const age = 2;

    // 返回外部要使用的参数
    return {
        age
    };
});