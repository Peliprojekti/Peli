function Player(userID) {
	this.userID = userID;
}

Player.prototype.getID = function() {
	return this.userID
}
