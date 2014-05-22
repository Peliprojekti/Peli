/**
 * Controller
 * @constructor
 */
function Controller(onConnect, onDisconnect) {
    var that = this;

    //this.onJoinPlayer = onConnect;
	//this.onDisconnect = onDisconnect;

    this.hostname = location.hostname;
    this.port = SCREEN_PORT;
    this.protocol = JSONRPC_PROTOCOL;

	this.connection = new ConnectionWebsocket(this.hostname, this.port, this.protocol, true);
    this.rpc = new PeliRPC(this.connection);

	this.rpc.exposeRpcMethod('joinGame', that, function(userID) {
		return onConnect(that, userID);
		return true;
	});

	this.rpc.exposeRpcMethod('position', that, function(userID, x, y) {
		that.player.setPosition(x, y);
	});

	this.rpc.exposeRpcMethod('swipe', that, function(userID, x, y, sincePrevious) {
		that.player.pushSwipe(position, sincePrevious);
	});
}

//Controller.prototype= function(callback) {

/**
 * Used to initially open the connection
 * @param {function} callback - will be called when connection opened
 */
Controller.prototype.open = function(callback) {
	this.rpc.connect(callback);
}

/**
 * close connection
 */
Controller.prototype.close = function() {
	this.rpc.close();
}

/**
 * This will send messages directly to the server
 * @param {function} msg 
 */
Controller.prototype.serverMsg = function(msg) {
	log.error("this is currently kinda depracated");
	// TODO ????
	//this.socket.emit('serverMsg', [(typeof userID === 'undefined' ? 'new user' : userID), msg]);
}
