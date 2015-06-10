/*
 * GET users listing.
 */

var User = require("../models/User.js");
var fs = require("fs");

module.exports = function (app) {

    app.get("/user", function (req, res) {
        var user = req.session.user;
        User.find(user.name, function (err, obj) {
            if (!err) {
                return res.render("user/info", {
                    title: "用户信息",
                    user: obj
                })
            }
            req.flash("error", "异常");
            return;
        })
    });

    //头像上传
    app.post("/user/upload", function (req, res) {
        var logo = req.files.logo;
        var user = req.session.user;
        if (logo.size > 0) {
            var target = "/upload/user/" + logo.name;
            fs.rename(logo.path, "./public" + target, function (err) {
                if (err) {
                    req.flash("error", "上传失败");
                    return;
                }
                user.logo = target;
                User.findOneAndUpdata(user, function (err, obj) {
                    if(!err){
                        res.write("<script>parent.review(\"" + target + "\")</script>")
                        return res.end();
                    }
                    req.flash("error","用户保存失败");

                });
            });
        }
    })

    app.post("/user", function (req, res) {

    })
}