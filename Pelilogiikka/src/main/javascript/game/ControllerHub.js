/**
 * ControllerHub
 * @constructor
 * @param {function} onJoinPlyaer
 * @param {number} maxPlayers
 */
function ControllerHub(onJoinPlayer, maxPlayers) {
    var that = this;
    this.maxPlayers = (typeof maxPlayers == 'undefined' ? 100 : maxPlayers);
    this.playersConnected = 0;

    this.onJoinPlayer = onJoinPlayer;

    this.players = null;
    this.hostname = location.hostname;
    this.port = SCREEN_PORT;
    this.protocol = JSONRPC_PROTOCOL;

    this.players = {};

	this.connection = new ConnectionWebsocket(this.hostname, this.port, this.protocol, true);
    this.rpc = new PeliRPC(this.connection);

    this.rpc.exposeRpcMethod('joinGame', that, function(userID) {
            // could we possibly use self, I think so?
            if (that.playersConnected <= that.maxPlayers) {
                log.info("joining player : " + userID);
                that.players[userID] = playerFactory.getPlayer(userID);
                that.onJoinPlayer(that.players[userID]);
                return true;
            }
                return false;
            });

    this.rpc.exposeRpcMethod('position', that, function(userID, x, y) {
            that.players[userID].setPosition(x, y);
            });

    this.rpc.exposeRpcMethod('swipe', that, function(userID, x, y, sincePrevious) {
            that.players[userID].pushSwipe(position, sincePrevious);
            });
}

ControllerHub.prototype.setOnJoinPlayer = function(callback) {
	this.onJoinPalyer = callback;
}


/**
 * Used to initially open the connection
 * @param {function} callback - will be called when connection opened
 */
ControllerHub.prototype.open = function(callback) {
	this.rpc.connect(function() {
		window.alert("connection established");
	});
    //this.rpc.connect(callback);
}

/**
 * close connection
 */
ControllerHub.prototype.close = function() {
    this.rpc.close();
}

/**
 * This will send messages directly to the server
 * @param {function} msg 
 */
ControllerHub.prototype.serverMsg = function(msg) {
    log.error("this is currently kinda depracated");
    // TODO ????
    //this.socket.emit('serverMsg', [(typeof userID === 'undefined' ? 'new user' : userID), msg]);
}
