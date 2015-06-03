/**
 * Created by jade on 2015/6/3.
 */

/*
 * 进程
 *
 * */

/*

 var connect = require("connect");
 var fs = require("fs");

 connect()
 .use(function () {
 console.log(process.pid);//进程id
 console.log(process.env);
 console.log(process.version);//版本号
 console.log(process.platform);//操作系统
 var args = process.argv.slice(2);
 console.log(args);//结果["node",path,argv0,argv1]

 //stdout 等同于stdout
 process.stdout.write("1");

 //fs.createReadStream("res.txt").pipe(process.stdout);

 process.stdin.pipe(process.stdout);

 })
 .listen(3004)*/

process.stdout.write("进程启动");

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function () {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        process.stdout.write('data: ' + chunk);
    }
});

process.stdin.on('end', function () {
    process.stdout.write('end');
});


