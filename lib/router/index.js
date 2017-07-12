var _ = require('lodash');
var passport = require('passport');
var error = require('jm-err');
var Err = error.Err;
module.exports = function (router) {
    var service = this;
    var t = function (doc, lng) {
        if(lng && doc.err && doc.msg) {
            doc.msg = service.user.t(doc.msg, lng) || Err.t(doc.msg, lng) || doc.msg;
        }
    };

    router.post('/login', passport.authenticate(['local'], {
            session: false
        }),
        function (req, res) {
            var doc = req.user;
            t(doc, req.lng);
            res.json(doc);
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
                    var doc = Err.FAIL;
                    err.code && (doc.err = err.code);
                    err.message && (doc.msg = err.message);
                    t(doc, req.lng);
                    res.json(doc);
                });
            ;
        });
};
