var peli = peli || {};
peli.common = peli.client || {};

/**
 * Sends messages to server
 */
peli.common.sendServerMessage = function(msg) {
    if (peli.common.sendServerMessage._socket === undefined) {
        var socket = eio.Socket(
                { host: location.hostname, port: 1340 }, // TODO hardcoded port here!
                { transports: ['websocket','polling'] });

        socket.on('close', function() {
            log.warn("sendServerMessage disconnected");
            peli.common.sendServerMessage._socket = null;
        });

        socket.on('error', function() {
            log.errorr("sendServerMessage connection error");
            peli.common.sendServerMessage._socket = null;
        });

        peli.common.sendServerMessage._socket = socket;
    }
    peli.common.sendServerMessage._socket.send(msg);
};
