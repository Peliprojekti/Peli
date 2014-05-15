var socketio = require('socket.io')

var CLIENT_PORT = 1338;
var SCREEN_PORT = 1339;

var screenSocket = null;

function sendToScreen(data) {
	if (screenSocket == null) {
		console.log("NO SCREEN CONNECTED");
		return;
	}

	screenSocket.emit('message', data);
}

module.exports = new function() {
	this.startComs = function() {
		var clientio = socketio.listen(CLIENT_PORT);
		var screenio = socketio.listen(SCREEN_PORT);

		screenio.sockets.on('connection', function(socket) {
			screenSocket = socket;
		});

		clientio.sockets.on('connection', function(socket) {
			socket.emit('open', null);
			//console.log("NEW CLIENT CONNECTED");
			
			socket.on('message', function(data) {
				sendToScreen('message', data);
			});

			socket.on('firstButton', function(data) {
				//console.log("Sending to screen");
				//console.log(data);
				sendToScreen("first " + data.count);
			});
			socket.on('secondButton', function(data) {
				//console.log("Sending to screen");
				//console.log(data);
				sendToScreen("second" + data.count);
			});
		});
	}
};
