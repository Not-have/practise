// 1.����express
//require ģ�������
var express=require("express");
// 2.������express���󣨷���ʹ���������Ժͷ�����
var app=express();
// 3.��������    ��/ ��ʾĬ������£��˿ںź��棬ʲô��û�У�
app.get("/list",function(req,res){
   res.send("ok");
})
// 4.�����˿�
app.listen(3000);

// ����  http://localhost:3000/list ���ܲ鿴Ч����
