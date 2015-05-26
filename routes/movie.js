/**
 * Created by jade on 2015/5/26.
 */

var Movie= require("../models/Movie.js");
module.exports = function (app) {

    app.get("/movie/detial", function () {

    });

    /*新增*/
    app.get("/movie/add", function (req, res) {
        res.render("moviedetial", {
            title: "新增"
        })
    });
    app.post("/movie/add", function (req, res) {
        var movie = req.body;
        Movie.save(movie,function(err){
            if(err){
                res.redirect("/movie/add");
            }
            res.redirect("/")
        });
    });

    //update
    app.post("/movie/:id", function () {

    });

    //del
    app.get("/movie/del/:id", function () {

    });

}