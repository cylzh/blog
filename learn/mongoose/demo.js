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
var db = mongoose.createConnection("mongodb://localhost:27017/nodejs");

//连接异常
db.on("error", function (error) {
    console.log(error);
})


//Schema结构
var testSchema = new mongoose.Schema({
    username: String,
    password: String,
    Date: {type: Date, default: Date.now()}
});

//model
var TestModel = db.model("test", testSchema);

//增加记录 基于entity（基于实体操作）
/*var doc = {username: "test", password: "123456"};
 var testModel = new TestModel(doc);
 testModel.save(function (err) {
 if (err) {
 console.log(err);
 } else {
 console.log("save ok");
 }
 });*/


//增加记录 基于Model操作
/*var doc = {username: "test", password: "123456"};
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
TestModel.find({username: "test"}, function (err, result) {
    if (err) {
        console.log(err);
    } else {
        result.forEach(function (item) {
            console.log("id:" + item.id);
            console.log("_id:" + item._id);

        })
        /*  fs.writeFile("./test.txt", result, function (err) {

         });*/
    }
});

/*
 * 查询
 *
 * find(criteria, fields, options,callback)
 * criteria查询条件
 * fields输出字段
 * options
 * */
TestModel.find({}, "username password", {skip: 2, limit: 100, sort: {Date: -1}}, function (err, result) {
    fs.writeFile("./test1.txt", result, function (err) {

    });
});

//删除
TestModel.remove({username:"test"},function(err){

});




