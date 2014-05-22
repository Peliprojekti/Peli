var eio = require('engine.io');

var game;
var server;

module.exports = new function() {
	this.start  = function(client_port, gameComs) {
		server = eio.listen(client_port);

		server.on('connection', function(socket) {
			var gameSocket = game.getGameSocket();

			if (gameSocket != null) {
				gameSocket.on('message', function(data, flags) {
					socket.send(data);
				});

				socket.on('message', function(data) {
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
				socket.close();
			}
		});
	}
}
