var client = client || {};
client.coms = client.coms || {};

/**
 * This opens the initial connection
 * @param {function} callback - will be called when connection is opened
 */
client.coms.open = function(callback) {
    if (!client.coms._isOpened) {
        var connection = new ConnectionEngineIO(location.hostname, CLIENT_PORT, JSONRPC_PROTOCOL, true);
        var rpc = new PeliRPC(connection);

        client.coms._rpc = rpc;

        client.coms._isOpened = true;
        rpc.connect(callback);
    }
};

/**
 * close connection
 */
client.coms.close = function() {
    if (client.coms._rpc === undefined) {
        throw "client.coms.close() - trying to close before creating";
    }
    client.coms._rpc.close();
};

/**
 * This will send messages directly to the server
 * @param {function} msg
 */
client.coms.serverMsg = function(msg) {
    log.warn('deprecated, instead use log.sendServerMessage directly');
    log.sendServerMessage(msg);
};

/**
 * Request a gameslot
 * @param {function} callback - will be called like so callback(controllerType);
 */
client.coms.joinGame = function(userID, callback) {
    if (client.coms._rpc === undefined) {
        log.error("client.coms.joinGame - trying to join before opening connection");
    }
    if (!userID) {
        log.error("client.coms.joinGame - must supply userID, recieved: " + userID);
    }
    log.info("client.coms.joinGame - calling RPC::joinGame(" + userID + ")");
    client.coms._rpc.callRpc('joinGame', [userID], this, callback);
};

/**
 * Execute remote commands on player object (or kind of any, really)
 *
 * @param {string} method - name of the remote method to call
 * @param {array} args - remote method arguments
 * @param {object} player - this is thePlayer in which context callback will be called
 * @param {object} callback - will be called with return value
 *
 */
client.coms.call = function(method, params, object, callback) {
    client.coms._rpc.callRpc(method, params, object, callback);
};

/*
 * MOVE THESE AWAY FROM HERE
 * Keep coms.js as clean as possible from actual game/controller mechanics. Possibly
 * instead at some point expose the carrRpc thingy to the outside, like the upper method
 */

client.coms.position = function(params, object, callback) {
    client.coms.call('position', params, object, callback);
};

client.coms.swipe = function(x, y, sincePreviousTime) {
    client.coms.call('position', [x,y,xincePreviousTime], null, null);
    //this.rpc.callRpc('swipe', [null, x, y, sincePreviousTime], this, null);
};

client.coms.orientation = function(tiltLR, tiltFB, dir) {
    client.coms.call('orientation', [titleLR, titleFB, dir], null, null);
    //this.rpc.callRpc('orientation', [null, tiltLR, tiltFB, dir], this, null);
};
