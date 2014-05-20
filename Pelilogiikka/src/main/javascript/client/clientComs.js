var clientComs = {
	socket: null,
	persistent: true,
	userID: 0,

	onMessage: function() {},

	initConnection: function(callback) {
		clientComs.socket = io.connect('http://' + location.hostname + ":" + CLIENT_PORT);

		clientComs.socket.on('open', function(data) {
			log.info('connection opened');
			callback(data);
		});

		clientComs.socket.on('close', function() {
            log.info('Closing connection');
		});

		clientComs.socket.on('userID', function(data) {
			userID = data;
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


	// callback(connected, Player|queuePosition)
	startGame: function(callback) {
		// Placeholder for actual server comunications
		log.info("trying to joing a game");
		clientComs.socket.emit('joinGame', userID);

		clientComs.socket.on('gameStarted', function(data) {
			if (data == true) {
				log.info("joined a game");
				callback(true, new Player(userID));
			}
			else {
				log.info("could not join");
			}
		});
	},

	message: function(data) {
		clientComs.socket.emit('message', data);
	},

    position: function(x, y) {
		log.debug("sending position");;
        clientComs.socket.emit('position', [x,y]);
	}
};

