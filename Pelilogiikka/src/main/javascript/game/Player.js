var playerFactory = {
    players: {},

    getPlayer: function(userID, controller) {
        if (this.players[userID] === undefined || this.players[userID] === null) {
            this.players[userID] = new Player(userID, controller);
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

    //this.onUpdate = null;
    this.gameOn = false;
    this.x = 0.5;
    this.y = 0.5;

    this.responseTime = null;
    this.messagesPerSecond = 0;
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

Player.prototype.addResponseTime = function(time, msgs) {
    this.responseTime = time;
    this.messagesPerSecond = msgs;
};


Player.prototype.draw = function(ctx) {
    this.crosshair.draw(ctx, this.x, this.y);

    if (this.responseTime !== null) {
        ctx.save();
        ctx.font = 'bold 40pt Calibri';
        ctx.fillStyle = '#30BB30';
        ctx.strokeStyle = '#209020';
        ctx.fillText(this.messagesPerSecond, 45, this.y * ctx.canvas.height + 20);
        ctx.fillText(Math.floor(this.responseTime), 200, this.y * ctx.canvas.height + 20);
        ctx.restore();
    }
};

Player.prototype.update = function(time) {
    if (this.controller !== null) {
        this.controller.update(time);
    } else {
        console.debug("No controller!!!!!");
    }
    if (this.onUpdate !== null) {
        this.onUpdate(time);
    }
};

Player.prototype.setPosition = function(x, y) {
    if (x > 1 || x < 0 || y > 1 || y < 0) {
        throw new Error("setPosition recieved incorrect values " + x + "," + y);
    }
    //console.debug(this.userID, x, y);
    this.x = x;
    this.y = y;
};

Player.prototype.setCrosshair = function(crosshair) {
    this.crosshair = crosshair;
};
