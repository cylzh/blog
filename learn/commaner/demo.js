/**
 * Created by jade on 2015/6/11.
 */
var program = require("commander");

program.version("0.0.1")
    .option("-c,--create", "create file")
    .option("-d,--delete", "delete file");

program.command("my <file>").description("我的文件").action(function(name){
    console.log(' "%s"', name);
});

program.parse(process.argv);

if (program.create){
    console.log("--create")
}

if (program.delete) {
    console.log("--delete")
}