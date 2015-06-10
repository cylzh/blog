/**
 * Created by jade on 2015/5/25.
 */

/*
 * http://blog.fens.me/nodejs-mongoose-json/
 * http://blog.fens.me/nodejs-mongodb-regexp/
 * http://blog.fens.me/nodejs-bootstrap-paginator/
 * http://www.cnblogs.com/hoojo/archive/2011/06/01/2066426.html
 * */
var mongodb = require('./db');

var Schema = mongodb.mongoose.Schema;

//定义模型
var MovieSchema = new Schema({
    name: String,
    content: String,
    user: {type: Object, default: null},
    image: {type: String, default: "/upload/movie/1副本.jpg"},
    date: {type: Date, default: Date.now()}
});

//访问模型
var Movie = mongodb.mongoose.model("Movie", MovieSchema);


var MovieDAO = function () {
};

MovieDAO.prototype.save = function (obj, callback) {
    var movie = new Movie(obj);
    movie.save(function (err) {
        callback(err);
    })
};

MovieDAO.prototype.find = function (name, callback) {
    Movie.find(name, function (err, obj) {
        callback(err, obj);
    })
}

MovieDAO.prototype.findById = function (id, callback) {
    Movie.findById(id, function (err, obj) {
        callback(err, obj);
    })
};


MovieDAO.prototype.findOneAndUpdate = function (obj, callback) {
    Movie.findByIdAndUpdate(obj.id, obj, function (err, obj) {
        callback(err, obj)
    })
}

MovieDAO.prototype.del = function (id, callback) {
    Movie.findByIdAndRemove(id, function (err) {
        callback(err);
    })
}

MovieDAO.prototype.findPageResult = function (obj, callback) {

    var pageNumber = obj.pageNumber || 1;
    var pageSize = obj.pageSize || 10;
    var skipNumber = pageNumber * pageSize - pageSize;

    var query = Movie.find(obj.q).sort("-date").skip(skipNumber).limit(pageSize);

    query.exec(function (err, result) {
        if (!err) {
            Movie.count(function (err, count) {
                var pageCount = Math.ceil(count / pageSize);
                callback(null, pageCount, result)
            });
        }
    });
}


module.exports = new MovieDAO();

/*
 * mongodb
 *
 * var mongoose=require("mongoose");
 * //链接
 * mongoose.connect("mongod://localhost/nodejs");
 *
 * //定义表
 * var schema=new mongoose.Schema({
 *
 * })
 *
 * //访问模型
 * var Movie=mongoose.model("movie",schema);
 *
 * //操作 新增
 * var movie=new Movie();
 * movie.save()
 *
 * Movie.find(xxx)
 *
 * //分页 *
 * Movie.find().sort().limit().skip()
 *
 *
 *
 *
 * */

