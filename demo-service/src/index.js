// 引入express
const express = require("express");

// 创建出express对象
const app = express();

// 引入 /list 路由模块
const domRender = require("./dom/render-dom");
const dataCrossDomainProxy = require("./data/cross-domain-proxy")

app.use("/dom", domRender);
app.use("/data", dataCrossDomainProxy);

// 监听端口
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
