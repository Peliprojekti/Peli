/**
 * Controller
 * @constructor
 */
function Controller(onConnect, onDisconnect, onJoinGame, onLeftGame) {
    var that = this;

    this.hostname = location.hostname;
    this.port = SCREEN_PORT;
    this.protocol = JSONRPC_PROTOCOL;

    this.connection = new ConnectionWebsocket(this.hostname, this.port, this.protocol, true);
    this.rpc = new PeliRPC(this.connection);

    this.rpc.exposeRpcMethod('joinGame', this, function(userID) {
        log.info("Controller::RPC::joinGame - " + userID);
        this.player = playerFactory.getPlayer(userID);
        onJoinGame(this.player);
        return CONTROLLER;
    });

    this.rpc.exposeRpcMethod('position', this, function(x, y) {
        log.debug("Controller::RPC::position - Trying to move player " + this.player.userID + " to " + x + " - " + y);
        this.player.setPosition(x, y);
    });

    this.rpc.exposeRpcMethod('swipe', this, function(userID, x, y, sincePrevious) {
        this.player.pushSwipe([x,y], sincePrevious);
    });

    this.rpc.exposeRpcMethod('moveSwipe', this, function(userID, x, y, sincePrevious) {
        this.player.pushSwipe([x, y], sincePrevious);
    });
    
    this.rpc.exposeRpcMethod('orientation', this, function(userID, tiltLR, tiltFB, dir) {
        this.player.orientation(tiltLR, tiltFB, dir);
    });

    this.rpc.connect(onConnect);
}

/**
 * close connection
 */
Controller.prototype.close = function() {
    this.rpc.close();
};
