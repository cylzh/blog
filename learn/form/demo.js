/**
 * Created by jade on 2015/6/16.
 */
var connect = require("connect");
var http = require("http");
var swig = require("swig");
var url = require("url");
var fs = require("fs");

var tpl = swig.compileFile("./form.html");
var app = connect();

app.use(function (req, res, next) {
    var pathname = url.parse(req.url).pathname;

    if (pathname == "/") {
        return res.end(tpl());
    }
    if (pathname == "/upload") {
        var chunks = [];
        var size = 0;

        req.on("data", function (chunk) {
            chunks.push(chunk);
            size += chunk.length;
        });

        req.on("end", function () {

            var buffer = Buffer.concat(chunks, size);

            var rems = [];

            for (var i = 0; i < buffer.length; i++) {
                var v = buffer[i];
                var v2 = buffer[i + 1];

                if (v == 13 && v2 == 10) {
                    rems.push(i);
                }
            }

            var picmsg_1 = buffer.slice(rems[0]+2,rems[1]).toString();
            var filename = picmsg_1.match(/filename=".*"/g)[0].split('"')[1];

            //Í¼Æ¬Êý¾Ý
            var nbuf = buffer.slice(rems[3]+2,rems[rems.length-2]);

            console.log(picmsg_1);
            console.log(filename)
        })

        //todo
        return;
    }
    next();
})

app.use(function () {
    console.log("not found");
})


http.createServer(app).listen(3005);