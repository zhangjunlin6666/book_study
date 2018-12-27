var http = require('http'),
    url = require('url'),
    util = require('util');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end(util.inspect(url.parse(req.url,true)));
    /**
     * {
            protocol: null, 
            slashes: null,
            auth: null,
            host: null,
            port: null,
            hostname: null,
            hash: null,
            search: '?a=1&b=2',
            query: [Object: null prototype] { a: '1', b: '2' },
            pathname: '/user',
            path: '/user?a=1&b=2',
            href: '/user?a=1&b=2' 
        }
     */
}).listen(3001);
