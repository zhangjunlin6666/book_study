var a = 1,
    b = 'world',
    c = function(x){
        console.log('hello' + x + a);
    };
c(b);


// 运行node debug some.js时会提示选择用inspect
// 安装inspector调试器 npm install -g node-inspect
// node --debug-brk --inspect 文件名 如 node --debug-brk --inspect debugger.js
// 通过谷歌浏览器打开：chrome://flags/#enable-devtools-experiments 开始谷歌调试
// 浏览器中打开本地连接如：http://127.0.0.1:9229/
// 详情可看：https://www.cnblogs.com/smallkure/p/8352723.html