// 实例1
var util = require('util');
var events = require('events');

function EventTracker(){
    events.EventEmitter.call(this);
}
util.inherits(EventTracker,events.EventEmitter);

var eventTracker = new EventTracker();

// 当添加新的监听器时，newlistener事件就会被触发
eventTracker.on('newListener',function(name,listener){
    console.log('Event name added:',name);
})

eventTracker.on('click',function(){

})

// 实例2
function Pulsar(speed,times){
    events.EventEmitter.call(this);
    var self = this;
    this.speed = speed;
    this.times = times;

    this.on('newListener',function(name,listener){
        if(name === 'pulse'){
            console.log(8888)
            self.start();
        }
    })
}

util.inherits(Pulsar,events.EventEmitter);

Pulsar.prototype.start = function(){
    var self = this;
    var id = setInterval(function(){
        self.emit('pulse');
        self.times --;
        if(self.times === 0){
            clearInterval(id);
        }
    },this.speed)
}

Pulsar.prototype.stop = function(){
    // 当pulse没有监听时，会抛出错误
    if(this.listeners('pulse').length === 0){
        throw new Error('No listeners have been added!');
    }
}

var pulsar = new Pulsar(500,5);

pulsar.on('pulse',function(){
    console.log('.');
})

pulsar.stop();

