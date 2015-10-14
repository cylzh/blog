/**
 * Created by jade on 2015/6/3.
 *
 * 客户端缓存
 *
 * Last-Modified : fs.stat(path,function(err,stats){ stats.mtime.toUTCString() })
 *
 * If-Modified-Since==lastModifiedTime   res.writeHead(304);
 *
 * Exprise
 *
 * cache-control max-age
 *
 * 注：时间要转换成GTM(toUTCString())
 *
 */

/*
 * 静态文件服务器
 * */
var connect = require("connect");
var fs = require("fs");
var url = require("url");
var path = require("path");
var swig = require("swig");

//node中使用swig
var tpl = swig.compileFile("../../views/staticserver.html");

//媒体资源
var mimetype = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css"
}

var app = connect()
    .use(function (req, res) {
        var urlObj = url.parse(req.url);
        var pathname = path.join(__dirname, urlObj.pathname);

        fs.stat(pathname, function (err, stats) {
            if (err) {
                return res.end(tpl({error: "文件不存在"}))
            }

            //如果是文件则返回对应的文件
            if (stats.isFile()) {
                //获取当前文件的mimetype
                var lastmtime = stats.mtime.toUTCString();
                var thismimeType = mimetype[path.extname(pathname)] || "text/html";
                if (lastmtime == req.headers["if-modified-since"]) {
                    res.writeHead(304, {
                        'Content-Type': thismimeType
                    });
                    return res.end();
                }
                fs.readFile(pathname, "utf8", function (err, data) {
                    if (!err) {
                        //res.writeHead(statusCode,[],[headers]);
                        //只能搞一次

                        var exprise = new Date();
                        exprise.setTime(exprise.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);
                        res.setHeader("Exprise", exprise.toUTCString());
                        res.writeHead(200, {
                            'Content-Type': thismimeType,
                            'Last-Modified': lastmtime,
                            "Cache-Control": "max-age=10*365*24*60*60*1000"
                        });

                        res.end(data);
                        return;
                    }
                })
                return;
            }

            //如果是文件夹则返回文件夹内部的文件及文件夹
            fs.readdir(pathname, function (err, files) {
                if (err) {
                    return res.end(tpl({error: "出错了"}));
                }
                return res.end(tpl({"files": files}));
            })
        })
    })
    .listen(3005);