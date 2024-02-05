/**
 * 这个 require 是来自于 lib/require.js（lib 下放的是第三方的包）
 */
require.config({
    // 作为下面 paths 默认 url 的
    // baseUrl: "./src",
    paths: {
        /**
         * 注册模块
         * 内部自动加后缀 .js，座椅这里不用加
         * “./src” 需要加，是因为他是相对于 index.html 去找文件的，所以要加，因为 他不存在自动化目录处理（默认是有 scr 的，来自 baseUrl 给的默认值，他也是可以修改的）
         */
        test01: "./test-01",
        test02: "./test-02"
    }
});

/**
 * 下面这个样子就能得到 test01 中导出的内容了
 * 不在这 test-02，你在 test-02 中就无法使用 test-01 中的数据
 */
require([ "test01", "test02" ], function (value1, value2) {
    console.log(value1, value2);
});