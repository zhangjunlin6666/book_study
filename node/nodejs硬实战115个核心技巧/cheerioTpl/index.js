var fs = require('fs');
var cheerio = require('cheerio');

// html在本地使用fs模块读取内容

fs.readFile('./index.html',function(err,html){
    if(err){
        throw new Error(err);
    }

    var $ = cheerio.load(html);
    var domList = $('.have-img');
    domList.each(function(index,item){
        var children = $(this).find('.title').text();
        console.log('第' + index + '个li中的a标签！', children)
    })
})
