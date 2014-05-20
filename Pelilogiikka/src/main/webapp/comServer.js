var socketio = require('socket.io');

var DEBUG = false;

var CLIENT_PORT = 1338;
var SCREEN_PORT = 1339;

var screenSocket = null; // stores the currnetly connected screen, if any

var clientio = null;
var screenio = null; 

var connected = false;

var players = {};

/*
 * Functions for server handling
 */

/*
function Screen() {
    this.connected = false;
    this.port = SCREEN_PORT;
    this.players = {};
}

Screen.prototype.connect = function() {
    var that = this; 

    screenio.sockets.on('connection', function(socket) {
        if (DEBUG) { console.log("   info  - screen connected"); }
        that.connected = false;
        //that.soscreenSocket = socket;

		socket.on('connectionOK', function(userID) {
			if (DEBUG) { console.log("   info  - forwarding userID to player"); }
            that.players[userID].emit('joinGame');
		});

		socket.on('diconnect', function() {
            this.connected = false;
			if (DEBUG) { console.log("   info  - screen disconnected"); }
		});

        // TODO handle disconnections?
    });
}

Screen.prototype.send = function(data) {
    if (this.connected) {

    }
    else {
        if (DEBUG) { console.log("   error  - screen disconnected"); }
    }
}
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
        connected = true;
        screenSocket = socket;

		socket.on('connectionOK', function(userID) {
			if (DEBUG) { console.log("   info  - player connected to userID " + userID); }
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

        // TODO handle disconnections?
    });

    /*
     * CLIENT EVENT HANDLERS
     */

    //start message dispatch on client connect
    clientio.sockets.on('connection', function(socket) {
        var userID = Math.floor(Math.random() * 10000000000);

        if (! connected) {
            if (DEBUG) { console.log("   info  - unable to connect, no screen yet!"); }
            socket.disconnect();
        }
        else {
            if (DEBUG) { console.log("   info  - client connected, setting userID to " + userID); }
            players[userID] = socket;
            screenSocket.emit('connectPlayer', userID);

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

                if (DEBUG) { console.log("   debug - updating position"); }
                screenSocket.emit('position', [userID, data]);
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

