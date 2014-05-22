/**
 * ControllerHub
 * @constructor
 * @param {function} onJoinPlyaer
 * @param {number} maxPlayers
 */
function ControllerHub(onJoinPlayer, maxPlayers) {
    var that = this;

    this.onJoinPlayer = onJoinPlayer;
    this.maxPlayers = (typeof maxPlayers == 'undefined' ? 100 : maxPlayers);
    this.playersConnected = 0;

    this.freeControllers = [];
}

ControllerHub.prototype.setOnJoinPlayer = function(callback) {
	this.onJoinPalyer = callback;
}


/**
 * Used to initially open the connections
 * @param {function} callback - will be called when connection opened
 */
ControllerHub.prototype.open = function(callback) {
	var that = this;
	var controller = new Controller(function() {
		//onConnect
		//
	}, function() {
		//onDisconnect
		//
	});

	controller.open(function() {
		that.freeControllers.push(controller);
	});
}

ControllerHub.prototype.joinGame = function(controller, userID) {
	controller.player = playerFactory.getPlayer(userID);
}

/**
 * close connection
 */
ControllerHub.prototype.close = function() {
	// disconnect controllers
}
