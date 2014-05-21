function ControllerComs() {
    log.debug("Creating new Controllercoms object");
	this.hostname = location.hostname;
	this.port = CLIENT_PORT;
	this.userID = 0;
	this.socket = null;
    this.dummyMode = false;
    this.userID = Math.floor(Math.random() * 10000000000);

    //this.onConnection = function() { };
	this.onMessage = function(msg) {
		log.info("got message: " + msg);
	};

	this.onJoinGame = null;
}

ControllerComs.prototype.setDummyMode = function(dummyMode) {
	this.dummyMode = dummyMode;
}

ControllerComs.prototype.serverMsg = function(msg) {
	this.socket.emit('serverMsg', [(typeof userID === 'undefined' ? 'new user' : userID), msg]);
}

ControllerComs.prototype.open = function(callback) {
    var that = this;
	this.onConnection = callback;

	var url = 'http://' + this.hostname + ":" + this.port;
	log.debug('connecting client to ' + url);
	this.socket = io.connect(url);

	this.socket.on('disconnect', function() {
		log.info("Connection closed for " + that.userID);
	});

    var suggestUserID = this.userID;
    this.socket.on('getConnectionInfo', function() {
        log.info("negotiating connection");
        that.socket.emit('returnConnectionInfo', {
            hostname: location.hostname,
            userID: suggestUserID
        });
    });

    this.socket.on('connectionOK', function(userID) {
        log.info("Got userID: " + userID);
		coms.serverMsg("testing server messagers");
        that.userID = userID;
        callback(userID);
        //that.onConnection(userID);
    });

    this.socket.on('gameJoined', function() {
        log.info("Starting game!");
        that.onJoinGame();
    });

    //this.socket.on('message', this.onMessage);

    this.socket.on('error', function(data) {
        log.error("Connection error");
    });
}

ControllerComs.prototype.close = function(callback) {
    log.warn("ControllreComs.close not implemented");
}

/*
   ControllerComs.prototype.setOnMessage = function(func) {
   this.onMessage = func;
   }

   ControllerComs.prototype.setOnGameStarted = function(func) {
   this.onGameStarted = func;
   }
   */

ControllerComs.prototype.joinGame = function(callback) {
    this.onJoinGame = callback;
    this.socket.emit('joinGame', this.userID);
}

ControllerComs.prototype.position = function(x, y) {
    if (this.socket == null) {
        if (this.dummyMode != true) {
            log.error("trying to use unopened socket");
        }
        else {
            log.debug("socket not open, but dummyMode is enable");
        }
    }
    else {
        log.debug("sending position");
        this.socket.emit('position', [this.userID, [x, y]]);
    }
}


