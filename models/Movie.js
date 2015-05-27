/**
 * Created by jade on 2015/5/25.
 */
var mongodb = require('./db');
var Schema = mongodb.mongoose.Schema;

//实例化表
var MovieSchema = new Schema({
    name: String,
    content: String,
    image: {type: String, default: "/upload/movie/1副本.jpg"},
    data: {type: Date, default: Date.now()}
});
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


module.exports = new MovieDAO();

