
var clientComs = {
	socket: null,
	persistent: true,

	onMessage: function() {},

	initConnection: function(callback) {
		clientComs.socket = io.connect('http://' + location.hostname + ":" + CLIENT_PORT);

		clientComs.socket.on('open', callback);

		clientComs.socket.on('close', function() {
            log.info('Closing connection');

            /*
			if (typeof closeEventCallback == 'function') {
				closeEventCallback(true);
				closeEventCallback(null);
			}

			callbacks = new Object();
			rpcMethods = new Object();
            */
		});

		clientComs.socket.on('error', function() {
            clientComs.socket.close();

			if (typeof callback == 'function') {
				callback({"code": E_NO_CONNECTION_CODE, "message": E_NO_CONNECTION + host + ":" + port + ", protocol: " +  protocol}, null);
			}
		});

		clientComs.socket.on('message', function(message) {
			clientComs.onMessage(message);
		});

		clientComs.socket.on('gameStarted', function(data) {

		});
	},

	message: function(data) {
		clientComs.socket.emit('message', data);
	},

    position: function(x, y) {
        clientComs.socket.emit('position', [x,y]);
    }
};

