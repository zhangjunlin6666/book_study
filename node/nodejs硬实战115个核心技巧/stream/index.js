var http = require('http');
var fs = require('fs');
var zlib = require('zlib');


http.createServer(function(req,res){
    res.writeHead(200,{'content-encoding':'gzip'})
    // 通过管道将读取流发送给写入流
    fs.createReadStream('./index.html')
    // 启用gzip压缩
        .pipe(zlib.createGzip())
        .pipe(res);
}).listen(4000,function(){
    console.log('http://127.0.0.1:4000');
})