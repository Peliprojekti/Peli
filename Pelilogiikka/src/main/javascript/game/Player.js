var playerFactory = {
	players: {},

	getPlayer: function(userID) {
		if (typeof this.players[userID] === 'undefined' ||
				this.players[userID] == null) {
					this.players[userID] = new Player(userID);
				}
		return this.players[userID];
	},

	removePlayer: function(userID) {
		// TODO
	}
};

function Player(userID) {
	this.userID = userID;
	this.onChangeListener = function() {};
	this.x = 0;
	this.y = 0;
	this.gameOn = false;
        this.swipes = new Array();
}

Player.prototype.getID = function() {
	return this.userID
}

Player.prototype.setOnChangeListener = function(func) {
	this.onChangeListener = func;
}

Player.prototype.setPosition = function(position) {
	this.x = position[0];
	this.y = position[1];
}

Player.prototype.pushSwipe = function(position, sincePrevious) {
        swipes.push([position, sincePrevious]);
}

Player.prototype.setCrosshair = function(crosshair) {
	this.crosshair = crosshair;
}

Player.prototype.draw = function(ctx) {
	this.crosshair.draw(ctx, this.x, this.y);
}

Player.prototype.setGameOn = function(gameOn) {
	this.gameOn = gameOn;
}

Player.prototype.update = function() {
    
}
