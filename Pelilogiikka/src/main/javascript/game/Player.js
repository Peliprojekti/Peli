function Player(userID) {
    this.userID = userID;
    this.gameOn = false;
    this.bullets = [];
    this.x = 0.5;
    this.y = 0.5;
    this.crossh = null;
    this.onSetPosition = null;

    this.responseTime = null;
    this.messagesPerSecond = 0;
}

Player.prototype.getID = function() {
    return this.userID;
};

Player.prototype.setOnShoot = function(onShoot) {
    "use strict";
    this.onShoot = onShoot;
};

Player.prototype.setOnPosition = function(setPosition) {
    "use strict";
    this.onSetPosition = setPosition;
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
    this.crossh.draw(ctx, this.x, this.y);

    this.bullets.forEach(function(b) {
        b.draw(ctx);
    });

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

Player.prototype.update = function(time) {};

Player.prototype.shoot = function() {
    this.onShoot(this.x, this.y);
};

Player.prototype.setPosition = function(x, y) {
    if (x > 1 || x < 0 || y > 1 || y < 0) {
        throw new Error("setPosition recieved incorrect values " + x + "," + y);
    }
    if (this.onSetPosition !== null) {
        this.onSetPosition(x,y);
    }
    else {
        this.x = x;
        this.y = y;
    }
};

Player.prototype.setCrosshair = function(crosshair) {
    this.crossh = crosshair;
};
