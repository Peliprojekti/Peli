function Player(userID) {
	this.userID = userID;
	this.onChangeListener = function() {};
	this.x = 0;
	this.y = 0;
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

Player.prototype.setCrosshair = function(crosshair) {
	this.crosshair = crosshair;
}

Player.prototype.draw = funnction(ctx) {
	this.crosshair.draw();
}
