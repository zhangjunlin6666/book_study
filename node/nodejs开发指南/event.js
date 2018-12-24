// 事件模块
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

// 事件监听
event.on('someEvent',function(res){
    console.log(res);
})

setTimeout(function(){
    // 事件触发
    event.emit('someEvent','你好');
},1000)