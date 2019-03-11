var buf = new Buffer(255);
buf[0] = 23;
buf[0] = '你好';
console.log(buf[0])
console.log(buf);

var encoded = Buffer('jackson:123456').toString('base64');
console.log(encoded);

// data URIS
var mime = 'image/png';
var encoding = 'base64';
var fs = require('fs');
var data = fs.readFileSync('./../img/a.png').toString(encoding);
var uri = 'data:' + mime + ';' + encoding + ',' + data; // base64图片的格式
console.log(uri.slice(0,40));
