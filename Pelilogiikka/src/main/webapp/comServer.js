var eio = require('engine.io');
var WebSocket = require('ws');
var url = require('url');
var game = require('./comGame.js');
var cont = require('./comController.js');

var DEBUG = false;

var CLIENT_PORT = 1338;
var SCREEN_PORT = 1339;
var DEBUG_PORT = 1340;

var DEBUG_MSGS = true;
var BENCHMARK = false;
var BENCHMARK_INTERVAL = 1000;

var screenSocket = null; // stores the currnetly connected screen, if any

var clientio = null;
var screenio = null; 

var connected = false;


function closeServer() {
	this.connected = false;
    process.exit(0);
}

function startServer() {
	this.connected = true;
	game.start(SCREEN_PORT);
	cont.start(CLIENT_PORT, game);
    if (DEBUG_MSGS) {
		server = eio.listen(DEBUG_PORT);

        require('util').log('comServer - listening for debug messages on ' + DEBUG_PORT);

        server.on('connection', function(socket) {
            socket.on('message', function(msg) {
                require('util').log("::serverMsg: " + msg);
            });
        });
    }
}


/*
 * SERVER COMMANDS
 */

process.on('message', function(msgobj) {
    if (msgobj.type == 'debug') {
        DEBUG = msgobj.value;
    }
    else if (msgobj.type == 'startServer') {
        require('util').log("comServer - starting connections");
        startServer();
    }
    else if (msgobj.type == 'shutdown') {
        require('util').log("comServer - shuting down");
        closeServer();
    }
    else if (msgobj.type == 'config') {
        require('util').log("comServer - configuring");
        // TODO check values to detect errors?
        CLIENT_PORT = msgobj.value.client_port;
        SCREEN_PORT = msgobj.value.screen_port;
        DEBUG = msgobj.value.debug;
        BENCHMARK = msgobj.value.benchmark;
        BENCHMARK_TIMEOUT = msgobj.value.benchmark_timeout;
        BENCHMARK_FILENAME = msgobj.value.benchmark_filename;
    }
    else {
        require('util').error("recieving unrecognized message from parent process, quitting");
        process.exit(-1);
    }

});

