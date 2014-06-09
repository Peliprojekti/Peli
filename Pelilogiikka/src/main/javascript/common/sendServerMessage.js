/**
 * Sends messages to server
 */
sendServerMessage = function (msg) {
    if (sendServerMessage._socket === undefined || sendServerMessage._socket === null) {
        var socket = eio.Socket(
            {host: location.hostname, port: 1340}, // TODO hardcoded port here!
        {transports: ['websocket', 'polling']});
        
        socket.on('close', function () {
            console.warn("sendServerMessage disconnected");
            sendServerMessage._socket = null;
        });
        
        socket.on('error', function () {
            console.error("sendServerMessage connection error");
            sendServerMessage._socket = null;
        });
        
        sendServerMessage._socket = socket;
    }
    
    console.info("serverMessage: ", msg);
    sendServerMessage._socket.send(msg);
};
