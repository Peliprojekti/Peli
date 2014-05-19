
var screenComs {
	socket: null,
	onMessage: null,

	initConnection: function(host, port, protocol, persistent_, onMessage_) {
		socket = io.connect('http://' + host + ":" + port);
		onMessage = onMessage_;

		socket.on('message', onMessage);
	}
}

console.log("loaded screensoms");

/*
window.onload = function() { 
	var socket = io.connect('http://localhost:1339');

	logWindow = document.getElementById("logWindow");
	logWindow.innerHTML += ("logging initialized...<br />");

	socket.on('message', function(data) {
		console.log(data);
		logWindow.innerHTML = (data.xCoordinate + "<br />" + logWindow.innerHTML);
	});
};
*/

