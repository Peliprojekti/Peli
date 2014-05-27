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

        rpc.exposeRpcMethod('playerPerformanceReport', controller, controller.playerPerformanceReport);

        rpc.exposeRpcMethod('position', controller, controller.setPosition);
        rpc.exposeRpcMethod('swipe', controller, controller.pushSwipe);
        rpc.exposeRpcMethod('moveSwipe', controller, controller.pushSwipe);
        rpc.exposeRpcMethod('orientation', controller, controller.orientation);
        rpc.exposeRpcMethod('motion', controller, controller.motion);

        return controller;
    },
};

game.Controller = function() {
};

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
    
    this.speed = 0.1;
};

game.Controller.prototype.playerPerformanceReport = function(data) {
    if (data.length > 0) {
    var count = 0;
    var totalTime = 0;

    data.forEach(function(d) {
        count++;
        totalTime += (d[1] - d[0]);
    });

        console.debug(totalTime/count);
        this.player.addResponseTime(totalTime/count, count);
    }
    else {
        this.player.addResponseTime(0, 0);
    }
};

game.Controller.prototype.update = function(time) {
    
    if (this.lastSwipe != null) {
        //console.debug("Controller update");
        var coords = this.lastSwipe[0];
        //Swipe start
        if (this.lastSwipe[1] == 0) {
            this.startCoords = coords;
            //this.previousDirection = null;
            this.previousTime = 0;
            this.calcNewPosition(time);
        }
        else {    
            if (this.startCoords != null) {
                this.calcNewDirection(this.startCoords, coords);
            }
            this.startCoords = coords;
        }
    }
    else {
        this.calcNewPosition(time);
    }
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
    
        this.x = x;
        this.y = y;
        this.player.setPosition(x, y);
};

game.Controller.prototype.pushSwipe = function(x, y, sincePrevious) {
    this.lastSwipe = [[x, y], sincePrevious];
    //log.info("Pushed swipe: (" + x + ", " + y + ")" + ", " + sincePrevious);
};

game.Controller.prototype.setPositionSwipe = function(x, y) {
        if (!(x > 1 || x < 0)) {
            this.x = x;
        }
        if (!(y > 1 || y < 0)) {
            this.y = y;
        }
        
        this.setPosition(this.x, this.y);
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
            var newX = this.x + this.currentDirection.x * this.posChangeMul;
            var newY = this.y + this.currentDirection.y * this.posChangeMul;
            this.setPositionSwipe(
                    newX,
                    newY);
            //console.debug("New pos: (" + newX + ", " + newY + ")");
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

        this.setPositionSwipe(newX, newY);
        //log.info("Vector: (" + newVec.x + ", " + newVec.y + ")");
        //console.debug("New position: " + newX + ", " + newY + ")");
    }

    this.lastSwipe = null;
};

game.Controller.prototype.orientation = function(tiltLR, tiltFB, dir) {
    
    var xPos = 0;
    
    if(dir <= 90.0 )
    {
       var rads  = (dir*Math.PI)     / 180.0;
           xPos  = -Math.sin( rads ) / 2.0;
    }
    else if(dir >= 270.0 )
    {
       var rads  = ((360-dir)*Math.PI) / 180.0;
           xPos  =   Math.sin( rads )  / 2.0;
    }
    
       this.setPosition( 0.5+xPos, this.y);
    
//    if(dir < 180){
//        this.setPosition(this.x - this.speed, this.y);
//        
//        // move left
//    }else{
//        this.setPosition(this.x + this.speed, this.y);
//        //move right
//    }
    
    log.debug("pos: (" +this.x + ", " + this.y + ")\n" + 
            "dir: " + dir);
//    log.debug("Orientation changed, new orientation:\n" +
//            "tiltLR (gamma): " + tiltLR + "\n" +
//            "tiltFB (beta): " + tiltFB + "\n" +
//            "dir (alpha): " + dir);
};

game.Controller.prototype.motion = function(accelerationData) {
    var acceleration = accelerationData.acceleration;
    var accelerationIncludingGravity = accelerationData.accelerationIncludingGravity;
    var rotation = accelerationData.rotationRate;
    log.info("Acceleration: \n" +
            "x: " + acceleration.x + "\n" +
            "y: " + acceleration.y + "\n" +
            "z: " + acceleration.z + "\n" +
            "Acceleration including gravity \n" +
            "x: " + accelerationIncludingGravity.x + "\n" +
            "y: " + accelerationIncludingGravity.y + "\n" +
            "z: " + accelerationIncludingGravity.z + "\n" +
            "Rotation:\n" +
            "x: " + rotation.x + "\n" +
            "y: " + rotation.y + "\n" +
            "z: " + rotation.z);
}

