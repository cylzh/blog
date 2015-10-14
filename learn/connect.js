/**
 * Created by jade on 2015/5/28.
 */
/*
 * node中间件学习
 *
 * */
var connect = require("connect");

var app = connect().
    use(connect.logger()).
    //use(connect.favicon(__dirname + "/public/images/favicon.ico")).

    use(connect.json()).
    use(connect.urlencoded())
   // use(connect.multipart({ uploadDir: __dirname + "/public/upload" }))

    .use(connect.cookieParser())

    //基于cookieSession的会话，基于session的会话
    .use(connect.cookieSession({
        secret: '123',
        cookie: {maxAge: 1000 * 60 * 60 * 24}
    }))

    //.use(connect.directory(__dirname + "/public"))

    .use("/",function (req, res, next) {
        console.log(11);
        next();
    })
    .use("/test",function (req, res, next) {
        console.log(2);
    })

    /*   use("/public",connect.static(__dirname + "/public")).

     use("/",function(req,res,next){
     res.end("222");
     }).
     use("/test",function(req,res,next){
     res.end("111");
     })

     */


    /*  use(function (req, res, next) {
     req.cookies.website = "test";
     if (req.session.pv) {
     res.write('views: ' + req.session.pv);
     req.session.pv++;
     res.end();
     } else {
     req.session.pv = 1;
     res.end(req.session.pv.toString());
     }
     })*/

    .listen(3002);
