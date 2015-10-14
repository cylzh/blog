/**
 * Created by jade on 15/6/14.
 */

var http = require("http");

http.createServer(function (req, res) {
    //cookie解析
    req.cookies = parserCookies(req.headers.cookie);

    //session 解析
    var id = req.cookies[key];
    if (!id) {
        req.session = generate();
    } else {
        var session = sessions[id];
        if (session) {
            req.session = session;
        } else {
            req.session = generate();
        }
    }

    handle(req, res);
}).listen(3001)

function parserCookies(cookie) {
    var cookies = {};
    if (!cookie) return cookies;

    var list = cookie.split(";");
    for (var i = 0; i < list.length; i++) {
        var pair = list[i].split("=");
        cookies[pair[0].trim()] = pair[1];
    }

    return cookies;
}

function serialize(key, value) {
    return key + "=" + value + ";path=/;Max-Age=60*60*1000;"
}

var sessions = {};
var key = "session_id";

//生成session
var generate = function () {
    var session = {};
    session.id = new Date().getTime() + Math.random();
    sessions[session.id] = session;
    return session;
}


//function session(req, res) {
//    req.sessions = sessions;
//}

/*function handle(req, res) {
 res.setHeader("Content-Type", "text/html;charset=utf-8;");
 if (req.cookies.isVisit) {
 res.end("欢迎再次访问");
 } else {
 res.setHeader("Set-Cookie", "isVisit=true;path=/;Max-Age=60*60*1000;");
 res.writeHead(200);
 res.end("欢迎访问");
 }
 }*/


function handle(req, res) {
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    if (req.session.isVisit) {
        res.end("欢迎再次访问");
    } else {
        req.session.isVisit = true;
        res.setHeader("Set-Cookie", serialize(key, req.session.id));
        res.end("欢迎访问")
    }
}

