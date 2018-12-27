// global.process 描述当前nodejs进程状态的对象，提供了一个与操作系统的简单接口
// process.argv是命令行参数数组，第一个元素是node，第二个元素是脚步文件名，从第三个元素开始每个元素是一个运行参数

//全局变量process

// 1、process.argv命令行参数
console.log(process.argv);

/**
 *  命令行运行：node global.js 1992 name=jackson --v 'zhang jun';
 *  输出：[ 
 *          '/usr/local/bin/node',
            '/Users/jackson/Desktop/book_study/node/nodejs开发指南/global.js',
            '1992',
            'name=jackson',
            '--v',
            'zhang jun' 
        ]
 */

 // 2、process.stdout是标准输出流，提供了更底层的接口
 process.stdout.write('你好呀')

 // 3、process.stdin是标准输入流，初识时他是被暂停的，要想从标准输入读取数据，必须恢复流，并手动编写流的事件响应函数
//  process.stdin.resume(); // 恢复流
//  process.stdin.on('data',function(data){
//     process.stdout.write('read from console:' + data.toString());
//  })

 // 4、process.nextTick(callback) 的功能是为事件循环设置一项任务，nodejs会在下次事件循环响应时调用callback。
 process.nextTick(function(){
     console.log('我是nextTick')
 })

// 常用工具util

// 5、util.inherits(constructor.superConstructor)是一个实现对象间原型继承的函数
var util = require('util');

function Base(){
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function(){
        console.log('hello' + this.name);
    }
}

Base.prototype.showName = function(){
    console.log(this.name);
}

function Sub(){
    this.name = 'sub';
}

util.inherits(Sub,Base); // Sub子类继承父类Base,Sub在方法上仅继承了Base原型上的方法，同时，父类中的属性也没有被继承！

var objBase = new Base();
objBase.sayHello();
objBase.showName();
console.log(objBase); // 输出{ name: 'base', base: 1991, sayHello: [Function] }


var objSub = new Sub();
// objSub.sayHello();
objSub.showName();
console.log(objSub); // 输出{ name: 'sub' } 没有base和sayHello

// 6、util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换为字符串的方法，通常用于调试和错误输出。
    /** showHidden 如果为true，会输出更多隐藏信息
     *  depth 表示递归的最大层数，，默认递归2层，指定为null表示将不限递归层数完整遍历对象
     *  colors 值为true，会在终端显示更漂亮的颜色
     */

function Person(){
    this.name = 'jackson';
    this.toString = function(){
        return this.name;
    }
}
 
var obj = new Person();

console.log(util.inspect(obj)); // 输出{ name: 'jackson', toString: [Function] }
console.log(util.inspect(obj,true));  
/**
    输出：
    {
        name: 'jackson',
        toString:
        { 
            [Function]
            [length]: 0,
            [name]: '',
            [arguments]: null,
            [caller]: null,
            [prototype]: { [constructor]: [Circular] } 
        } 
    }
*/

// util.isArray()、util.isRegExp()、util.isDate()、util.isError()、util.format()、util.debug()等工具


// 事件发射器events，事件监听器一定要写在事件发射器之前
/*
    events模块只提供了一个对象:events.EventEmitter。EventEmitter的核心就是事件发射器和事件监听器功能的封装
    EventEmitter的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义，
    对于每个事件，EventEmitter支持若干个事件监听器
*/

var events = require('events');
var emitter = new events.EventEmitter();

emitter.on('someEvent',function(arg1,arg2){
    console.log('listener1',arg1,arg2);
})

emitter.on('someEvent',function(arg1,arg2){
    console.log('listener2',arg1,arg2);
})
emitter.emit('someEvent','jackson',1991);


// 其他events api
/*
单次监听器，监听器最多触发一次，出发后立即解除该监听器
emitter.once('someEvent',function(...rest){
    console.log(rest);
})

移除指定事件的某个监听器，listener必须是该事件已经注册过的监听器
emitter.removeListener(event,listener)

移除所有事件的所有监听器，如果指定event，则移除指定事件的所有监听器
emitter.removeAllListeners([event])
*/
emitter.on('error',function(){
    console.log('发生错误了')
})
emitter.emit('error');


// fs 文件系统模块

// 读取文件
var fs = require('fs');
fs.readFile('./read.json',function(err,data){
    if(err){
        console.log(err.error)
    }else{
        console.log(data);
    }
})

fs.readFile('./read.json','utf-8',function(err,data){
    if(err){
        console.log(err.error)
    }else{
        console.log(data);
    }
})

try{
    // 同步读取
    var con = fs.readFileSync('./a.json','utf-8');
    console.log(con)
}catch(err){
    console.log('发生错误拉')
    console.log(err.error)
}  

// fs.open 
//fs.open(path,flags,[mode],[callback(err,fd)])

/**
 *  path 文件路径
 *  flags 可以是以下值
 *      r:以读取模式打开文件
 *      r+:以读写模式打开文件
 *      w:以写入模式打开文件，如果文件不存在则创建
 *      w+:以读写模式打开文件，如果文件不存在则创建
 *      a:以追加模式打开文件，如果文件不存在则创建
 *      a+:以读取追加模式打开文件，如果文件不存在则创建
 *  mode用与给文件指定权限，默认是0666
 *  callback是回调函数
 */

 fs.open('./read.json','r',function(err,rd){
     if(err){
         console.log(err.error)
     }else{
         console.log(rd);
     }
 })

