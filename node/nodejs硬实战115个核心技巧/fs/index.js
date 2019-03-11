var fs = require('fs');
var finder = require('./find');

try{
    var results = finder.findSync(/(.js)$/,__dirname);
    console.log(__dirname)
    console.log(results);
} catch(err){
    console.log(err)
}

















// var a = fs.readdir('./../stream',function(err,info){
//     console.log(info)
// });

// var b = fs.stat('./../stream',function(err,info){
//     console.log(info)
// });