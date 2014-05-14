window.onload = function() { 
	var socket = io.connect('http://localhost:1338');
	socket.on('new', function (data) {
			console.log(data);
			socket.emit('my own event', { my: 'data' });
			});
};

