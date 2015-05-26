/**
 * Created by jade on 2015/5/25.
 */
var mongodb = require('./db');
var Schema = mongodb.mongoose.Schema;

//实例化表
var MovieSchema = new Schema({
    name: String,
    content: String,
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
};


module.exports = new MovieDAO();

