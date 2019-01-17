var Writable = require('stream').Writable; // 继承了eventemitter，所以它拥有emit和on方法
var util = require('util');

function CountStream(matchText,options){
    Writable.call(this,options); // 继承可写流构造函数上的方法
    this.count = 0;
    this.matcher = new RegExp(matchText,'ig');
}

CountStream.prototype._write = function(chunk,encoding,cb){
    var matchers = chunk.toString().match(this.matcher);
    if(matchers){
        this.count += matchers.length;
    }
    cb();
}
CountStream.prototype.end = function(){
    this.emit('total',this.count);
}

util.inherits(CountStream,Writable); // 继承可写流原型上的方法和属性

module.exports = CountStream