/**
 * Created by jade on 2015/5/25.
 */
var mongodb = require("./db.js");

//表
var Schema = mongodb.mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    password: String,
    createDate: {type: Date, default: Date.now()}
});

//初始化表
var User = mongodb.mongoose.model("User", UserSchema);

var UserDto = function () {
}

UserDto.prototype.save = function (obj, callback) {
    var user = new User(obj);
    user.save(function (err) {
        callback(err);
    })

}

UserDto.prototype.validate = function (obj, callback) {
    this.find(obj.name, function (err, obj1) {
        callback(err, obj1)
    })
}

UserDto.prototype.find = function (name, callback) {
    User.find({name: name}, function (err, obj) {
        callback(err, obj);
    })
}

module.exports = new UserDto();