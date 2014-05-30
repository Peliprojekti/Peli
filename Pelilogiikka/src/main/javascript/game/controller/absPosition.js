var controller = controller || {};

controller.loadedTypes = controller.loadedTypes || [];
controller.loadedTypes['absPosition'] = {
    freeControllers: [],

    getController: function(player, rpc) {
        return (this.freeControllers.length > 0 ?
                this.freeControllers.pop().reset(player, rpc) :
                new controller.AbsPosition(player, rpc)
               );
    },

    freeController: function(controller) {
        //controller.absPosition.freeControllers.push(controller);
    }
};

    controller.AbsPosition = function(player, rpc) {
        this.reset(player, rpc);
    };

controller.AbsPosition.prototype.clear = function() {
    this.player = null;
};

controller.AbsPosition.prototype.reset = function(player, rpc) {
    this.player = player;
    rpc.exposeRpcMethod('position', this, this.position);
    rpc.exposeRpcMethod('shoot', this, this.shoot);
};

controller.AbsPosition.prototype.update = function() {};

controller.AbsPosition.prototype.position = function(x,y) {
    this.player.setPosition(x,y);
};

controller.AbsPosition.prototype.shoot = function(x,y) {
    this.player.shoot();
};