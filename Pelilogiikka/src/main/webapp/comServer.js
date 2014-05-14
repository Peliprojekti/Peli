var socketio = require('socket.io')

var CLIENT_PORT = 1338;

module.exports = new function() {
	this.startComs = function() {
		var io = socketio.listen(CLIENT_PORT);

		io.sockets.on('connection', function(socket) {
			socket.emit('new', { hello: 'World' });
			socket.on('my other event', function(data) {
				console.log(data);
			});
		});
	}
}





