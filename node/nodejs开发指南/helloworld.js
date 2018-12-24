/*  安装supervisor或者nodemon模块，避免内容改动后，重启nodejs服务，
    安装后使用supervisor启动程序可以做到实时编译
    安装 npm install -g supervisor 或者 npm install -g nodemon
*/
var http = require('http');

http.createServer(function(req,res){
    res.writeHead('200',{'Content-Type':'text/html'})
    res.write('<h1>node.js</h1>')
    res.end('<p>hello world</p>')
}).listen(4000)

console.log('http://127.0.0.1:4000')