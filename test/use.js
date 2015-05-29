/**
 * Created by jade on 2015/5/29.
 */
/*
 * 模拟app.use的实现
 *
 * */

var http = require('http');

function express() {
    var funcs = [];

    var expr = function (req, res) {
        var i = 0;

        function next() {
            var task = funcs[i++];
            if (!task) return;
            task(req, res, next);
        }

        next();
    }

    expr.use = function (fn) {
        funcs.push(fn)
    }

    return expr;
}

var app = express();

app.use(function (req, res, next) {

    console.log(1)
    next();
})

app.use(function (req, res, next) {
    console.log(2)
    next();
})

app.use(function (req, res, next) {
    res.end("hello world");
});

http.createServer(app).listen('3003', function () {
    console.log('Express server listening on port 3000');
});