/**
 * Created by jade on 2015/6/9.
 */
var crypto = require("crypto");

/*
 *加密过程
 * createHash(type) 'sha1'、'md5'、'sha256'、'sha512'
 * update(content)
 * digest(type) type:'hex'、'binary'或者'base64'
 *
 * */
var content = "password";
var md5 = crypto.createHash("md5");
md5.update(content);
var d = md5.digest("hex");
console.log(d);

var sha1 = crypto.createHash("sha1");
sha1.update(content);
var sha = sha1.digest("hex");
console.log(sha);