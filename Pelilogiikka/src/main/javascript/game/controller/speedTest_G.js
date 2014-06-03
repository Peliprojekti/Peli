var controller = controller || {};

controller.loadedTypes = controller.loadedTypes || [];
controller.loadedTypes.speedTest = {
    freeControllers: [],

    getController: function(player, rpc) {
        return (this.freeControllers.length > 0 ?
                this.freeControllers.pop().reset(player, rpc) :
                new controller.SpeedTest(player, rpc)
               );
    },

    freeController: function(controller) {
        this.freeControllers.push(controller);
    }
};

    controller.SpeedTest = function(player, rpc) {
        this.reset(player, rpc);
    };

controller.SpeedTest.prototype.clear = function() {
    this.player = null;
};

controller.SpeedTest.prototype.reset = function(player, rpc) {
    this.player = player;
    rpc.exposeRpcMethod('position', this, this.position);
    return this;
};

controller.SpeedTest.prototype.update = function() {};

controller.SpeedTest.prototype.position = function(x,y) {
    this.player.setPosition(x,y);
};

controller.SpeedTest.prototype.shoot = function(x,y) {
    this.player.shoot();
};