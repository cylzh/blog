/**
 * Created by jade on 2015/6/2.
 */
/*
 * 基于node爬虫
 * */

var connect = require("connect");
var request = require("request");
var fs = require("fs");
var $ = require("cheerio");

var app = connect()
    .use(function (req, res, next) {
        //simple use  it supports HTTPS and follows redirects
        //request({url:xxxx,headers:{"User-Agent":"request"}})

        request("http://so.baiten.cn/results?q=2012&type=63", function (err, resr, body) {
            /* fs.writeFile("res.txt",JSON.stringify(resr),function(){
             res.end(body);
             })*/

            /*
            *res.statusCode
            *res.body
            *res.headers
            * */
            if (!err && resr.statusCode == 200) {
                var content = $(body);

                var rs = [];
                var ans = content.find(".srl-detail-an");
                ans.each(function (index, ele) {
                    rs.push($(this).text());
                })
                res.end(rs.join(";"));
                return;
            }

            res.end("请求出错!");

        })

        //streaming
        /*request("http://js.189.cn/activities/jsp/may_kd_act/image/Wiz%20Khalifa%20-%20See%20You%20Again.mp3").pipe(fs.createWriteStream("see you again.mp3"))
         res.end();*/

        //forms
        //application/x-www-form-urlencoded
        /*  request.post({url: "http://login.baiten.cn/Login/JsLogin", form: {lgName: "test", lgPassword: "111111"}}, function (err, resr, body) {
         res.end(body);
         })*/

        //multipart/form-data
        /* var myfile = {
         my_file: fs.createReadStream("see you again.mp3")
         }
         request.post({url: "http://localhost:3000/upload", formData: myfile}, function (err, resr, callback) {

         res.end();
         })*/
    })
    .listen(3003);

