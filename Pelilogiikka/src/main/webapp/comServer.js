var socketio = require('socket.io');
var url = require('url');

var DEBUG = false;

var CLIENT_PORT = 1338;
var SCREEN_PORT = 1339;
var BENCHMARK = false;
var BENCHMARK_INTERVAL = 1000;

var screenSocket = null; // stores the currnetly connected screen, if any

var clientio = null;
var screenio = null; 

var connected = false;

var players = {};

getUserID = function(socket, data) {
    var origin = data.hostname;

    if (origin = 'localhost') {
        // using client provided userID to keep same during session
        return data.userID;
    }
    else {
        return data.userID;
    }
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

requestBenchmarks = function() {
	for (var userID in players) {
		var socket = players[userID];
		socket.emit('requestBenchmark');
	}
}

startServer = function() {
    if (DEBUG) { console.log("   info  - comServer screen port is " + SCREEN_PORT + ", and client port is " + CLIENT_PORT); }
	if (BENCHMARK) {
		setInterval(requestBenchmarks, BENCHMARK_TIMEOUT);
	}

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

		socket.on('positionReturn', function(data) {
			var userID = data[0];
			var sequence = data[1];
            if (DEBUG) { console.log("   info  - positionReturn " + sequence + " for " + userID); }
			players[userID].emit('positionReturn', data[1]);
		});


        socket.on('disconnect', function() {
            //screenScoket = null;
            if (DEBUG || BENCHMARK) { console.log(Date.now() + " SCREEN DISCONNECTED"); }
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
				if (DEBUG || BENCHMARK) { console.log(Date.now() + " CLIENT DISCONNECTED"); }
            });

            socket.on('joinGame', function(userID) {
                if (DEBUG) { console.log("   info  - screenSocket joinGame " + userID); }
                screenSocket.emit('joinGame', userID);
            });

			socket.on('serverMsg', function(data) {
				if (DEBUG) {
					console.log('undefined: ' + JSON.stringify(data[1]));
				}
			});

			socket.on('benchmarkLog', function(data) {
				if (BENCHMARK || DEBUG) {
					data.forEach(function(line) {
						console.log(line[0] + " userID(" + line[1] + "), method(" + line[2] + "), " + line[3]);
					});
				}
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

			socket.on('swipe', function(data) {
				if (!connected) {
					console.log("   error -NO SCREEN CONNECTED");
					// maybe do something more usefull at some point?
					return;
				}

				screenSocket.emit('swipe', data);
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
		BENCHMARK = msgobj.value.benchmark;
		BENCHMARK_TIMEOUT = msgobj.value.benchmark_timeout;
		BENCHMARK_FILENAME = msgobj.value.benchmark_filename;

		if (DEBUG) { console.log("   info  - updated comServer configuration"); }
	}
	else {
		console.log("   error - recieving unrecognized message from parent process");
		// TODO handle error? send to parent?
	}

});

