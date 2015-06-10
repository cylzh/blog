/**
 * Created by jade on 2015/6/2.
 */
/*
 * 基于node爬虫
 * */

var connect = require("connect");
var request = require("request");
var fs = require("fs");
var cheerio = require("cheerio");

var app = connect()
    .use(function (req, res, next) {
        //simple use  it supports HTTPS and follows redirects
        //request({url:xxxx,headers:{"User-Agent":"request"}})
        var url = "http://cpquery.sipo.gov.cn/txnQueryBibliographicData.do?select-key:shenqingh=2007101455555&select-key:zhuanlilx=1&select-key:backPage=&inner-flag:open-type=window&inner-flag:flowno=1433492573319"
        request(url, function (err, resr, body) {
            /* fs.writeFile("res.txt",JSON.stringify(resr),function(){
             res.end(body);
             })*/

            /*
             *res.statusCode
             *res.body
             *res.headers
             * */
            if (!err && resr.statusCode == 200) {
                var $ = cheerio.load(body);

                var anjianywzt = $("[name$=anjianywzt]");
                var zhuanlimc = $('[name$=zhuanlimc]');
                var shenqingr = $('[name$=shenqingr]');
                var zt = "案件状态:"
                var mc = "专利名称:";
                var r = "申请日";


                var b2 = "";
                var span = $("span");
                var idspan = span.last();
                var str = idspan.attr("id");

                var b = 0;
                for (var i = 0; i < str.length; i = i + 2) {
                    if (b > 255) {
                        b = 0;
                    }
                    var b1 = parseInt(str.substring(i, i + 2), 16) ^ b++
                    b2 += String.fromCharCode(b1);
                }

                b2.split(",").forEach(function (item) {
                    var id = "[id=" + item + "]";
                    zt += anjianywzt.find(id).text();
                    mc += zhuanlimc.find(id).text();
                    r += shenqingr.find(id).text();
                });

                res.writeHead(200, {
                    "Content-Type": "text/html;charset=utf-8"
                })
                res.write(zt +"\n\r"+ mc + "\n\r" + r +"\r");
                res.end()
                return;
            }

            res.end("请求出错!");
        })
    })
    .listen(3003);

