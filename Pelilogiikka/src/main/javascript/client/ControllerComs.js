function ControllerComs() {
	this.hostname = location.hostname;
	this.port = CLIENT_PORT;
	this.userID = 0;

	this.onMessage = function(msg) {
		log.info("got message: " + msg);
	};

	this.onGameStarted = function() {}
}

ControllerComs.prototype.open = function(callback) {
	this.socket = io.connect('http://' + this.hostname + ":" + this.port);

	this.socket.on('open', function() {
		log.info("Connection opened");
		this.onUserID = callback;
	});

	this.socket.on('close', function() {
		log.info("Connection closed");
	});

	this.socket.on('userID', function(data) {
		log.info("Got userID: " + data);
		this.userID = data;
		this.onUserID();
	});

	this.socket.on('message', this.onMessage);

	this.socket.on('error', function(data) {
		log.error("Connection error");
	});
}

ControllerComs.prototype.close = function(callback) {
	log.warn("ControllreComs.close not implemented");
}

ControllerComs.prototype.setOnMessage = function(func) {
	this.onMessage = func;
}

ControllerComs.prototype.setOnGameStarted = function(func) {
	this.onGameStarted = func;
}

ControllerComs.prototype.joinGame = function(callback) {
	this.onJoinGame = callback;
	this.socket.emit('joinGame', userID);
}

ControllerComs.prototype.position = function(position) {
	this.socket.emit('position', userID, position);
}


