function ControllerHub() {
	this.hostname = location.hostname;
	this.port = SCREEN_PORT;

	this.socket = null;
	this.onMessage = function() {};
	this.onPosition = function() {};
	this.onNewPlayer = function() {};

	this.players = {};
}

ControllerHub.prototype.open = function(callback) {
	var url = 'http://' + this.hostname + ":" + this.port;
	log.info("connecting to " + url);
	this.socket = io.connect('http://' + this.hostname + ":" + "this.port");

	var players = this.players;

	this.socket.on('connection', function() {
		var userID = Math.floor(Math.random() * (max - min + 1)) + min;
		log.info("creating player with userID " + userID);
		players[userID] = new Player(userID);

		socket.emit('userID', userID);
	});

	this.socket.on('joinGame', function(data) {
		this.onJoinPlayer(players[userID]);
		socket.emit('joinGame', true);
	});

	this.socket.on('message', this.onMessage);
	this.socket.on('position', this.movePlayer);

	this.socket.on('joinGame', function(data) {
		socket.emit('joinGame', true);
	});
}


ControllerHub.prototype.movePlayer = function(userID, position) {
	this.players[userID].setPosition(position);
}

ControllerHub.prototype.setOnMessage = function(callback) {
	this.onMessage = callback;
}

ControllerHub.prototype.setOnJoinPlayer = function(callback) {
	this.onJoinPlayer = callback;
}
