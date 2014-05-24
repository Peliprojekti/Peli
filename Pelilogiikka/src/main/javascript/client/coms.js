var peli = peli || {};
peli.client = peli.client || {};
peli.client.coms = peli.client.coms || {};

/**
 * This opens the initial connection
 * @param {function} callback - will be called when connection is opened
 */
peli.client.coms.open = function(callback) {
    if (!peli.client.coms._isOpened) {
        var connection = new ConnectionEngineIO(location.hostname, CLIENT_PORT, JSONRPC_PROTOCOL, true);
        var rpc = new PeliRPC(connection);

        peli.client.coms._rpc = rpc;

        peli.client.coms._isOpened = true;
        rpc.connect(callback);
    }
};

/**
 * close connection
 */
peli.client.coms.close = function() {
    if (peli.client.coms._rpc === undefined) {
        throw "peli.client.coms.close() - trying to close before creating";
    }
    peli.client.coms._rpc.close();
};

/**
 * This will send messages directly to the server
 * @param {function} msg
 */
peli.client.coms.serverMsg = function(msg) {
    log.warn('deprecated, use peli.common.sendServerMessage directly');
    peli.common.sendServerMessage(msg);
};

/**
 * Request a gameslot
 * @param {function} callback - will be called like so callback(controllerType);
 */
peli.client.coms.joinGame = function(userID, callback) {
    if (peli.client.coms._rpc === undefined) {
        log.error("peli.client.coms.joinGame - trying to join before opening connection");
    }
    if (!userID) {
        log.error("peli.client.coms.joinGame - must supply userID, recieved: " + userID);
    }
    log.info("peli.client.coms.joinGame - calling RPC::joinGame(" + userID + ")");
    peli.client.coms._rpc.callRpc('joinGame', [userID], this, callback);
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
peli.client.coms.call = function(method, params, object, callback) {
    peli.client.coms._rpc.callRpc(method, params, object, callback);
};

/*
 * MOVE THESE AWAY FROM HERE
 * Keep coms.js as clean as possible from actual game/controller mechanics. Possibly
 * instead at some point expose the carrRpc thingy to the outside, like the upper method
 */

peli.client.coms.position = function(params, object, callback) {
    peli.client.coms.call('position', params, object, callback);
};

peli.client.coms.swipe = function(x, y, sincePreviousTime) {
    peli.client.coms.call('position', [x,y,xincePreviousTime], null, null);
    //this.rpc.callRpc('swipe', [null, x, y, sincePreviousTime], this, null);
};

peli.client.coms.orientation = function(tiltLR, tiltFB, dir) {
    peli.client.coms.call('orientation', [titleLR, titleFB, dir], null, null);
    //this.rpc.callRpc('orientation', [null, tiltLR, tiltFB, dir], this, null);
};
