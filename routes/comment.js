/**
 * Created by jade on 2015/6/8.
 */
var Comment = require("../models/Comment.js");

module.exports = function (app) {

    //获取评论
    app.get("/comment/:id", function (req, res) {
        var movieid = req.param("id");
        Comment.find({movieid: movieid}, function (err, obj, count) {
            res.render("comment", {
                commentlist: obj,
                count: count
            })
        })
    });

    app.post("/comment/add", function (req, res) {
        var body = req.body;

        var comment = {
            connect: body.connect,
            user: req.session.user,
            movieid: body.movieid
        };

        Comment.add(comment, function (err) {
            if (err) {
                req.flash("error", "评论异常");
            }
            return res.redirect("/movie/detial/" + body.movieid);
        })
    })

}
