var _ = require('lodash');
var passport = require('passport');
var error = require('jm-err');
module.exports = function (router) {
    var service = this;
    router.post('/login', passport.authenticate(['local'], {
            session: false
        }),
        function (req, res) {
            res.json(req.user || error.Err.FA_NOAUTH);
        });

    router.post('/register',
        function (req, res) {
            var data = {};
            _.defaults(data, req.body, req.query);
            service.user.signup(data, function (err, doc) {
                res.json(doc);
            })
        });
};
