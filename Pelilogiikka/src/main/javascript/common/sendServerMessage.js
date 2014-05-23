var peli = peli || {};
peli.common = peli.client || {};

/**
 * Sends debug messages to server
 */
peli.common.sendServerMessage = function(msg) {
    if (peli.io.serverDebugMessenger._socket === undefined) {
        var socket = eio.Socket(
                { host: location.hostname, port: 1340 }, // TODO hardcoded port here!
                { transports: ['websocket','polling'] });

        socket.on('close', function() {
            log.warn("ServerDebugMessenger disconnected");
        });

        socket.on('error', function() {
            log.errorr("ServerDebugMessenger connection error");
        });

        peli.io.serverDebugMessenger._socket = socket;
    }
    peli.io.serverDebugMessenger._socket.send(msg);
};
