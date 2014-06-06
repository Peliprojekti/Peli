var controller = controller || {};

controller.loadedTypes = controller.loadedTypes || [];
controller.loadedTypes['motionController'] = {
    freeControllers: [],
    getController: function (player, rpc) {
        // jos on vapaita niin antaa sellasen, muuten luo uuden
        return (this.freeControllers.length > 0 ?
            this.freeControllers.pop().reset(player, rpc) :
            new controller.MotionController(player, rpc)
            );
    },
    freeController: function (controller) {
        //controller.motionController.freeControllers.push(controller);
    }
};

controller.MotionController = function (player, rpc) {
    this.reset(player, rpc);
};

controller.MotionController.prototype.clear = function () {
    this.player = null;
};

controller.MotionController.prototype.reset = function (player, rpc) {
    this.player = player;
    this.x = player.x;
    this.y = player.y;
    this.tiltLR = 0;
    this.tiltFB = 0;
    this.multiplier = 0.0001;
    rpc.exposeRpcMethod('orientation', this, this.orientation);
    rpc.exposeRpcMethod('motion', this, this.motion);
    return this;
};

controller.MotionController.prototype.update = function () {    
    this.setPosition(this.x + this.tiltFB * this.multiplier, this.y + this.tiltLR * this.multiplier);
};

controller.MotionController.prototype.position = function (x, y) {
    this.player.setPosition(x, y);
};

controller.MotionController.prototype.setPosition = function (x, y) {
    //console.debug("setPosition ", x, y);
    if (x >= 0 && x <= 1) {
        this.x = x;
    }
    if (y >= 0 && y <= 1) {
        this.y = y;
    }
    this.player.setPosition(this.x, this.y);
};

controller.MotionController.prototype.orientation = function (tiltLR, tiltFB, dir) {
    //console.debug("orientation called");
    
    this.tiltLR = -tiltLR;
    this.tiltFB = tiltFB;



//    if(dir < 180){
//        this.setPosition(this.x - this.speed, this.y);
//        
//        // move left
//    }else{
//        this.setPosition(this.x + this.speed, this.y);
//        //move right
//    }

    //log.debug("pos: (" + this.x + ", " + this.y + ")\n" +
      //  "dir: " + dir);
//    log.debug("Orientation changed, new orientation:\n" +
//            "tiltLR (gamma): " + tiltLR + "\n" +
//            "tiltFB (beta): " + tiltFB + "\n" +
//            "dir (alpha): " + dir);
};

controller.MotionController.prototype.direction = function (tiltLR, tiltFB, dir) {
    var xPos = 0;
    var rads;
    if (dir <= 90.0)
    {
        rads = (dir * Math.PI) / 180.0;
        xPos = -Math.sin(rads) / 2.0;
    }
    else if (dir >= 270.0)
    {
        rads = ((360 - dir) * Math.PI) / 180.0;
        xPos = Math.sin(rads) / 2.0;
    }

    this.setPosition(0.5 + xPos, this.y);
}

controller.MotionController.prototype.motion = function (accelerationData) {
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

