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
        this.lastSwipe = null;
        this.startCoords = null;
        this.previousDirection = null;
        this.posChangeMul = 0.01;
        this.currentDirection = null;
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
        this.lastSwipe = [position, sincePrevious];
        log.info("Pushed swipe: (" + position[0] + ", " + position[1] + ")" + ", " + sincePrevious);
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
        if (this.lastSwipe != null) {
            var coords = this.lastSwipe[0];
            //Swipe start
            if (this.lastSwipe[1] == 0) {
                this.startCoords = coords;
                this.previousDirection = null;
                this.calcNewPosition();
            }
            else {       
                if (this.startCoords != null) {
                    this.calcNewDirection(this.startCoords, coords);
                }
                else {
                    this.calcNewDirection([this.x, this.y], coords);
                }
            }
        }
        else {
            this.calcNewPosition();
        }
}

Player.prototype.calcNewPosition = function () {
        if (this.currentDirection != null) {
            this.setPosition([this.x + this.currentDirection.x*this.posChangeMul, this.y + this.currentDirection.y*this.posChangeMul]);       
        }
}

Player.prototype.calcNewDirection = function(beginning, end) {
        var startPos = new Vector2(beginning[0], beginning[1]);
        var endPos = new Vector2(end[0], end[1]);
        var sub = endPos.sub(startPos);
        var newVec = sub.add(startPos);
        
        newVec = this.changeOriginToCrosshair(newVec);
        
        if (this.previousDirection == null) {
            this.previousDirection = newVec;
            this.currentDirection = newVec;
        }
        else {
            this.previousDirection = newVec;
            this.currentDirection = newVec;
            this.setPosition([this.x + newVec.x * this.posChangeMul, this.y + newVec.x * this.posChangeMul]);
            log.info("Vector: (" + newVec.x + ", " + newVec.y + ")");
        }
    
        this.lastSwipe = null;
}

Player.prototype.changeOriginToCrosshair = function(vector) {
        return new Vector2(vector.x - this.x, vector.y - this.y);
        
}