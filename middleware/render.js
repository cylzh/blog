/**
 * Created by jade on 2015/5/26.
 */
module.exports = function () {

    return function (req, res, next) {

        var _render = res.render;

        res.render = function (view, options, callback) {
            options = options || {};

            var user = req.session.user;
            options.user = user;
            var success = req.flash("success").toString();
            var error = req.flash("error").toString();
            options.success = success;
            options.error = error;
            _render.call(res, view, options, callback);
        }

        next();
    }

}