
window.onload = function() { 
	var socket = io.connect('http://localhost:1338');
	socket.on('new', function (data) {
			console.log(data);
			socket.emit('my own event', { my: 'data' });
			});

	firstButton = document.getElementById("firstButton");
	firstButton.count = 0;
	firstButton.onclick = function() {
		firstButton.count++;
		socket.emit("firstButton", { count: firstButton.count });
	}

	secondButton = document.getElementById("secondButton");
	secondButton.count = 0;
	secondButton.onclick = function() {
		secondButton.count++;
		socket.emit("secondButton", { count: secondButton.count });
	}
};


var clientComs = {
    sessionToken: null,
    socket: null,
    persistent: true,

    initConnection: function(host, port, protocol, persistent_, callback) {
        this.persistent = persistent; 

        hostString = host + ":" + port + "/" + protocol;
        log.info ("connecting to: " + hostStinrg);

        this.socket({host: host, port: port},{transports:['websocket','polling']});

        this.socket.on('open', function() {
            callback(null, true);
        });

        this.socket.on('close', function() {
            log.info('Closing connection');

            if (typeof closeEventCallback == 'function') {
                closeEventCallback(true);
                closeEventCallback(null);
            }

            callbacks = new Object();
            rpcMethods = new Object();
        });

        this.socket.on('error', function() {
            self.close();

            if (typeof callback == 'function') {
                callback({"code": E_NO_CONNECTION_CODE, "message": E_NO_CONNECTION + host + ":" + port + ", protocol: " +  protocol}, null);
            }
        });

        socket.on('message', function(message) {
            onMessage(message);
        });
    },

    startGame: function(sessionToken) {
        this.sessionToken = sessionToken;
        // do some checks with server to make sure a game slot is available?
    },

    sendMessage: function(data) {

    }
};
