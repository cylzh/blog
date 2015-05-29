/**
 * Created by jade on 2015/5/29.
 */
/*
* mysql
* */
var mysql = require("mysql");
var conn = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "1q2w3e$",
    database: "node",
    port:3306
})

conn.connect(function(err){
    if(err){

       console.log("connection err")
       return;
    }

    console.log("connection connect successed")
});
