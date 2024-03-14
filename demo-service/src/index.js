// 引入express
const express = require("express");
const cors = require('cors');
// 创建出express对象
const app = express();

// 设置跨域访问
app.use(cors());

// 引入 /list 路由模块
const domRender = require("./dom/render-dom");
const dataCrossDomainProxy = require("./data/cross-domain-proxy")
console.log(__dirname);
app.use('/public', express.static(__dirname + "/public"));
app.use("/dom", domRender);
app.use("/data", dataCrossDomainProxy);

// 监听端口
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
