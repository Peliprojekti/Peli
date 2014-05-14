
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

