var _ = require('lodash');
var passport = require('passport');
var error = require('jm-err');
var Err = error.Err;
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
            service.user.signup(data)
                .then(function (doc) {
                    res.json({
                        id: doc.id,
                        uid: doc.uid
                    });
                })
                .catch(function (err) {
                    console.log(err);
                    res.json(Err.FAIL);
                });
            ;
        });
};
