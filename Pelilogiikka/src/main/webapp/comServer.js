var socketio = require('socket.io');

var DEBUG = false;

var CLIENT_PORT = 1338;
var SCREEN_PORT = 1339;

var screenSocket = null; // stores the currnetly connected screen, if any

var clientio = null;
var screenio = null; 

/*
 * Functions for server handling
 */


//helper function fo open new socketio
createSocketIO = function(port) {
    if (DEBUG) { console.log("   info  - socket.io listening on port " + port); }

    // TODO tweak for spead!
    return socketio.listen(port, {
        'log level': ( DEBUG ? 3 : 0 )
    });
}

closeSocketIO = function(socket) {
    if (socket != null) {
        socket.server.close();
    }
}

closeServer = function() {
    closeSocketIO(clientio);
    closeSocketIO(screenio);
}

startServer = function() {
    if (DEBUG) { console.log("   info  - comServer screen port is " + SCREEN_PORT + ", and client port is " + CLIENT_PORT); }
    clientio = createSocketIO(CLIENT_PORT);
    screenio = createSocketIO(SCREEN_PORT);

    /*
     * SCREEN EVENT HANDLERS
     */

    //save opened screen connection for future use
    screenio.sockets.on('connection', function(socket) {
        if (DEBUG) { console.log("   info  - screen connected"); }
        screenSocket = socket;

        // TODO handle disconnections?
    });

    /*
     * CLIENT EVENT HANDLERS
     */

    //start message dispatch on client connect
    clientio.sockets.on('connection', function(socket) {
        if (DEBUG) { console.log("   info  - client connected"); }

        socket.emit('open', null);

        socket.on('message', function(data) {
            if (screenSocket == null) {
                console.log("   error -NO SCREEN CONNECTED");
                // maybe do something more usefull at some point?
                return;
            }

			if (DEBUG) { console.log("   debug - screen connected"); }
            screenSocket.emit('message', data);
        });
    });
}

/*
 * SERVER COMMANDS
 */

process.on('message', function(msgobj) {
    if (msgobj.type == 'debug') {
        DEBUG = msgobj.value;
    }
    else if (msgobj.type == 'startServer') {
        if (DEBUG) { console.log("   info  - firing up comServer"); }
        startServer();
    }
    else if (msgobj.type == 'shutdown') {
        if (DEBUG) { console.log("   info  - shutting down"); }
        closeServer();
        process.exit(0);
    }
    else if (msgobj.type == 'closeServer') {
        if (DEBUG) { console.log("   info  - comServer shuting down"); }
        // TODO
    }
    else if (msgobj.type == 'config') {
        // TODO check values, error handling
        CLIENT_PORT = msgobj.value.client_port;
        SCREEN_PORT = msgobj.value.screen_port;
        DEBUG = msgobj.value.debug;

        if (DEBUG) { console.log("   info  - updated comServer configuration"); }
    }
    else {
        console.log("   error - recieving unrecognized message from parent process");
        // TODO handle error? send to parent?
    }
});

