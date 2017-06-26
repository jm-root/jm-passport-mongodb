var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var error = require('jm-err');

module.exports = function (service, opts) {
    passport
        .use(new Strategy(
            function (username, password, cb) {
                service.user.signon(username, password, function (err, doc) {
                    if (!err && doc && doc.id) {
                        service.sso.signon(doc, function(err, doc){
                            return cb(null, doc);
                        });
                    } else {
                        return cb(null, doc || error.Err.FA_NOAUTH);
                    }
                });
            }));
    return passport;
};