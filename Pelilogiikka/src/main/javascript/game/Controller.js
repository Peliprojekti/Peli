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
    loadedControllers: {
        
    },
    registerController: function(name, controllerObject) {
        game.controller.loadedControllers[name] = controllerObject;
    }
};

game.Controller = function() {

};

game.Controller.prototype.setPlayer = function(player, controllerType) {
    console.debug("controller setting player", player, controllerType);
    this.player = player;
    this.controllerType = controllerType;
    
    this.loadController(controllerType);
};

game.Controller.prototype.loadController = function(controllerType) {
    this.controllerImplementation = null;
    if(game.controller.loadedControllers[controllerType]){
        this.controllerImplementation = game.controller.loadedControllers[controllerType](this.player);
    }
    
};

game.Controller.prototype.clearPlayer = function() {
    var oldPlayer = this.player;
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

    throw new Error("wrong reset function!");
    this.tiltLR = null;
    this.tiltFB = null;
    this.dir = null;

    this.speed = 0.1;
};

game.Controller.prototype.pushSwipe = function(x,y,sincePrev) {
    console.debug("pushSwipe", x, y, sincePrev);
    this.controllerImplementation.pushSwipe(x,y,sincePrev);
};

game.Controller.prototype.playerPerformanceReport = function(data) {
    if (data.length > 0) {
        var count = 0;
        var totalTime = 0;

        data.forEach(function(d) {
            count++;
            totalTime += (d[1] - d[0]);
        });

        console.debug(totalTime / count);
        this.player.addResponseTime(totalTime / count, count);
    }
    else {
        this.player.addResponseTime(0, 0);
    }
};

game.Controller.prototype.update = function(time) {
    this.controllerImplementation.update(time);
};


game.Controller.prototype.setPosition = function(x, y) {
    //console.debug("setPosition ", x, y);
    this.x = x;
    this.y = y;
    if (this.controllerImplementation !== null) {
        this.controllerImplementation.setPosition(x,y);
        
    } else {
        this.player.setPosition(x, y);
    }
    
};

game.Controller.prototype.orientation = function(tiltLR, tiltFB, dir) {


    var xPos = 0;

    if (dir <= 90.0)
    {
        var rads = (dir * Math.PI) / 180.0;
        xPos = -Math.sin(rads) / 2.0;
    }
    else if (dir >= 270.0)
    {
        var rads = ((360 - dir) * Math.PI) / 180.0;
        xPos = Math.sin(rads) / 2.0;
    }

    this.setPosition(0.5 + xPos, this.y);

//    if(dir < 180){
//        this.setPosition(this.x - this.speed, this.y);
//        
//        // move left
//    }else{
//        this.setPosition(this.x + this.speed, this.y);
//        //move right
//    }

    log.debug("pos: (" + this.x + ", " + this.y + ")\n" +
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
};

