var WebSocket = require('ws');
var url = require('url');

var server;

module.exports = new function() {
	this.start  = function(port) {
		server = new WebSocketServer({
			'port': port;
		});

		server.on('connection', function(ws) {
			free_sockets.push(ws);

			ws.on('close', function()) {

			}

			/*
			ws.on('message', function(data, flags) {
				if (ws.peliClient != null) {
					ws.peliClient.send(data);
				}
			});
			*/
		});

		wss.on('close', function()) {
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
