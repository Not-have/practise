// 1.引用express
//require 模板的引入
var express=require("express");
// 2.创建出express对象（方便使用他的属性和方法）
var app=express();
// 3.创建服务    （/ 表示默认情况下，端口号后面，什么都没有）
app.get("/list",function(req,res){
   res.send("ok");
})
// 4.监听端口
app.listen(3000);

// 访问  http://localhost:3000/list 就能查看效果了
