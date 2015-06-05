/*
 * GET home page.
 */
var Movie = require("../models/Movie.js");
var User = require("../models/User.js");
var markdown = require("markdown").markdown;

module.exports = function (app) {

    //首页
    app.get("/", function (req, res, next) {
        Movie.find({}, function (err, movies) {
            if (!err) {
                movies.forEach(function (movie) {
                    movie.content = markdown.toHTML(movie.content);
                })

                res.render("index", {
                    title: "首页",
                    movies: movies
                });
            }
        });
    });

    //登陆
    app.get("/login", function (req, res) {
        if (req.session.user) {
            return res.redirect("/");
        }

        res.render("login", {
            title: "登陆"
        })

    });

    app.post("/login", function (req, res) {
        var json = req.body;
        User.login(json, function (rs, msg) {
            if (rs) {
                req.session.user = json;
                req.flash("success", msg);
                res.redirect("/")
            } else {
                req.flash("error", msg);
                res.redirect("/login");
            }
        })
    });

    //注销
    app.get("/logout", function (req, res) {
        req.session.user = null;
        return res.redirect("/");
    });

    //注册
    app.get("/reg", function (req, res) {
        res.render("reg", {
            title: "注册"
        });
    });

    app.post("/reg", function (req, res) {
        var json = req.body;

        User.find(json.name, function (err, obj) {
            if (err) {
                req.flash("异常");
                return res.redirect("/reg");
            }

            //如果用户存在，则跳转
            if (obj.length > 0) {
                req.flash("error", "用户已存在");
                return res.redirect("/reg");
            }

            //否则保存
            User.save(json, function (err) {
                if (err) {
                    req.flash("error", "异常");
                    return res.redirect("/reg");
                }

                req.flash("success", "注册成功");
                req.session.user = json;
                return res.redirect("/");
            })
        })
    })
}
