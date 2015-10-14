/**
 * Created by jade on 15/6/14.
 */


var connect = require("connect");
var url = require("url");

var swig = require("swig");
var tpl = swig.compileFile("./upload.html");

var app = connect();

app.use(function (req, res, next) {
    var path = url.parse(req.url).pathname;
    var method = req.method.toLowerCase();
    app.routers[method][path](req, res);
})


app.use(function (req, res, next) {
    console.log(2);
})

app.routers = {
    get: {},
    post: {},
    put: {},
    delete: {}

};

app.get = function (router, callback) {
    app.routers.get[router] = callback;
};

app.post = function (router, callback) {
    app.routers.post[router] = callback;
}

app.get("/", function (req, res) {
    res.end(tpl());
});

app.get("/test", function (req, res) {
    res.end(tpl({title: "test"}))
})


//如何判断请求中是否携带内容 看请求头里面transfer-encoding或者content-length
function hasBody(req) {
    return "transfer-encoding" in req.headers || "content-length" in req.headers
}

app.listen(3003);