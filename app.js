/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var movie = require('./routes/movie.js');
var http = require('http');
var path = require('path');
var MongoStore = require("connect-mongo")(express);
var flash = require("connect-flash");
var render = require("./middleware/render.js");
var setting = require("./setting.js");
var mulipart = require("connect-multiparty");
var static = require("connect-static");
//express中使用swig模板
var cons = require("consolidate");
var fs = require("fs");
var app = express();


// all environments
//设置端口
//window 下可以通过set PORT=xxx 来设置环境变量
app.set('port', process.env.PORT || 3000);

//设置view文件夹存放目录 __dirname表示当前脚本正在执行的目录
app.set('views', path.join(__dirname, 'views'));

//设置模板
app.engine('.html', cons.swig);
app.set('view engine', 'html');

app.use(flash());

//设置网站icon
app.use(express.favicon(path.join(__dirname, "public/images/favicon.ico")));

//设置log
app.use(express.logger('dev'));

//解析请求体
app.use(express.json());
app.use(express.urlencoded());
app.use(mulipart({uploadDir: "./public/upload"}));

//协助处理post请求，PUT,DELETE,其他http方法
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({
    secret: "myBlog",
    key: "nodejs",
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
    store: new MongoStore({
        db: "nodejs"
    })
}));

//静态文件目录
app.use(express.static(path.join(__dirname, 'public')));


//前置拦截器
app.use(function (req, res, next) {
    var user = req.session.user;
    var path = req.path;
    if (!user && (path !== "/login" && path !== "/reg")) {
        return res.redirect("/login");
    }
    next();
})

app.use(render());


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


//路由控制
routes(app);
movie(app);


//404错误页
app.use(function (req, res, next) {
    res.render("404");
})

//创建node服务器
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
