var http = require('http');

http.createServer(function(req,res){
    res.write('book1 is book2 and water or wode');
    res.end();
}).listen(3000,function(){
    console.log('服务启动成功')
})