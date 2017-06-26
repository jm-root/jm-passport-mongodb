module.exports = function (opts) {
    var o = {
        user: require('jm-user')(opts),
        sso: require('jm-sso')(opts)
    };
    o.passport = require('./passport')(o);
    return o;
};
