/**
 * Created by jade on 2015/6/10.
 */
/*
 * http://mongoosejs.com/docs/api.html#model_Model.update
 * node下mongoose的使用 *
 *
 * todo异步事件改写成同步
 *
 * */

var mongoose = require("mongoose");
var fs = require("fs");
//连接mongodb
var db = mongoose.connect("mongodb://localhost/nodejs");

//连接异常
/*db.on("error", function (error) {
 console.log(error);
 })*/


//Schema结构
var testSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String, match: [/.{7,}/, "密码格式不正确"], maxlength: 9},
    Date: {type: Date, default: Date.now()}
});

//model
var TestModel = db.model("test", testSchema);

//增加记录 基于entity（基于实体操作）
var doc = {username: " test  ", password: "12345611"};

//Document
//var testModel = new TestModel(doc);


TestModel.findById("5578ebe763993b083c1b93d6", function (err, user) {

    console.log(user);
    user.username = "test1";
    user.save(function(){

    })
});


/*
 testModel.validate(function (err) {
 if (err) {
 console.log(err);
 } else {
 testModel.save(function (err) {
 if (err) {
 console.log(String(err));
 } else {
 console.log("save ok");
 }
 });
 }
 })
 */


//增加记录 基于Model操作

 /*var doc = {username: "test", password: "1234516"};
 TestModel.create(doc, function (err) {
 if (err) {
 console.log(err);
 } else {
 console.log("save ok");
 }
 });*/


//修改记录
/*
 TestModel.update({username: "test"}, {username: "test1"}, function (err) {
 if (err) {
 console.log(err);
 } else {
 console.log("save ok");
 }
 //db.close();
 })
 */

//查询
/*
 TestModel.find({username: "test"}, function (err, result) {
 if (err) {
 console.log(err);
 } else {
 fs.writeFile("./test.txt", result, function (err) {

 });
 }
 });
 */

/*
 * 查询
 *
 * find(criteria, fields, options,callback)
 * criteria查询条件
 * fields输出字段 为null则表示输入全部，如果要输出相应字段可以设置 "name date"
 * options
 * */
/*TestModel.find({}, null, {skip: 2, limit: 100, sort: {Date: -1}}, function (err, result) {
 fs.writeFile("./test1.txt", result, function (err) {

 });
 });*/
/*
 *
 * 等同于下面的 (链式查询)
 * TestModel.find({}).skip().limit().sort();
 * */

//删除
/*TestModel.remove({username: "test"}, function (err) {

 });*/


/*
 *
 * */




