var socketio = require('socket.io');

var DEBUG = false;

var CLIENT_PORT = 1338;
var SCREEN_PORT = 1339;

var screenSocket = null; // stores the currnetly connected screen, if any

var clientio = null;
var screenio = null; 

var connected = false;

var players = {};

getUserID = function(socket, data) {
    /*
    for (var method in socket) {
        if (typeof socket[method] == 'function') {
            console.log("METHOD" + method);
        }
        else {
            console.log(typeof socket[method] + " -- " + method);
        }
    }
    */

    console.log(data);
    
    return data.userID;
}

//helper function fo open new socketio
createSocketIO = function(port) {
    if (DEBUG) { console.log("   info  - socket.io listening on port " + port); }

    // TODO tweak for spead!
    return socketio.listen(port, {
        'log level': ( DEBUG ? 1 : 0 ),
           'log colors': false,
           'close timeout': 20,
           'browser client': false
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
        connected = true;
        screenSocket = socket;

        socket.on('connectionOK', function(userID) {
            if (DEBUG) { console.log("   info  - screen connected to userID " + userID); }
            players[userID].emit('connectionOK', userID);
        });

        socket.on('gameJoined', function(userID) {
            if (DEBUG) { console.log("   info  - player entering game with userID " + userID); }
            players[userID].emit('gameJoined', userID);
        });

        socket.on('disconnect', function() {
            //screenScoket = null;
            if (DEBUG) { console.log("   info  - screen disconnected"); }
            connected = false;
        });
    });

    /*
     * CLIENT EVENT HANDLERS
     */

    //start message dispatch on client connect
    clientio.sockets.on('connection', function(socket) {

        if (! connected) {
            if (DEBUG) { console.log("   info  - unable to connect, no screen yet!"); }
            socket.disconnect();
        }
        else {
            if (DEBUG) { console.log("   info  - negoatiating client connection"); }

            socket.emit('getConnectionInfo', null);
            socket.on('returnConnectionInfo', function(data) {
                var userID = getUserID(socket, data);
                players[userID] = socket;
                screenSocket.emit('connectPlayer', userID);
                if (DEBUG) { console.log("   info  - client connected with userID " + userID); }
            });

            socket.on('disconnect', function() {
                if (DEBUG) { console.log("   info  - lost connection user"); }
            });

            socket.on('joinGame', function(userID) {
                if (DEBUG) { console.log("   info  - screenSocket joinGame " + userID); }
                screenSocket.emit('joinGame', userID);
            });

            socket.on('message', function(data) {
                if (!connected) {
                    console.log("   error -NO SCREEN CONNECTED");
                    // maybe do something more usefull at some point?
                    return;
                }

                if (DEBUG) { console.log("   debug - transmittin message to screen: " + data); }
                screenSocket.emit('message', data);
            });

            socket.on('position', function(data) {
                if (!connected) {
                    console.log("   error -NO SCREEN CONNECTED");
                    // maybe do something more usefull at some point?
                    return;
                }

                screenSocket.emit('position', data);
            });
        }
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

