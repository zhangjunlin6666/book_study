var stream = require('stream');
var fs = require('fs');

CSVParser.prototype = Object.create(stream.Transform.prototype,{
    constructor:{
        value: 'CSVParser'
    }
})
function CSVParser(options){
    stream.Transform.call(this,options); 
    this.value = '';
    this.headers = [];
    this.values = [];
    this.line = 0;
}

CSVParser.prototype._transform = function(chunk,encoding,cb){
    var c,i;
    chunk = chunk.toString();

    for(var i = 0; i < chunk.length; i ++){
        c = chunk.charAt(i);
        
        if(c === ','){
            this.addValue();
        } else if( c === 'n'){
            this.addValue();
            if(this.line > 0){
                this.push(JSON.stringify(this.toObject()));
            }
            this.values = [];
            this.line ++;
        } else {
            this.value += c;
        }
    }
    cb();
}

CSVParser.prototype.toObject = function(){
    var i;
    var obj = {};
    for(var i = 0; i < this.headers.length; i ++){
       obj[this.headers[i]] = this.values[i];
    }
    return obj;
}

CSVParser.prototype.addValue = function(){
    if(this.line === 0){
        this.headers.push(this.value);
    } else {
        this.values.push(this.value);
    }
    this.value = '';
}

var parser = new CSVParser();

fs.createReadStream(__filename)
    .pipe(parser)
    .pipe(process.stdout);
