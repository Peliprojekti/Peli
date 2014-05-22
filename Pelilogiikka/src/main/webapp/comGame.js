var WebSocket = require('ws');
var url = require('url');

var server;

var free_sockets = [];

module.exports = new function() {
	this.start  = function(port) {
		server = new WebSocket.Server({
			'port': port
		});

		console.log("starting websocket server on " + port);

		server.on('connection', function(ws) {
			console.log("connectione opened");
			free_sockets.push(ws);

			ws.on('close', function() {

			});

			/*
			ws.on('message', function(data, flags) {
				if (ws.peliClient != null) {
					ws.peliClient.send(data);
				}
			});
			*/
		});

		server.on('close', function() {
			console.log("Ei näin...");
			process.exit(0);
		});
	}

	this.close = function() {

	};

	this.getGameSocket = function() {
		return free_sockets.pop();
	};
}
