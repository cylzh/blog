#!/usr/bin/env node
/**
 * Created by jade on 2015/6/2.
 */

/*
 * 编写自己的node命令
 *
 *
 * */

/*
 var program = require("commander");

 program
 .version("0.0.1")
 .option('-p, --peppers', 'Add peppers')
 .option('-P, --pineapple', 'Add pineapple')
 .option('-b, --bbq', 'Add bbq sauce')
 .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
 .parse(process.argv);

 console.log('you ordered a pizza with:');
 if (program.peppers) console.log('  - peppers');
 if (program.pineapple) console.log('  - pineapple');
 if (program.bbq) console.log('  - bbq');
 console.log('  - %s cheese', program.cheese);
 */


/*
 * 编写自己的node命令
 *
 * */
var fs = require("fs");
var path = process.cwd();

fs.readdir(path, function (err, files) {
    if (err) {
        return console.log(err);
    }

    for (var file in files) {
        console.log(files[file]);
    }
})