var net = require('net');
var clients = 0;

var server = net.createServer(function(client){
    clients ++;
    var clientId = clients;
    console.log('Client connected:',clientId);

    client.on('end',function(){
        console.log('Client disconnected',clientId);
    })

    client.on('error',function(err){
        console.log('出错啦！',err);
    })

    client.write('Welcome client:' + clientId);
    client.pipe(client)
})

server.listen(8000,function(){
    console.log('服务已启动');
})
