var express = require('express');
var path = require('path');
var session = require('express-session'); //如果要使用session，需要单独包含这个模块
var cookieParser = require('cookie-parser'); //session需要cookie-parser中间件
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var logger = require('morgan'); //在vim里打印开发环境日志
var favicon = require('serve-favicon');
var port = process.env.PORT || 8000;
var app = express();
var dbUrl = 'mongodb://127.0.0.1:27017/mean';
//var dbUrl = 'mongodb://cassie:09230827@ds053080.mongolab.com:53080/rms';
//var dbUrl = 'mongodb://4ftip62idt:koq83xf9b5@mongo.labs.taobao.net:27017/dtjr396c766hru403e40';
mongoose.connect(dbUrl);
app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(cookieParser());
//session中配置secret
app.use(session({
    secret: 'imooc',
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions',
        auto_reconnect:true
    })
}));

//判断线上环境和开发环境是否一致,打印数据库操作日志
if("development" === app.get("env")){
    app.set("showStackError",true);
    app.use(logger(":method :url :status"));
    app.locals.pretty = true;
    mongoose.set("debug",true);
}
require('./config/routes')(app);
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);
console.log('RMS started on port ' + port);







