var mongodb = require('./db'); // 引入连接数据库的函数
function User(user) {
    this.name = user.name;
    this.password = user.password;
}
User.prototype.save = function (callback) {
    var user = {
        name: this.name,
        password: this.password
    }
    mongodb(function (err, db, dbClose) {
        if (err) {
            // 连接数据库错误
            dbClose.close();
            return callback && callback(err);
        }
        db.collection('users', function (colErr, collection) {
            // 查找集合错误
            if (colErr) {
                dbClose.close();
                return callback && callback(colErr);
            }
            collection.createIndex('name', {
                unique: true
            }); // 创建唯一约束
            collection.insert(user, function (insertErr, user) {
                dbClose.close();
                if (insertErr) {
                    // 保存数据出错
                    return callback && callback(insertErr);
                }
                callback && callback(insertErr, user);
            })
        })
    })
}
User.get = function (username, callback) {
    mongodb(function (err, db, dbClose) {
        if (err) {
            // 连接数据库错误
            dbClose.close();
            return callback && callback(err);
        }

        db.collection('users', function (colErr, collection) {
            // 查找集合错误
            if (colErr) {
                dbClose.close();
                return callback && callback(colErr);
            }
            collection.findOne({
                name: username
            }, function (findErr, doc) {
                dbClose.close();
                if (findErr) {
                    // 查询数据出错
                    return callback && callback(findErr);
                }
                if (doc) {
                    // 如果查询结果存在，那么重新调用callback，回调中处理了存在时弹出的消息提示
                    var user = new User(doc);
                    callback && callback(findErr, user);
                } else {
                    callback && callback(findErr, null);
                }
            })
        })
    })
}
module.exports = User;