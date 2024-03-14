// 引入express
const express = require("express");

// 创建 express 路由
const crossDomainProxy = express.Router();

// 定义 /dom 路由
crossDomainProxy.get("/", function (req, res) {
    res.set('content-type', 'text/javascript');

    const callback = req.query.callback; // 获取的方法名

    const obj = {
        name: "李思思",
        age: 16
    }
    const response = `${callback}(${JSON.stringify(obj)})`;

    res.send(response);
});

// 导出路由模块
module.exports = crossDomainProxy;
