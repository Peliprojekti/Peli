
var screenComs {
	socket: null,
	onMessage: null,

	initConnection: function(host, port, protocol, persistent_, onMessage_) {
		socket = io.connect('http://' + host + ":" + port);
		onMessage = onMessage_;

		socket.on('message', onMessage);
	}
};
