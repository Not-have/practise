// 引入 JSDOM
const { JSDOM } = require("jsdom");
// 引入express
const express = require("express");

// 创建 express 路由
const domRender = express.Router();

// 定义 /dom 路由
domRender.get("/", function (req, res) {
    res.set('content-type', 'text/javascript');
    // 创建 JSDOM 实例
    const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

    const callback = req.query.callback; // 获取的方法名

    // 从 JSDOM 中获取 window 和 document 对象
    const window = dom.window;
    const document = window.document;

    // 创建 <div> 元素
    const div = document.createElement("div");
    div.textContent = "测试";

    // 将创建的 DOM 元素转换为字符串
    const divString = div.outerHTML;

    /**
     * jsonp 是全局运行时的方法名
     */
    const response = `${callback}(${JSON.stringify(divString)})`;

    res.send(response);
});

// 导出路由模块
module.exports = domRender;
