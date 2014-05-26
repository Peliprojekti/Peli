/**
 * Sends messages to server
 */
sendServerMessage = function(msg) {
    if (sendServerMessage._socket === undefined) {
        var socket = eio.Socket(
                { host: location.hostname, port: 1340 }, // TODO hardcoded port here!
                { transports: ['websocket','polling'] });

        socket.on('close', function() {
            log.warn("sendServerMessage disconnected");
            sendServerMessage._socket = null;
        });

        socket.on('error', function() {
            log.errorr("sendServerMessage connection error");
            sendServerMessage._socket = null;
        });

        sendServerMessage._socket = socket;
    }
    sendServerMessage._socket.send(msg);
};
