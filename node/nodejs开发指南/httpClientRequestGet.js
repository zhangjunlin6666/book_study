// http.get(options,callback) 不需要手动调用req.end(),get其实是request的封装

var http = require('http');

var req = http.get({
    host:'127.0.0.1',
    port:3002
})

req.on('response',function(res){
    res.setEncoding('utf8');
    res.on('data',function(data){
        console.log(data);
    })
})