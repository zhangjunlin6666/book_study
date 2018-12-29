var settings = require('./../settings');
var MongoClient = require('mongodb').MongoClient;
var url = settings.dbAddress;
module.exports = function(callback){
    MongoClient.connect(url, function(err, db) {  
        if (err) {
            throw err
        }; 
        // console.log("连接数据库成功！");
        callback && callback(err,db.db('microblog'),db);
    });
}