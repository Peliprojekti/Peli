var player = function() {
};

var screenComs = {
	socket: null,
	onMessage: function() {},
    onPosition: function() {},

	initConnection: function(callback) {
		socket = io.connect('http://' + location.hostname + ":" + SCREEN_PORT);

        socket.on('connection', callback);

		socket.on('message', onMessage);

        socket.on('position', function(data) {
            screenComs.onPosition([data[0], data[1]]);
        });
	},

    setOnMessage: function(func) {
        onMessage = func;
    },

    setOnPosition: function(func) {
        screenComs.onPosition = func
    },

    setOnNewPlayer: function(func) {

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
