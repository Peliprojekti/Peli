var peli = peli || {};
peli.client = peli.client || {};
peli.client.coms = peli.client.coms || {};

/**
 * This opens the initial connection
 * @param {function} callback - will be called when connection is opened
 */
peli.client.coms.open = function(callback) {
    if (!peli.client.coms._isOpened) {
        var protocol = JSONRPC_PROTOCOL;
        var port = CLIENT_PORT;
        var userID = USERID;

        var hostname = location.hostname;

        var serverMessenger = new ServerDebugMessenger();
        var connection = new ConnectionEngineIO(this.hotname, this.port, this.protocol, true);
        var rpc = new PeliRpc(connection);

        peli.client.coms._serverMessenger = serverMessenger;
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
    if (peli.client.coms._serverMessenger === undefined) {
        throw "peli.client.coms.serverMsg() - trying to send message before opengin connections";
    }
    peli.client.com._serverMessenger.send();
};

/**
 * Request a gameslot
 * @param {function} callback - will be called like so callback(controllerType);
 */
peli.client.coms.joinGame = function(callback) {
    if (peli.client.coms._rpc === undefined) {
        throw "peli.client.coms.serverMsg() - trying to join before opening connection";
    }
    this.rpc.callRpc('joinGame', [this.userID], this, callback);
};

/**
 * Execute remote commands on player object (or kind of any, really)
 *
 * @param {object} player - this is theplayer that will recieve the returnval
 * @param {string} method - name of the remote method to call
 * @param {array} args - remote method arguments
 * @param {object} callback - will be called with return value
 *
 */
peli.client.coms.call = function(method, params, object, callback) {
    rpc.callRpc(method, params, player, callback);
};

/*
 * MOVE THESE AWAY FROM HERE
 * Keep coms.js as clean as possible from actual game/controller mechanics. Possibly
 * instead at some point expose the carrRpc thingy to the outside, like the upper method
 */

peli.client.coms.position = function(x, y) {
    peli.client.coms.call('position', [x, y], null, null);
};

peli.client.coms.swipe = function(x, y, sincePreviousTime) {
    peli.client.coms.call('position', [x,y,xincePreviousTime], null, null);
    //this.rpc.callRpc('swipe', [null, x, y, sincePreviousTime], this, null);
};

peli.client.coms.orientation = function(tiltLR, tiltFB, dir) {
    peli.client.coms.call('orientation', [titleLR, titleFB, dir], null, null);
    //this.rpc.callRpc('orientation', [null, tiltLR, tiltFB, dir], this, null);
};
