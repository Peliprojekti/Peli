var game = game || {};
//game.controller = game.controller || {};

/**
 * This is the default controller factory, a specific game
 * could/and should define it's own factory if less/differing
 * functionality is needed
 */
game.controller = {
    create: function(rpc) {
        var controller = new game.Controller();

        rpc.exposeRpcMethod('position', controller, controller.setPosition);
        rpc.exposeRpcMethod('swipe', controller, controller.pushSwipe);
        rpc.exposeRpcMethod('moveSwipe', controller, controller.pushSwipe);
        rpc.exposeRpcMethod('orientation', controller, controller.orientation);

        return controller;
    },
};

game.Controller = function() {};

game.Controller.prototype.setPlayer = function(player, controllerType) {
    console.debug("controller setting player", player, controllerType);
    this.reset();
    this.player = player;
    this.controllerType = controllerType;

    this.setControlTypeUpdater();
};

game.Controller.prototype.clearPlayer = function() {
    var oldPlayer = this.player;
    this.reset();
    this.player = null;

    oldPlayer.setOnUpdate(null);
    return oldPlayer;
};

/*
 * This will be called on player change or controller style change
 */
game.Controller.prototype.reset = function() {
    this.x = 0.5;
    this.y = 0.5;
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
};

/*
 * Sets needed update callback for player, will be called
 * once per frame (or whenever Player.update() is called)
 */
game.Controller.prototype.setControlTypeUpdater = function() {

    if (this.controllerType == 'swipe') { /* SWIPE */
        var self = this;

        this.player.setOnUpdate(function(time) {
            if (self.lastSwipe !== null) {
                var coords = self.lastSwipe[0];
                //Swipe start
                if (self.lastSwipe[1] === 0) {
                    self.startCoords = coords;
                    //self.previousDirection = null;
                    self.previousTime = 0;
                    self.calcNewPosition(time);
                } else {
                    self.calcNewDirection(self.startCoords, coords);
                    self.startCoords = coords;
                }
            } 
            else {
                self.calcNewPosition(time);
            }

            self.player.setPosition(self.x, self.y);
        });
    }
};

game.Controller.prototype.setPosition = function(x, y) {
    //console.debug("setPosition ", x, y);
    this.player.setPosition(x,y);
};

game.Controller.prototype.pushSwipe = function(x,y, sincePrevious) {
    this.lastSwipe = [[x,y], sincePrevious];
    log.info("Pushed swipe: (" + x + ", " + y + ")" + ", " + sincePrevious);
};


game.Controller.prototype.calcNewPosition = function(timestamp) {
    if (this.currentDirection.length() > 0.001) {
        if (this.time <= 1) {
            var addition = 0;
            if (this.previousTime === 0) {
                addition = 0.01;
            } else {
                addition = (timestamp - this.previousTime) * 0.0001;
            }
            this.time += addition;
            this.previousTime = timestamp;
            var speedMultiplier = this.interpolator.interpolate(this.time);
            //log.debug(this.time + " " + speedMultiplier);
            this.currentDirection = this.currentDirection.mul(speedMultiplier);
            this.setPosition(
                    this.x + this.currentDirection.x * this.posChangeMul,
                    this.y + this.currentDirection.y * this.posChangeMul);
        }
    }
};

game.Controller.prototype.calcNewDirection = function(beginning, end) {
    //log.debug("BEGINNING: " + beginning[0] + ", " + beginning[1] + " END: " + end[0] + ", " + end[1]);
    var startPos = new Vector2(beginning[0], beginning[1]);
    var endPos = new Vector2(end[0], end[1]);
    var newVec = endPos.sub(startPos);

    if (this.previousDirection === null) {
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

        this.setPosition(newX, newY);
        //log.info("Vector: (" + newVec.x + ", " + newVec.y + ")");
    }

    this.lastSwipe = null;
};

game.Controller.prototype.orientation = function(tiltLR, tiltFB, dir) {
    log.debug("Orientation changed, new orientation:\n" +
        "tiltLR (gamma): " + tiltLR + "\n" +
        "tiltFB (beta): " + tiltFB + "\n" +
        "dir (alpha): " + dir);
};

