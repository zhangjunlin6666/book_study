var crypto = require('crypto');
var User = require('./../models/user.js');
// 权限控制
function checkLogin(req,res,next){
  if(!req.session.user){
    req.flash('error','未登入');
    return res.redirect('/login');
  }
  next();
}

// 权限控制
function checkNotLogin(req,res,next){
  if(req.session.user){
    req.flash('error','已登入');
    return res.redirect('/');
  }
  next();
}
module.exports = function (app) { // 调用时需要将app传入进来
  // app.get('/hello', function(req, res, next) {
  //    // 如有多个路由处理函数，需要传入next，并且调用next方法将执行权交给下一个路由规则处理
  //    console.log(123)
  //    next()
  // });

  // 测试页面
  app.get('/hello', function (req, res) {
    res.render('hello', {
      title: 'hello 页面'
    });
  })

  // 首页
  app.get('/', function (req, res, next) {
    res.render('index', {
      title: '首页'
    });
  });

  // 获取用户
  app.get('/u/:user', function (req, res) {
    res.send('user')
  })

  // 提交发表的信息
  app.post('/post', function (req, res) {
    res.send('post')
  })

  // 匹配注册页面
  app.get('/reg',checkNotLogin);
  app.get('/reg', function (req, res) {
    var username = req.query.username ? req.query.username : '',
      password = req.query.password ? req.query.password : '',
      passwordRepeat = req.query.passwordRepeat ? req.query.passwordRepeat : '';
    res.render('reg', {
      title: '注册',
      username: username,
      password: password,
      passwordRepeat: passwordRepeat
    })
  })

  // 提交注册信息
  app.post('/reg',checkNotLogin);
  app.post('/reg', function (req, res) {
    var bool = req.body.username == '' || req.body.password == '' || req.body.passwordRepeat == '';
    var url = `/reg?username=${req.body.username}&password=${req.body.password}&passwordRepeat=${req.body.passwordRepeat}`
    if (bool) {
      req.flash('error', '内容不能为空');
      return res.redirect(url)
    }
    if (req.body.passwordRepeat != req.body.password) {
      req.flash('error', '两次输入的口令不一致');
      return res.redirect(url)
    }

    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
      name: req.body.username,
      password: password
    })

    // 检查用户名是否已经存在
    User.get(newUser.name, function (err, user) {
      if (user) {
        err = 'Username already exists.';
      }
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');
      }

      newUser.save(function (err) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/reg')
        }
        req.session.user = newUser;
        req.flash('success', '注册成功')
        res.redirect('/');
      })
    })

  })

  // 匹配登录页面
  app.get('/login',checkNotLogin);
  app.get('/login', function (req, res) {
    res.render('login', {
      title: '用户登录'
    })
  })

  // 提交登录信息
  app.post('/login',checkNotLogin);
  app.post('/login', function (req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    
    User.get(req.body.username,function(err,user){
      if(!user){
        req.flash('error','用户不存在');
        return res.redirect('/login');
      }
      if(password != user.password){
        req.flash('error','用户口令输入错误');
        return res.redirect('/login');
      }
      req.session.user = user;
      req.flash('success','登入成功');
      res.redirect('/');
    })
  })

  // 退出登录
  app.get('/logout',checkLogin);
  app.get('/logout', function (req, res) {
    req.session.user = null;
    req.flash('登出成功');
    res.redirect('/');
  })
}