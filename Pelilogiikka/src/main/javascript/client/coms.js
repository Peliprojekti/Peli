var client = client || {};
client.coms = client.coms || {};

/**
 * This opens the initial connection
 * @param {function} callback - will be called when connection is opened
 */
client.coms.open = function(callback, connectionClosedCallback) {
    if (!client.coms._isOpened) {
        var connection = new ConnectionEngineIO(location.hostname, CLIENT_PORT, JSONRPC_PROTOCOL, true);
        var rpc = new peliRPC.create(connection);

        client.coms._rpc = rpc;

        client.coms._isOpened = true;

        connection.connect(callback, 
                function() {
                    client.coms._isOpened = false;
                    connectionClosedCallback();
                    console.warn("connection error, trying to reconnect in 1s");

                    setTimeout(function() {
                        //client.coms.open(callback, connectionClosedCallback);
                    }, 1000 );
                },
                rpc.onMessage.bind(rpc));
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

