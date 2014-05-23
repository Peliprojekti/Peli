/**
 * Controller
 * @constructor
 */
function Controller(onConnect, onDisconnect, onJoinGame) {
    var that = this;

    this.hostname = location.hostname;
    this.port = SCREEN_PORT;
    this.protocol = JSONRPC_PROTOCOL;

    this.connection = new ConnectionWebsocket(this.hostname, this.port, this.protocol, true);
    this.rpc = new PeliRPC(this.connection);

    this.rpc.exposeRpcMethod('joinGame', this, function(userID) {
        this.player = playerFactory.getPlayer(userID);
        onJoinGame(this.player);
    });

    this.rpc.exposeRpcMethod('position', this, function(userID, x, y) {
        log.debug("Controller::RPC::position - Trying to move player " + userID + " to " + x + " - " + y);
        this.player.setPosition(x, y);
    });

    this.rpc.exposeRpcMethod('swipe', this, function(userID, x, y, sincePrevious) {
        this.player.pushSwipe([x,y], sincePrevious);
    });

    this.rpc.exposeRpcMethod('moveSwipe', this, function(userID, x, y, sincePrevious) {
        this.player.pushSwipe([x, y], sincePrevious);
    });
    
    this.rpc.exposeRpcMethod('orientation', this, function(userID, tiltLR, tiltFB, dir)){
        
    });

    this.rpc.connect(onConnect);
}

/**
 * close connection
 */
Controller.prototype.close = function() {
    this.rpc.close();
};

/**
 * This will send messages directly to the server
 * @param {function} msg
 */
Controller.prototype.serverMsg = function(msg) {
    log.error("this is currently kinda depracated");
    // TODO ????
    //this.socket.emit('serverMsg', [(typeof userID === 'undefined' ? 'new user' : userID), msg]);
};
