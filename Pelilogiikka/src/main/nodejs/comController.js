var eio = require('engine.io');
var WebSocket = require('ws');

var game;
var server;

module.exports = new function() {
	this.start  = function(client_port, gameComs) {
		game = gameComs;
		server = eio.listen(client_port);

        require('util').log('engine.io/controller - listening on ' + client_port);

		server.on('connection', function(socket) {
			var gameSocket = game.getGameSocket();

			if (gameSocket !== undefined && gameSocket !== null) {
                require('util').log("engine.io/controller - connecting client to game");

				gameSocket.on('message', function(data, flags) {
                    if (socket.readyState === 'open') {
                        socket.send(data);
                    } else {
                        require('util').log("engine.io/controller - trying to forward to closed client");
                        //gameSocket.requestClose();
                    }
				});

				socket.on('message', function(data) {
                    if (gameSocket.readyState == WebSocket.OPEN) {
                        gameSocket.send(data);
                    }
                    else {
                        require('util').error("engine.io/controller - client trying to forward to closed screen socket");
                        socket.close();
                        //gameSocket.requestClose();
                    }
				});

				socket.on('close', function() {
                    require('util').log("engine.io/controller - client disconnected");
                    if (gameSocket.readyState == WebSocket.OPEN) {
                        gameSocket.requestClose();
                    }
                });

				socket.on('error', function() {
                    require('util').error("engine.io/controller - connection error!");
                    gameSocket.close();
				});
			}
			else {
                require('util').log("engine.io/controller - client diconnected due to no available screen connections");
				socket.close();
			}
		});
	};
}
