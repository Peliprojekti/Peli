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
	this.portocol = protocol;
	this.persistent = persistent;
	this.socket = null;
	this.hoststr = this.host + ":" + this.port; // + "/" + protocol;

	this.closeCallback = null;
	this.onMessage = null;
}

ConnectionEngineIO.prototype.connect = function(connectCallback, closeCallback, onMessage) {
	var that = this;
	this.closeCallback = closeCallback;
    if (onMessage === null || onMessage === undefined) console.error("no onMessage supplied");
	this.onMessage = onMessage;

	var hoststr = this.host + ":" + this.port; // + "/" + protocol;

	console.info("ConnectionEngineIO connecting to ", hoststr);

	this.socket = eio.Socket(
			{ host: this.host, port: this.port },
			{ transports: ['websocket','polling'] });

	this.socket.on('open', function()						{
        console.info("ConnectionEngineIO connection opened");
		connectCallback(null, true);
	});

	this.socket.on('close', function() {
		log.info("ConnectionEngineIO disconnected from " + hoststr);

		if(typeof that.closCallback == "function") {
			that.closeCallback(true);
			that.closeCallback = null;
		}
	});

	this.socket.on('error', function(err) {
        console.warn("error connecting ", err);
		that.close();

		if(typeof connectCallback == "function") {
			connectCallback({"code": 1 , "message": "Failed to connect to: " + this.host + ":" + this.port + ", protocol: " +  this.protocol}, null);
		}
	});

	this.socket.on('message', function(message) {
		that.onMessage(message);

		if(!that.persistent) {
			that.socket.close();
		}
	});
};

ConnectionEngineIO.prototype.isOpen = function() {
	return (this.socket.readyState == 'open');
};

ConnectionEngineIO.prototype.close = function() {
	this.closeEventCallback = null;

	if (this.socket.readyState == 'open') {
		socket.close();
	}
};

ConnectionEngineIO.prototype.sendMessage = function(message) {
	if (this.socket.readyState == "open") {
		this.socket.send(JSON.stringify(message));	
	}
};

ConnectionEngineIO.prototype.serverMsg = function(msg) {
};

