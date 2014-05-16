var socketio = require('socket.io')

var nconf = null;
var logger = null;

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
    this.create = function(nconf_, logger_) {
		nconf = nconf_;
		logger = logger_;
	}

	this.start = function() {
		var clientio = socketio.listen(nconf.get('client_port'));
		var screenio = socketio.listen(nconf.get('screen_port'));

		screenio.sockets.on('connection', function(socket) {
			logger.info("screen connection on");
			screenSocket = socket;
		});

		clientio.sockets.on('connection', function(socket) {
			logger.info("client connection on");
			socket.emit('open', null);
			
			socket.on('message', function(data) {
				logger.debug('sending message to screen');
				sendToScreen(data);
			});
		});
	}
};
