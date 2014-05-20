function ControllerComs() {
	this.hostname = location.hostname;
	this.port = CLIENT_PORT;
	this.userID = 0;
	this.socket = null;

	this.onMessage = function(msg) {
		log.info("got message: " + msg);
	};

	this.onGameStarted = function() {}
}

ControllerComs.prototype.setDummyMode = function(dummyMode) {
	this.dummyMode = dummyMode;
}

ControllerComs.prototype.open = function(callback) {
	this.onUserID = callback;

	var url = 'http://' + this.hostname + ":" + this.port;
	log.debug('connecting client to ' + url);
	this.socket = io.connect(url);

	this.socket.on('connection', function() {
		log.info("socket.on('connection')");
	});

	this.socket.on('close', function() {
		log.info("Connection closed");
	});

	var client = this;
	this.socket.on('userID', function(data) {
		log.info("Got userID: " + data);
		client.userID = data;
		client.onUserID();
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
	if (this.socket != null) {
		if (dummyMode != true) {
			log.error("trying to use unopened socket");
		}
	}
	else {
		log.debug("sending position");
		this.socket.emit('position', userID, position);
	}
}


