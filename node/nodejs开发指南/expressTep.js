// 4.0以后express的中间件需要npm安装，不再挂在express上
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.all('/',function(req,res){
    res.send('hello ' + req.body.name + ',your password is: ' + req.body.pwd);
}).listen(3003,function(){
    console.log('服务启动成功')
});