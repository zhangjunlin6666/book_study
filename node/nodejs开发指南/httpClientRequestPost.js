// http模块提供了两个函数http.request和http.get，功能是作为客户端向http服务器发起请求
/**
 *  http.request(options,callback)，返回一个http.ClientRequest的实例
 *      options的常用参数如下：
 *          host:服务器域名或ip地址
 *          port:服务器端口，默认80
 *          method:请求方法，默认get
 *          path:请求根路径，默认是‘/’
 *          headers:一个关联数据，请求头
 *      callback：传递一个参数，为http.clientResponse的实例，即req
 */

 var http = require('http');

 var cons = {
     name:'张三',
     pwd:'lisi'
 }

 var options = {
     host:'127.0.0.1',
     port:3002,
     method:'POST',
     headers:{
         'Content-Type':"application/json"
     }
 }

 var req = http.request(options,function(res){
     res.setEncoding('utf8');

     res.on('data',function(data){
         console.log(data)
     })
 })

 req.write(JSON.stringify(cons));
 req.end();