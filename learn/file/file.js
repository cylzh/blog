/**
 * Created by jade on 2015/5/29.
 */
/*
 * node 文件操作
 * */

var fs = require("fs");
var path = require("path");
var request = require("request");

/*flags为：（制定了操作文件的一些方式）
 'r' - 以只读方式打开文件，当文件不存在的时候发生异常
 'r+' - 以读写方式打开文件，当文件不存在的时候发生异常
 'rs' - 以只读方式同步打开文件，绕过本地缓存文件进行系统操作
 'rs+' - 以读写方式同步打开文件 ，绕过本地缓存文件进行系统操作
 'w' - 以只写方式打开文件，当文件不存在时创建文件，或者存在的时候覆盖文件
 'wx' - 与'w'一致，但只适用于文件不存在的时候( 测试的时候,，node版本为v0.10.26，如果文件不存在则正常创建文件并且写入数据，但是当文件不存在的时候，报错为必须要写上callback，加上callback后不报错但是不执行任何操作。 )
 'w+' - 以读写方式打开文件
 'ws+' - 与'w+'一致，但只适用于文件不存在的时候
 'a' - 以添加数据的方式打开文件，文件不存在则创建
 'a+' - 以添加和读取的方式打开文件，文件不存在则创建
 'ax+' - 与'a+'一致，但是存在的时候会失败
 */

//读文件
/*
 * fs.readFile(filepath,[options],callback)
 * filepath:文件路径
 * [options] {encoding:"utf-8"}//注意：如果未设置encoding 则callback中的data为buffer。
 * callback(err,data)
 *
 * */
fs.readFile("./test2.txt", {encoding: "utf-8"}, function (err, data) {
    console.log(data);
});

//写文件
/*
 * fs.writeFile(filepath,data,[options],callback)
 *  filepath:
 *  data:需要写入的数据
 *   [options]:
 *       encoding {String | Null} default = 'utf8'
 mode {Number} default = 438 (aka 0666 in Octal)
 flag {String} default = 'w'
 *  calback(err)
 *
 * */
fs.writeFile("./test1.txt", fs.readFileSync("./test2.txt"), {flag: "a+"}, function (err) {
    console.log(err);
});

//创建目录
fs.mkdir(__dirname + "/test", function (err) {

});

//读目录
fs.readdir("../file", function (err, files) {

    /* files.forEach(function(file){

     })*/

    fs.stat("file.js", function (err, stats) {
        console.log(stats.isFile());

    })
})

//读取文件属性
/*
 文件方法
 stats.isFile()//是否是文件
 stats.isDirectory()
 stats.isBlockDevice()
 stats.isCharacterDevice()
 stats.isSymbolicLink() (仅在与 fs.lstat()一起使用时合法)
 stats.isFIFO()
 stats.isSocket()
 *
 *
 *
 * 文件属性
 *
 * dev: 2049,
 ino: 305352,
 mode: 16877,
 nlink: 12,
 uid: 1000,
 gid: 1000,
 rdev: 0,
 size: 4096,
 blksize: 4096,
 blocks: 8,
 atime: '2009-06-29T11:11:55Z',
 mtime: '2009-06-29T11:11:40Z',
 ctime: '2009-06-29T11:11:40Z' *


 *
 *
 */
/*
 * stats：fs.stat的一个实例
 * */
//fs.stat(path,function(err,stats){})

//移动文件
/*
 * fs.rename(old,new,callback)
 *
 * */
/*fs.rename("./test1.txt","./test/test.txt",function(err){

 })*/


//删除文件夹
fs.rmdir("./test1", function (err) {

})


//监听文件
/*
 *fs.watch(filename,[options],callback)
 *
 *callback(curr,prev);
 * curr,prev都为fs.stat的对象实例
 *
 * */
fs.watch("./file.js", function (curr, prev) {
    console.log(curr);
    console.log(prev)
})

/*
 * fs.unwatch(filename,callback(curr,prev));
 * */


//stream

var music="http://music.baidu.com/data/music/file?link=http://yinyueshiting.baidu.com/data2/music/239130183/12267411954000128.mp3?xcode=e3622df90ac74ddb9824035d6041d0a0&song_id=122674119";
request(music).pipe(fs.createWriteStream("喜欢你.mp3"));





