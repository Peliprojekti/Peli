
window.onload = function() { 
	var startGameCallback = function(gameStarted, sessionToken) {
		window.alert("Start ok");

		firstButton = document.getElementById("firstButton");
		firstButton.count = 0;
		firstButton.onclick = function() {
			firstButton.count++;
			clientComs.send("firstButton pressed " + firstButton.count + " times");
		}

		secondButton = document.getElementById("secondButton");
		secondButton.count = 0;
		secondButton.onclick = function() {
			secondButton.count++;
			clientComs.send("secondButton pressed " + secondButton.count + " times");
		}
	};

	var connectionOkCallback = function(something, isOK) {
		window.alert("Connection ok");
		//clientComs.startGame(startGameCallback);
		startGameCallback(true, 1);
	};

	clientComs.initConnection('localhost', '1338', null, true, connectionOkCallback);
	window.alert("onload done");
};

var clientComs = {
	sessionToken: null,
	socket: null,
	persistent: true,
	onMessage: function(message) { log.error("recieving messages not implemented"); },
	onConnection: null,
	onGameStarted: null,

	initConnection: function(host, port, protocol, persistent_, callback) {
		this.socket = io.connect('http://localhost:1338');
		this.onConnection = callback;

		this.socket.on('open', function() {
			console.log("Connection opened");
			clientComs.onConnection(null, true);
		});

		this.socket.on('close', function() {
			console.log('Closing connection');

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

		this.socket.on('message', function(message) {
			clientComs.onMessage(message);
		});

		this.socket.on('gameStarted', function(data) {

		});
	},

		startGame: function(sessionToken) {
			this.sessionToken = sessionToken;
			// do some checks with server to make sure a game slot is available?
		},

		send: function(data) {
			this.socket.emit('message', data);
		}
};

/*
   var clientComs = {
   sessionToken: null,
   socket: null,
   persistent: true,
   onMessage: function(message) { log.error("recieving messages not implemented"); }

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
   clientComs.onMessage(message);
   });
   },

   startGame: function(sessionToken) {
   this.sessionToken = sessionToken;
// do some checks with server to make sure a game slot is available?
},

sendMessage: function(data) {
this.socket.emit()

}
};
*/

