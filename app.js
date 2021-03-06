﻿var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var log4 = require('log4js');
var routers = require('./routers/index.js');

var app = express();
log4.configure({
    appenders:[{
        type: 'console'
    }, {
        type: 'file',
        filename: 'logs/access.log',
        maxLogSize: 1024,
        backups: 100,
        category: 'cheese'
    }],
    replaceConsole: true
});

app.use(log4.connectLogger(log4.getLogger("cheese"), {level: log4.levels.INFO}));

//app.set('view engine', 'jade');
//app.set('views', path.join(__dirname, 'views'));

//设置文件静态路径
app.use(express.static('views'))
app.use(express.static(path.join(__dirname, 'static')));
//输出http状态码
app.use(logger('dev'));
//解析body传输的内容
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//路由

app.use('/api',routers);

//app.use('/api',apis);

//404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}*/

// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});*/

app.listen(process.env.PORT || 5000);
