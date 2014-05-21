function ControllerHub() {
	this.hostname = location.hostname;
	this.port = SCREEN_PORT;

	this.socket = null;
	this.onMessage = function() {};
	this.onPosition = function() {};
	this.onJoinPlayer = function() {};

	this.players = {};
}


ControllerHub.prototype.open = function(callback) {
    var that = this;
	var url = 'http://' + this.hostname + ":" + this.port;
	log.info("connecting to " + url);
	this.socket = io.connect(url);

	var players = this.players;

	this.socket.on('connection', function() {
	});

	/*
	this.socket.on('addPlayer', function(userID) {
		socket.emit('userID', userID);
	});
	*/

	var socket = this.socket;
	this.socket.on('connectPlayer', function(userID) {
		//log.info("registering player " + userID);
		//that.players[userID] = new Player(userID);

        that.addNewPlayer(userID);
		//that.onJoinPlayer(players[userID]);

		socket.emit('connectionOK', userID);
		log.debug("Connected player with userID " + userID);
	});

    this.socket.on('joinGame', function(userID) {
        that.players[userID].setGameOn(true);
        socket.emit('gameJoined', userID);
    });

    this.socket.on('message', function(data) { that.onMessage(data); });
    this.socket.on('position', function(data) { 
        that.movePlayer(data); 
    });
    this.socket.on('swipe', function(data) { 
        that.moveSwipe(data); 
    });

	/*
	this.socket.on('joinGame', function(data) {
		socket.emit('joinGame', true);
	});
	*/
}

ControllerHub.prototype.addNewPlayer = function(userID) {
    log.info("registering player " + userID);
    this.players[userID] = playerFactory.getPlayer(userID);
    this.onJoinPlayer(this.players[userID]);
    return true;
}

ControllerHub.prototype.movePlayer = function(data) {
    var userID = data[0];
    var sequence = data[1];
    var position = data[2];

    log.debug(userID + " setPosition " + position[0] + "x" + position[1]);

    this.socket.emit('positionReturn', [userID, sequence]);
    this.players[userID].setPosition(position);
}

ControllerHub.prototype.moveSwipe = function(data) {
    var userID = data[0];
    var swipeData = data[1];
    var position = [swipeData[0], swipeData[1]];
    var sincePrevious = swipeData[2];
    
    log.debug(userID + "swipe position: (" + position[0] + ", " + position[1] + "), Time since previous: " + sincePrevious + "ms");
    
    this.players[userID].pushSwipe(position, sincePrevious);
}

ControllerHub.prototype.setOnMessage = function(callback) {
    this.onMessage = callback;
}

ControllerHub.prototype.setOnJoinPlayer = function(callback) {
    this.onJoinPlayer = callback;
}
