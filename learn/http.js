/**
 * Created by jade on 2015/5/29.
 */

/*
 * http模块
 *
 * */

var http = require("http");

var callbackList = [];

var listener = function (req, res) {
    var i = 0;

    function next() {
        var selffn = callbackList[i++];
        if (selffn && typeof selffn == "function") {
            selffn(req, res, next);
        }
    }

    next();
}

listener.use = function (fn) {
    callbackList.push(fn);
};

listener.use(function (req, res, listener) {
    console.log(1)
    listener(req, res, listener);
});

listener.use(function (req, res) {
    console.log(2);
    res.end();
});

function test() {
    console.log(2);
}
test();

var pv = 0;

function listener(req, res) {
    pv = 0;
    ++pv;
    res.end(pv.toString());
}


http.createServer(listener).listen(3000, function () {
    console.log("start");
})


