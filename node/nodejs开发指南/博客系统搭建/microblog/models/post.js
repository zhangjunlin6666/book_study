var mongodb = require('./db');

function Post(username,post,time){
    this.username = username;
    this.post = post;
    if(time){
        this.time = time;
    }else{
        this.time = new Date();
    }
}

Post.prototype.save = function(callback){
    // 存入mongodb的文档
    var post = {
        user:this.username,
        post:this.post,
        time:this.time
    }

    mongodb(function(err,db,dbClose){
        if (err) {
            // 连接数据库错误
            dbClose.close();
            return callback && callback(err);
        }
        db.collection('posts',function(colErr,collection){
            // 查找集合错误
            if (colErr) {
                dbClose.close();
                return callback && callback(colErr);
            }

            collection.createIndex('user');
            collection.insert(post,function(err,data){
                dbClose.close();
                callback(err,data);
            })
        })
    })
}

Post.get = function(username,callback){
    mongodb(function(err,db,dbClose){
        if (err) {
            // 连接数据库错误
            dbClose.close();
            return callback && callback(err);
        }
        db.collection('posts',function(colErr,collection){
            // 查找集合错误
            if (colErr) {
                dbClose.close();
                return callback && callback(colErr);
            }
            // 查找user属性为username的文档，如果username为null则匹配全部
            var query = {};
            if(username){
                query.user = username;
            }

            // 按照时间字段降序排序
            collection.find(query).sort({time:-1}).toArray(function(err,data){
                dbClose.close();
                if(err){
                    return callback && callback(err,null)
                }
                callback && callback(err,data)
            })
        })
    })
}

module.exports = Post;