var io = io || {};

/**
 * Sends messages to server
 */
io.sendServerMessage = function(msg) {
    if (io.sendServerMessage._socket === undefined) {
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

        io.sendServerMessage._socket = socket;
    }
    io.sendServerMessage._socket.send(msg);
};
