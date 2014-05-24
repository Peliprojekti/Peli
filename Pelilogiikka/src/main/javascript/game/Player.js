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
    this.posChangeMul = 0.01;
    this.currentDirection = new Vector2(0, 0);
    this.interpolator = new Interpolator(1, 0);
    this.time = 0;
    this.previousTime = 0;
    this.tiltLR = null;
    this.tiltFB = null;
    this.dir = null;
}

Player.prototype.getID = function() {
    return this.userID;
};

Player.prototype.setOnChangeListener = function(func) {
    this.onChangeListener = func;
};

Player.prototype.setPosition = function(x, y) {
    if (x <= 1 && x >= 0 && y <= 1 && y >= 0) {
        this.x = x;
        this.y = y;
    }
    else {
        throw new Error("setPosition recieved incorrect values " + x + "," + y);
    }
};

Player.prototype.pushSwipe = function(position, sincePrevious) {
    this.lastSwipe = [position, sincePrevious];
    //log.info("Pushed swipe: (" + position[0] + ", " + position[1] + ")" + ", " + sincePrevious);
};

Player.prototype.orientation = function(tiltLR, tiltFB, dir) {
    log.debug("Orientation changed, new orientation:\n" +
        "tiltLR (gamma): " + tiltLR + "\n" +
        "tiltFB (beta): " + tiltFB + "\n" +
        "dir (alpha): " + dir);
};

Player.prototype.setCrosshair = function(crosshair) {
    this.crosshair = crosshair;
};

Player.prototype.draw = function(ctx) {
    this.crosshair.draw(ctx, this.x, this.y);
    if (this.tiltLR !== null) {
        // TODO tee jotin näillä arvoilla
    }
};

Player.prototype.setGameOn = function(gameOn) {
    this.gameOn = gameOn;
};

Player.prototype.update = function(time) {
    if (this.lastSwipe != null) {
        var coords = this.lastSwipe[0];
        //Swipe start
        if (this.lastSwipe[1] == 0) {
            this.startCoords = coords;
            //this.previousDirection = null;
            this.previousTime = 0;
            this.calcNewPosition(time);
        } else {
            this.calcNewDirection(this.startCoords, coords);
            this.startCoords = coords;
        }
    } else {
        this.calcNewPosition(time);
    }
};

Player.prototype.calcNewPosition = function(timestamp) {
    if (this.currentDirection.length() > 0.001) {
        if (this.time <= 1) {
            var addition = 0;
            if (this.previousTime == 0) {
                addition = 0.01;
            } else {
                addition = (timestamp - this.previousTime) * 0.0001;
            }
            this.time += addition;
            this.previousTime = timestamp;
            var speedMultiplier = this.interpolator.interpolate(this.time);
            log.debug(this.time + " " + speedMultiplier);
            this.currentDirection = this.currentDirection.mul(speedMultiplier);
            this.setPosition([this.x + this.currentDirection.x * this.posChangeMul, this.y + this.currentDirection.y * this.posChangeMul]);
        }
    }
};

Player.prototype.calcNewDirection = function(beginning, end) {
    //log.debug("BEGINNING: " + beginning[0] + ", " + beginning[1] + " END: " + end[0] + ", " + end[1]);
    var startPos = new Vector2(beginning[0], beginning[1]);
    var endPos = new Vector2(end[0], end[1]);
    var newVec = endPos.sub(startPos);

    if (this.previousDirection == null) {
        this.previousDirection = newVec;
        this.currentDirection = newVec;
        this.time = 0;
    } else {
        var newDirection = this.currentDirection.add(newVec);
        //log.debug("Current direction: (" + this.currentDirection.x + ", " + this.currentDirection.y + ")");
        //log.debug("newVec: (" + newVec.x + ", " + newVec.y + "), newDirection: (" + newDirection.x + ", " + newDirection.y + ")");
        this.previousDirection = newDirection;
        this.currentDirection = newDirection;
        this.time = 0;

        var newX = this.x + newVec.x * this.posChangeMul;
        var newY = this.y + newVec.x * this.posChangeMul;

        this.setPosition([newX, newY]);
        //log.info("Vector: (" + newVec.x + ", " + newVec.y + ")");
    }

    this.lastSwipe = null;
};
