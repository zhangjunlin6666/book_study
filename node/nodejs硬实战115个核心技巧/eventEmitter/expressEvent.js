var express = require('express');
var app = express();

app.on('hello-alert',function(){
    console.warn('Warning');
})

app.get('/',function(req,res){
    res.app.emit('hello-alert');
    res.send('hello world');
}).listen(4000,function(){
    console.log('服务启动成功！', 'http://127.0.0.1:4000')
});