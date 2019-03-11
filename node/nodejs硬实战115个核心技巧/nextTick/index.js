var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var content;
// function complexOperations(){
//     var events = new EventEmitter();

//     // 使用process.nextTick方法把回调房在下一次事件轮询队列的头上
//     process.nextTick(function(){
//         events.emit('success');
//     })
//     return events;
// }

// complexOperations().on('success',function(){
//     console.log('success');
// })

function readFile(cb){
    if(!content){
        fs.readFile(__filename,'utf8',function(err,data){
            content = data;
            console.log('readFile:readFile');
            cb(err,content);
        })
    } else {
        process.nextTick(function(){
            console.log('readFile:cached');
            cb(null,content);
        })
    }
}
readFile(function(err,data1){
    console.log('1.length',data1.length)
})
readFile(function(err,data2){
    console.log('2.length',data2.length)
})

console.log('Reading file ...')





