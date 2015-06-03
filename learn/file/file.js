/**
 * Created by jade on 2015/5/29.
 */
/*
 * node 文件操作
 * */

var fs = require("fs");
var path = require("path");



//读取文件
fs.readFile("test.txt", {encoding: "utf-8"}, function (err, data) {

    if (err) {
        console.log("出错了")
    }
    console.log(data);
});

//文件状态
fs.stat("test.txt", function (err, stats) {
    if (!err) {
        console.log(stats.isFile());
    }
})

//判断一个文件是否存在
fs.exists("test.txt",function(exists){

})

//读文件夹
fs.readdir("../public", function (err, files) {
    console.log(files);
});

//写文件 若文件不存在则创建
fs.writeFile("test1.txt", "文件不存在则创建", function (err) {

});

fs.writeFile("test1.txt", "\n这里是添加的内容", {flag: 'a'}, function (err) {

})

//删除
fs.unlink("test.txt", function (err) {
});


/*path模块*/
/*转换成标准路径*/
var cache = {};
function store(key, value) {
    cache[path.normalize(key)] = value;
}

store('foo/bar', 1);
store("foo//bar/../bar", 2);
console.log(cache);

/*路径拼接*/
console.log(path.join("foo/", "bra/", "/bra"));

/*后缀名*/
console.log(path.extname("foo/bra.js"));