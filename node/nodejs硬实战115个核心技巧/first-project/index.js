var CountStream = require('./countstream');
var count = new CountStream('book');
var http = require('http');

http.get('http://127.0.0.1:3000',function(res){ // 请求本地服务
    res.pipe(count); // 通过管道的形式将数据传输给流count
});

count.on('total',function(res){ // 当写入完成后会出发total事件
    console.log('total matches:' + res);
})