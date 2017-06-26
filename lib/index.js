module.exports = function (opts) {
    var service = require('./service')(opts);
    var self = this;
    this.on('open', function () {
        var router = self.servers.http.middle;
        require('./router').call(service, router);
    });
    return service;
};
