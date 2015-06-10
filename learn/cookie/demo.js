/**
 * Created by jade on 2015/6/10.
 */
/*
 * 这里是cookie知识
 * cookie是http协议的一部分
 * 它的处理分为两部分
 *  服务端向客户端发送cookie
 *  客户端将cookie发向服务端
 *
 *  cookie的可选参数会影响cookie发送给服务端的过程
 *
 *  1.path
 *  2.exprise(utc时间) max-age(相对时间) 如果没设置，则浏览器关闭时cookie清除
 *  3.secure https有效
 *  4.httpOnly（不能通过document.cookie来修改cookie）
 *
 *
 *  node中cookie使用
 *  设置cookie "key=value;path=/;Max-Age=time;HttpOnly",如果设置多个[cookie1,cookie2]
 *  cookie 解析 cookie-parser
 *
 *  cookie弊端，由于cookie是存储在客户端的，数据容易被修改，cookie字段太多影响传输效率，为了解决这些问题产生了session
 *
 *  session运作
 *
 *  客户端存储session_id,真正的数据存储在服务端
 *
 *  node中使用session
 *  connect.session({
 *      key //session_id
 *      store//存储位置 1.内存。2数据库 3.redis
 *      secret//加密字符串,
 *      cookie//设置session_id的相关选项
 *  })
 *
 * redis的使用
 *
 * 带续。。。
 *
 * */

var connect = require("connect");
connect()
    .use(connect.cookieParser())
    .use(connect.session({
        key: "testsession",
        secret: "test",
        cookie: {
            maxAge: 60 * 1000
        }
    }))
    .use(function (req, res) {
        res.setHeader("content-type", "text/html;charset=utf-8");
        /*if (req.cookies.isVisit) {
         res.end("欢迎再次访问")
         } else {
         console.log(res.cookie);
         res.setHeader("Set-Cookie", "isVisit=1;path=/;Max-Age=60*1000;HTTPOnly");
         res.end("欢迎访问");
         }*/

        if (req.session.isVisit) {
            res.end("欢迎再次访问");
        } else {
            req.session.isVisit = 1;
            res.end("欢迎访问");
        }

    })
    .listen(3002, function () {
        console.log("server start on port 3002")
    });