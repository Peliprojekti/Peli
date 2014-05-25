var WebSocket = require('ws');
var url = require('url');

var server;

var free_sockets = [];

module.exports = new function() {
	this.start  = function(port) {
		server = new WebSocket.Server({
			'port': port
		});

        server.on('error', function(err) {
            require('util').error("websocket/game - Websokcet server errror: " + err);
        });


        require('util').log("websocket/game - listening " + port);

        server.on('connection', function(ws) {
            require('util').log("websocket/game - gameSocket connected");
            free_sockets.push(ws);

            ws.on('close', function() {
                // TODO handle this gracefully
            });

            ws.on('error', function(err) {
                require('util').error("websocket/game - Websokcet connection errror: " + err);
            });

            //ws.on('error', functiohn
        });

            server.on('close', function() {
                require('util').error("websocket/game - server connection closed");
                process.exit(0);
            });
            };

    this.close = function() {

    };

    this.join = function(gameSocket, socket) {
        require('util').log("websocket/game - joining player to gamesocket");
        gameSocket.controllerSocket = socket;

        gameSocket.on('message', function(data, flags) {
            if (gameSocket.socket && gameSocket.socket.readyState == 'open') {
                gameSocket.socket.send(data);
            }
        });
    };

    this.unJoin = function(gameSocket, socket) {
        require('util').log("websocket/game - unjoining player from gamesocket");
        if (gameSocket.readState == WebSocket.OPEN) {
            gameSocket.send('playerDisconnected');
        }
        delete gameSocket.socket;
        free_sockets.unshift(gameSocket);
    };

    this.getGameSocket = function() {
        return free_sockets.pop();
    };
}
