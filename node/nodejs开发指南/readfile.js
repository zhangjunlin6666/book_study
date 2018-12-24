var fs = require('fs');

// 异步读取文件
// fs.readFile('./read.json','utf-8',function(error,data){
//     if(error){
//         console.log(error.error)
//     }else{
//         console.log(data);
//     }
// })

// 同步读取文件
var file = fs.readFileSync('./read.json','utf-8');
console.log(file);
console.log('end');