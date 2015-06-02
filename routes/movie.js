/**
 * Created by jade on 2015/5/26.
 */

var Movie = require("../models/Movie.js");
var fs = require("fs");
module.exports = function (app) {

    //search
    app.post("/movie/search", function (req, res) {
        var name = req.param("name");
        var reg = new RegExp(name);
        Movie.find({name: reg}, function (err, obj) {
            if (!err) {
                res.render("movie", {
                    movies: obj
                });
            }
        })
    });

    /*add*/
    app.get("/movie/add", function (req, res) {
        res.render("moviedetial", {
            title: "新增"
        })
    });

    app.post("/movie/add", function (req, res) {
        var movie = req.body;
        var files = req.files;


        /*可以不上传图片*/
        if (files.file.size > 0) {
            var target = "/upload/movie/" + files.file.name;
            fs.renameSync(files.file.path, "./public" + target);
            movie.image = target;
        } else {
            fs.unlinkSync(files.file.path);
        }

        if (movie.id) {
            Movie.findOneAndUpdate(movie, function (err, obj) {
                if (err) {
                    return res.redirect("/movie/" + movie.id);
                }
                return res.redirect("/");
            })
        } else {
            Movie.save(movie, function (err) {
                if (err) {
                    res.redirect("/movie/add");
                }
                res.redirect("/")
            });
        }

    });

    //update
    app.get("/movie/add/:id", function (req, res) {
        var id = req.params.id;
        Movie.findById(id, function (err, obj) {
            if (err) {
                res.send("错误的movie id");
            }

            res.render("moviedetial", {
                title: "修改",
                movie: obj
            })
        })
    })

    //del
    app.get("/movie/del/:id", function (req, res) {
        var id = req.param("id");
        Movie.del(id, function (err) {
            if (err) {
                res.send("删除失败");
            }
            return res.redirect("/")
        })
    });

    app.post("/upload",function(req,res){
        /*可以不上传图片*/
        if (files.file.size > 0) {
            var target = "/upload/movie/" + files.file.name;
            fs.renameSync(files.file.path, "./public" + target);
            movie.image = target;
        } else {
            fs.unlinkSync(files.file.path);
        }
    })
}