var eio = require('engine.io');

var game;
var server;

module.exports = new function() {
	this.setDebug = function(debugMode) {
		DEBUG = debugMode;
	};

	this.start  = function(client_port, gameComs) {
		game = gameComs;
		server = eio.listen(client_port);
		if (DEBUG) console.log("engine.io/controller - listening on " + client_port);

		server.on('connection', function(socket) {
			if (DEBUG) console.log("engine.io/controller - connection opened");
			var gameSocket = game.getGameSocket();

			if (gameSocket !== null) {
				if (DEBUG) console.log("engine.io/controller - connecting client to game");

				gameSocket.on('message', function(data, flags) {
					//if (DEBUG) console.log("engine.io/controller - forwarding msg from game to client");
					socket.send(data);
				});

				socket.on('message', function(data) {
					//if (DEBUG) console.log("engine.io/controller - forwarding msg from client to game");
					gameSocket.send(data);
				});

				socket.on('close', function() {
					// TODO free the gamesocket
				});

				socket.on('error', function() {
					// TODO tee nyt vaikka jotian...
				});
			}
			else {
				if (DEBUG) console.log("engine.io/controller - no free slots, disconnecting");
				socket.close();
			}
		});
	}
}
