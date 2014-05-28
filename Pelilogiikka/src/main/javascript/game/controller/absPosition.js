var controller = controller || {};

controller.absPosition = {
    freeControllers: [],

    getController: function(player, rpc) {
        return (controller.absPosition.freeControllers.length > 0 ?
                controller.absPosition.freeControllers.pop().reset(player, rpc) :
                new controller.absPosition.AbsPosition(player, rpc)
               );
    },

    freeController: function(controller) {
        //controller.absPosition.freeControllers.push(controller);
    },

    AbsPosition: function(player, rpc) {
        this.reset(player, rpc);
    },
};


controller.absPosition.AbsPosition.prototype.clear = function() {
    this.player = null;
};

controller.absPosition.AbsPosition.prototype.reset = function(player, rpc) {
    this.player = player;
    rpc.exposeRpcMethod('position', this, this.position);
};

controller.absPosition.AbsPosition.prototype.update = function() {};

controller.absPosition.AbsPosition.prototype.position = function(x,y) {
    this.player.setPosition(x,y);
};

$(document).ready(function() {
    game.controllerHub.registerController('absPosition', controller.absPosition);
});
