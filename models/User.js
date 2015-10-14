/**
 * Created by jade on 2015/5/25.
 */
var mongodb = require("./db.js");

//表
var Schema = mongodb.mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    password: String,
    logo: {type: String, default: "/upload/user/user1.jpg"},
    createDate: {type: Date, default: Date.now()}
});

//初始化表
var User = mongodb.mongoose.model("User", UserSchema);

var UserDto = function () {
}

UserDto.prototype.save = function (obj, callback) {
    var user = new User(obj);
    user.save(function (err) {
        callback(err,user);
    })

}

UserDto.prototype.login = function (obj, callback) {
    this.find(obj.name, function (err, rs) {
        if (!err) {
            if (rs.length > 0 && rs[0].password == obj.password) {
                callback(true, rs[0])
            } else {
                callback(false, "用户名或密码错误");
            }
        } else {
            callback(false, "异常");
        }
    })
}

UserDto.prototype.find = function (name, callback) {
    User.find({name: name}, function (err, obj) {
        callback(err, obj);
    })
}

UserDto.prototype.findOneAndUpdata = function (obj, callback) {
    if (obj._id) {
        User.findByIdAndUpdate(obj._id, obj, function (err, obj) {
            callback(err, obj);
        })
        return;
    }
    callback("异常");
}

module.exports = new UserDto();