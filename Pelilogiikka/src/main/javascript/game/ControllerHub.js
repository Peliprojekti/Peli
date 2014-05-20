function ControllerHub() {
	this.hostname = location.hostname;
	this.port = SCREEN_PORT;

	this.socket = null;
	onMessage = function();
	onPosition = function();
	onNewPlayer = function();
}

ControllerHub.prototype.open = function(callback) {
	this.socket = io.connect('http://' + this.hostname + ":" + "this.port);

	this.socket.on('connection', function() {
		var userID = Math.floor(Math.random() * (max - min + 1)) + min;
		socket.emit('userID', userID);
	});

	this.socket.on('joinGame', function(data) {
		socket.emit('joinGame', true);
	});

	this.socket.on('message', this.onMessage);
	this.socket.on('position', this.onPosition);

	socket.on('joinGame', function(data) {
		socket.emit('joinGame', true);
	});
}

ControllerHub.prototype.setOnMessage(callback) {
	this.onMessage = callback;
}

ControllerHub.prototype.setOnPosition(callback) {
	this.onPosition = callback;
}

