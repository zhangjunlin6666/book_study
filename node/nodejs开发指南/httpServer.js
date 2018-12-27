/**
 *  http.server的事件：
 *      request：当客户端请求到来时，触发该事件
 *              该事件接受两个参数，req和res，分别是http.ServerRequest和http.ServerResponse的实例，表示请求和响应信息
 *      connection：当tcp连接时，触发该事件，
 *      close：当服务器关闭时，触发该事件，注意不是用户连接断开时
 *      除此之外，还有checkContinue、upgrade、clientError事件，实现复杂的http服务器时才会用到
 */
var http = require('http');

// 源码中调用createServer方法会返回一个服务器对象，return new Server();
// http.createServer(function(req,res){
//     res.writeHead('200',{'Content-Type':'text/html'})
//     res.write('<h1>node.js</h1>')
//     res.end('<p>hello world</p>')
// }).listen(4000)

var server = new http.Server(); // 更底层的接口，可以做更复杂的服务器

server.on('request',function(req,res){
    /**
     * http.ServerRequest 提供了三种事件用于控制请求体传输，一般用于post请求时，接手请求体中的参数
     *      data：当请求体数据到来时，该事件被触发。可能会出发多次
     *      end：当请求体数据传输完成时，该事件被触发。
     *      close：用户当前请求结束时，该事件被触发，用户强制终止传输，也会触发。
     */
    res.writeHead('200',{'Content-Type':'text/html'})
    res.write('<h1>node.js</h1>')
    res.end('<p>hello world</p>')
})

server.on('connection',function(socket){
    console.log('建立tcp连接');
    console.log(socket)
})

server.listen(3000,function(){
    console.log('服务器启动成功')
});