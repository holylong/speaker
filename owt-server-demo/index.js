// 引入 express 框架
const express = require('express');
// 实例化 express 赋值给 app 创建网站服务器
const app = new express();
// 配置路由,匹配URI地址实现不同的功能
// app.get 主要用来显示数据
app.get('/', function(req, res) {
    res.send("Hello World!");
})

app.get('/article', function(req, res) {
    res.send("新闻页面");
})

app.get('/login', function(req, res) {
    res.send("登录页面");
})

app.get('/register', function(req, res) {
    res.send("注册页面");
})

app.post('stream', (req,res)=>{
    let query = req.query;
    res.send(query.name+"-post test");
})

/// 监听端口
app.listen(4387);

