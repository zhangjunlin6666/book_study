var assert = require('assert');
var CountStream = require('./countstream');
var count = new CountStream('example');
var a = 'example example and example or example'
var fs = require('fs');
var passed = 0;

count.on('total',function(count){ // 监听total事件
    assert.equal(count,5); // 断言所预计的计数
    passed ++;
})

fs.createReadStream(__filename).pipe(count); // __filename为全局变量，表示的是当前所在的文件

process.on('exit',function(){ // 程序结束时调用
    console.log('assertions passed:',passed);
})