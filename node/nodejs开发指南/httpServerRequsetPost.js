var http = require('http'),
    fs = require('fs');

http.createServer(function(req,res){
    req.setEncoding('utf-8');
    res.setHeader('Access-Control-Allow-Origin', null); // 设置允许跨域
    res.setHeader('Access-Control-Request-Methods',"PUT,POST,GET,DELETE,OPTIONS"); // 允许的请求方法
    res.setHeader("Content-Type", "application/json;charset=utf-8"); // 文本类型
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');  // 设置合理的头部避免前端无法请求
    var post = '';
    if(req.method == 'POST' || req.method == 'OPTIONS'){
        req.on('data',function(chunk){
            post += chunk;
        })
        req.on('end',function(){
            var arr = [];
            fs.readFile('./username.json','utf-8',function(err,data){
                if(err){
                    throw err.error
                }else{
                    if(data != ''){
                        arr = JSON.parse(data);
                    }
                    if(post != ''){
                        post = JSON.parse(post);
                        arr.push(post);
                        fs.writeFile('./username.json',JSON.stringify(arr),function(err,data){
                            if(err){
                                throw err.error
                            }else{
                                console.log('写入成功');
                            }
                        })
                    }
                }
            }) 
            res.end(JSON.stringify({
                code:200,
                msg:'请求成功',
                data:arr
            }));     
        })
    }

    if(req.method == 'GET'){
        fs.readFile('./username.json','utf-8',function(err,data){
            if(err){
                throw err.error
            }else{
                var ul = '暂无内容';
                if(data != ''){
                    JSON.parse(data).forEach(item => {
                        ul = '';
                        ul += `
                            <li>
                                <span>${item.name}</span>
                                <span>${item.pwd}</span>
                            </li>
                        `
                    })
                    ul = `<ul>${ul}</ul>`
                }
                res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'}); 
                res.end(ul);
            }
        }) 
    }
    
}).listen(3002,function(){
    console.log('启动服务')
});