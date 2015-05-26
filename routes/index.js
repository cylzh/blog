/*
 * GET home page.
 */
var Movie = require("../models/Movie.js");
var User = require("../models/User.js");
module.exports = function (app) {

    //首页
    app.get("/", function (req, res) {
        res.render("index", {
            title: "首页",
            success: req.flash("success").toString()
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
        User.validate(json, function (err, obj) {
            if (!err) {
                if (obj[0].password == json.password) {
                    req.session.user = json;
                    req.flash("success","登陆成功");
                    return res.redirect("/");
                } else {
                   req.flash("error","用户或密码错误");
                   return res.redirect("/login");
                }
            } else {
                res.send("登陆异常");
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
            title: "注册",
            error: req.flash("error").toString(),
            success: req.flash("success").toString()
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
