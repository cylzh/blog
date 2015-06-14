/**
 * Created by jade on 2015/6/8.
 */
var mongod = require("./db");

var Schema = mongod.mongoose.Schema;

var commectSchema = new Schema({
    connect: String,
    movieid: String,
    user: Object,
    date: {type: Date, default: Date.now()}
});

var CommectModel = mongod.mongoose.model("commect", commectSchema);

var CommectDao = function () {
}

CommectDao.prototype.add = function (obj, callback) {
    var commectModel = new CommectModel(obj);
    commectModel.save(function (err) {
        callback(err);
    })
}

CommectDao.prototype.find = function (query, callback) {
    var model = CommectModel.find(query).sort("-date");
    model.exec(function (err, obj) {
        model.count(function (err, count) {
            callback(err, obj, count)
        })
    })
};

module.exports = new CommectDao();
