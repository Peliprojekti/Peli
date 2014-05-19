
var COM_PORT = 1339;
var logWindow = null;

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
