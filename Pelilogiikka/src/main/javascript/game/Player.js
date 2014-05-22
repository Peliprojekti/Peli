var playerFactory = {
    players: {},

    getPlayer: function(userID) {
        if (this.players[userID] === undefined || this.players[userID] === null) {
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
}

Player.prototype.getID = function() {
    return this.userID;
};

Player.prototype.setOnChangeListener = function(func) {
    this.onChangeListener = func;
};

Player.prototype.setPosition = function(position) {
    this.x = position[0];
    this.y = position[1];
};

Player.prototype.pushSwipe = function(position, sincePrevious) {
    this.lastSwipe = [position, sincePrevious];
    log.info("Pushed swipe: (" + position[0] + ", " + position[1] + ")" + ", " + sincePrevious);
};

Player.prototype.setCrosshair = function(crosshair) {
    this.crosshair = crosshair;
};

Player.prototype.draw = function(ctx) {
    this.crosshair.draw(ctx, this.x, this.y);
};

Player.prototype.setGameOn = function(gameOn) {
    this.gameOn = gameOn;
};

Player.prototype.update = function() {
    if (this.lastSwipe !== null) {
        var coords = this.lastSwipe[0];
        //Swipe start
        if (this.lastSwipe[1] === 0) {
            this.startCoords = coords;
            this.previousDirection = null;
        } else {
            if (this.startCoords !== null) {
                this.calcNewDirection(this.startCoords, coords);
            } else {
                this.calcNewDirection([this.x, this.y], coords);
            }
        }
    } else {
        this.calcNewPosition();
    }
};

Player.prototype.calcNewPosition = function() {

};

Player.prototype.calcNewDirection = function(beginning, end) {
    var startPos = new Vector2(beginning[0], beginning[1]);
    var endPos = new Vector2(end[0], end[1]);
    var sub = endPos.sub(startPos);
    var newVec = sub.add(startPos);

    if (this.previousDirection === null) {
        this.previousDirection = newVec;
    } else {
        this.setPosition(end);
    }

    this.lastSwipe = null;
};
