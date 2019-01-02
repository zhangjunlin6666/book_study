var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 解析cookie的中间件
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session'); // 提供会话支持
var MongoStore = require('connect-mongo')(session); // 用于将用户信息存储在mongo数据库中，而不是内存中
var flash = require('connect-flash'); // 用于向浏览器抛出错误
var settings = require('./settings');
var app = express();
var fs = require('fs');
var morgan = require('morgan'); // 用于访问日志的创建
// 创建访问日志写入流文件
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
var errorLogStream = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // 解析cookie
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(session({
  secret: settings.cookieSecret, 
  store: new MongoStore({
    url:settings.dbAddress // 数据库地址
  }),
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
 
// 应用中间件
app.use(morgan('combined', { stream: accessLogStream }));

// 静态视图助手,可在视图中全局调用
app.locals.appName = 'microblog';
app.locals.sayHello = function(){
  return 'hello world'
}

// 动态视图助手,可在视图中全局调用
app.use(function(req,res,next){
  res.locals.appUrl = req.url;
  res.locals.Welcome = function(){
    return 'welcome to the page, the url is:' + res.locals.appUrl;
  }
  res.locals.user = function(){
    console.log(req.session.user);
    return req.session.user;
  }
  // 注意此处需要用toString()方法将其转化成字符串
  res.locals.error = req.flash('error').toString();
  res.locals.success = req.flash('success').toString();
  // 不要忘记调用next方法
  next();
})


// 路由，如果想要应用layout必须将路由写在app.use(expressLayouts)后面才会生效
var routers = require('./routes');
app.use(express.Router(routers(app)));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  
  // 错误日志输出
  var meta = `[${new Date()}]${req.url}\n`;
  errorLogStream.write(meta + err.stack + '\n');
});

module.exports = app;
