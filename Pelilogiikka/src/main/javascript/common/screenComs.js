var player = function() {
};

var screenComs = {
	socket: null,
	onMessage: function() {},
    onPosition: function() {},
	onNewPlayer: function() {},
	playerCount: 0,
	maxPlayers: 3,

	initConnection: function(callback) {
		socket = io.connect('http://' + location.hostname + ":" + SCREEN_PORT);

        socket.on('connection', function() {
			var userID = Math.floor(Math.random() * (max - min + 1)) + min;
			socket.emit('userID', userID);
		});

		socket.on('message', screenComs.onMessage);

        socket.on('position', function(data) {
			log.debug("recieved new position");
			// position
            screenComs.onPosition([data[0], data[1]]);
        });

		socket.on('joinGame', function(data) {
			socket.emit('joinGame', true);
		});
	},

    setOnMessage: function(func) {
        screenComs.onMessage = func;
    },

    setOnPosition: function(func) {
        screenComs.onPosition = func
    },

    setOnNewPlayer: function(func) {
		screenComs.onNewPlayer = func;
    }
};



/*

var COM_PORT = 1339;
var logWindow = null;
//var screenComs = null;

window.onload = function() { 
	console.log('starting loading');
	logWindow = document.getElementById("logWindow");

	screenComs.initConnection(location.hostname, COM_PORT, null, true, function() {
		onMessage('connection established');
	});
}

function onMessage(data) {
	console.log(data);
	logWindow.innerHTML = (data.toString() + "<br />" + logWindow.innerHTML);
}
*/
