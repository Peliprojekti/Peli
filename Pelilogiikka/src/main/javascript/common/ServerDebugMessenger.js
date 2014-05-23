function ServerDebugMessenger() {
	this.socket = eio.Socket(
			{ host: location.hostname, port: 1340 },
			{ transports: ['websocket','polling'] });

	this.socket.on('close', function() {
		log.warn("ServerDebugMessenger disconnected");
	});

	this.socket.on('error', function() {
		log.errorr("ServerDebugMessenger connection error");
    });
}


ServerDebugMessenger.prototype.send = function(msg) {
    this.socket.send(msg);
};

