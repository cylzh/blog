#!/usr/bin/env node
/**
 * Created by jade on 2015/6/11.
 */

/*

 * process.argv
 * process.stdout
 * process.stdin
 * process.exit
 *
 * */

function login() {
    process.stdout.setEncoding("utf8");
    process.stdout.write("password:");
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", function (chunk) {
        if (chunk != 123456) {
            //console.log(1)
            process.stdout.write("password:");
            return;
        }
        process.stdout.write("ok");
        process.exit();
    })
}

login()
