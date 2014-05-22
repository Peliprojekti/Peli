/**
* This takes care of communication through Engine.io
* @constructor
* @param {string} host - 
* @param {number} port - 
* @param {string} protocol - 
* @param {boolean} persistent - connection stays open if set to true
*/
function ConnectionEngineIO(host, port, protocol, persistent) {
	this.host = host;
	this.port = port;
	this portocol = protocol;
	this.persistent = persistent;
	this.socket = null;

	this.closeCallback = null;
	this.onMessage = null;
}

ConnectionEngineIO.prototype.connect = function(connectCallback, closeCallback, onMessage) {
	var that = this;
	this.closeCallback = closeCallback;
	this.onMessage = onMessage;

	var hoststr = host + ":" + port + "/" + protocol;

	log.info("Connecting to " + hoststr);

	this.socket = eio.Socket(
			{ host: host, port: port },
			{ transports: ['websocket','polling'] });

	socket.on('open', function()						{
		connectCallback(null, true);
	});

	socket.on('close', function() {
		log.info("Disconnected from " + hoststr);

		if(typeof that.closCallback == "function") {
			that.closeCallback(true);
			that.closeCallback = null;
		}
	});

	socket.on('error', function() {
		that.close();

		if(typeof connectCallback == "function") {
			connectCallback({"code": E_NO_CONNECTION_CODE, "message": E_NO_CONNECTION + host + ":" + port + ", protocol: " +  protocol}, null);
		}
	});

	socket.on('message', function(message)		{
		that.onMessage(message);

		if(!that.persistent) {
			that.socket.close();
		}
	});
}

ConnectionEngineIO.prototype.isOpen() {
	return (this.socket.readyState == 'open');
}

ConnectionEngineIO.prototype.close = function() {
	this.closeEventCallback = null;

	if (this.socket.readyState == 'open') {
		socket.close();
	}
}

PeliRPC.prototype.sendMessage = function(message) {
	log.info("RPC::sendMessage() " + hoststr + "." + JSON.stringify(message));
	if (this.socket.readyState == "open") {
		this.socket.send(JSON.stringify(message));	
	}
}

