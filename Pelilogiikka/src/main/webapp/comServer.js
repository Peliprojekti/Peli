var eio = require('engine.io');
var WebSocket = require('ws');
var url = require('url');
var game = require('comGame.js');
var cont = require('comController.js');

var DEBUG = false;

var CLIENT_PORT = 1338;
var SCREEN_PORT = 1339;
var BENCHMARK = false;
var BENCHMARK_INTERVAL = 1000;

var screenSocket = null; // stores the currnetly connected screen, if any

var clientio = null;
var screenio = null; 

var connected = false;


function closeServer() {
	this.connected = false;
}

function startServer() {
	this.connected = true;
	game.start(SCREEN_PORT);

	cont.start(CLIENT_PORT, game);
}


/*
 * SERVER COMMANDS
 */

process.on('message', function(msgobj) {
	if (msgobj.type == 'debug') {
		DEBUG = msgobj.value;
	}
	else if (msgobj.type == 'startServer') {
		if (DEBUG) { console.log("   info  - firing up comServer"); }
		startServer();
	}
	else if (msgobj.type == 'shutdown') {
		if (DEBUG) { console.log("   info  - shutting down"); }
		closeServer();
		process.exit(0);
	}
	else if (msgobj.type == 'closeServer') {
		if (DEBUG) { console.log("   info  - comServer shuting down"); }
		// TODO
	}
	else if (msgobj.type == 'config') {
		// TODO check values, error handling
		CLIENT_PORT = msgobj.value.client_port;
		SCREEN_PORT = msgobj.value.screen_port;
		DEBUG = msgobj.value.debug;
		BENCHMARK = msgobj.value.benchmark;
		BENCHMARK_TIMEOUT = msgobj.value.benchmark_timeout;
		BENCHMARK_FILENAME = msgobj.value.benchmark_filename;

		if (DEBUG) { console.log("   info  - updated comServer configuration"); }
	}
	else {
		console.log("   error - recieving unrecognized message from parent process");
		// TODO handle error? send to parent?
	}

});

