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

function Player(userID, controller) {
    this.userID = userID;
    this.controller = controller;

    this.onUpdate = null;

    this.x = 0;
    this.y = 0;
}

Player.prototype.setOnUpdate = function(func) {
    this.onUpdate = func;
};

Player.prototype.getID = function() {
    return this.userID;
};

Player.prototype.setGameOn = function(gameOn) {
    log.error("is this even doing anything?");
    this.gameOn = gameOn;
};


Player.prototype.draw = function(ctx) {
    this.crosshair.draw(ctx, this.x, this.y);
};

Player.prototype.update = function(time) {
    if (this.onUpdate !== null) {
        this.onUpdate(time);
    }
};

Player.prototype.setPosition = function(x, y) {
    if (x > 1 && x < 0 && y > 1 && y < 0) {
        throw new Error("setPosition recieved incorrect values " + x + "," + y);
    }
    this.x = x;
    this.y = y;
};

Player.prototype.setCrosshair = function(crosshair) {
    this.crosshair = crosshair;
};
