var WebSocket = require('ws');
var url = require('url');

var server;

var free_sockets = [];

module.exports = new function() {

    this.close = function() {
        server.close();
    };

    this.start = function(port) {

        server = new WebSocket.Server({
            'port': port
        });
        require('util').log("websocket/game - listening " + port);

        server.on('error', function(err) {
            require('util').error("websocket/game - Websokcet server errror: " + err);
        });

        server.on('connection', function(ws) {
            require('util').log("websocket/game - gameSocket connected");
            ws.requestClose = function() {
                if (ws.readyState == WebSocket.OPEN) {
                    ws.send("-1");
                }
            };
            free_sockets.push(ws);

            ws.on('close', function() {
                require('util').log("websocket/game - connection closed");
                // TODO handle this gracefully
            });

            ws.on('error', function(err) {
                require('util').error("websocket/game - Websokcet connection errror: " + err);
            });
        });

        server.on('close', function() {
            require('util').error("websocket/game - server closed");
            process.exit(0);
        });
    };

    this.getGameSocket = function() {
        return free_sockets.pop();
    };
}


    /*
    this.join = function(gameSocket, socket) {
        require('util').log("websocket/game - joining player to gamesocket");
        gameSocket.controllerSocket = socket;

        gameSocket.on('message', function(data, flags) {
            //if (gameSocket.socket && gameSocket.socket.readyState == 'open') {
                gameSocket.socket.send(data);
                /*
            }
            else {
                require('util').error("websocket/game - trying to forward to closed client socket");
            }
        });
    };
    */

    /*
    this.unJoin = function(gameSocket, socket) {
        require('util').log("websocket/game - unjoining player from gamesocket");
        if (gameSocket.readState == WebSocket.OPEN) {
            gameSocket.send('playerDisconnected');
        }
        delete gameSocket.socket;
        free_sockets.unshift(gameSocket);
    };
    */

