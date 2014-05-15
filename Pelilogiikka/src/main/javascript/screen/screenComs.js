
window.onload = function() { 
	var socket = io.connect('http://localhost:1339');

	logWindow = document.getElementById("logWindow");
	logWindow.innerHTML += ("logging initialized...<br />");

	socket.on('message', function(data) {
		console.log(data);
		logWindow.innerHTML = (data + "<br />" + logWindow.innerHTML);
	});
};

