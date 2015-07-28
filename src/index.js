var Hapi                 = require('hapi');
var server               = new Hapi.Server();
var routeConfigsPath     = 'static/js/app/routing/server/*.js';

server.connection({ port: 3000 });

/* routing */
server.register({
    register: require('hapi-router'),
    options: { routes: routeConfigsPath}
}, function(err) {
    if (err) {
        throw err;
    }
});

/* start server */
server.start(function() {
    console.log('Server running at:', server.info.uri);
});