var getModule1 = require('./module1.js');
var getModule2 = require('./module2.js')
var getModule3 = require('./module3.js');
var getModule4 = require('./somepackage');

getModule1.setName('jackson');
getModule1.sayHello();

var module2 = new getModule2.hello();
module2.setName('bob');
module2.sayHello();

var module3 = new getModule3();
module3.setName('jerry');
module3.sayHello();

getModule4.hello();