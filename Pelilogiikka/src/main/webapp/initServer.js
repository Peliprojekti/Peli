var http = require('http');
var fs = require('fs');
var express = require('express');
var morgan = require('morgan');
//var socketio = require('socket.io');

var server = null;

var nconf = null;
var logger = null;
var comServer = null;

module.exports = new function() {
    this.shutdown = function() {
        //server.close(); // doesn't work?
    }

    this.start = function(nconf_, logger_, comServer_) {
        nconf = nconf_;
        logger = logger_;
        comServer = comServer_;
        var winston = require('winston');
        var express = require('express');

        server = express();

        // enable logging if needed
        if (nconf.get('debug')) {
            server.use(morgan('short'));
        }

        // send some config stuff to express
        server.set('view engine', 'jade');
        server.set('view options', { pretty: true }); // doesn't seem to work?
        server.set('views', nconf.get('jade_views'));

        // serve some static files
        server.use("/javascript", express.static(nconf.get('static_javascript')));
        server.use("/data", express.static(nconf.get('static_data')));

        // server socket.io.js from modules directory
        server.get('/socket.io/socket.io.js', function(request, response) {
            response.setHeader('content-type', 'text/javascript');
            response.sendfile(__dirname + "/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js");
        });

        // send client stuff to 
        server.get('/', function(request, response) {
            response.render(nconf.get('client_jade'), {
                "title": nconf.get("game_name")
            });
        });

        server.get('/screen', function(request, response) {
            response.render(nconf.get('screen_jade'));
        });

        server.listen(nconf.get('http_port'));

        return this;
    }
}
