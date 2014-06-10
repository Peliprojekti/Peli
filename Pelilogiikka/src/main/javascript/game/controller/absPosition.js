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
        this.freeControllers.push(controller);
    }
};

/**
 * 
 * @param {type} player
 * @param {type} rpc
 * @returns {undefined}
 */
controller.AbsPosition = function(player, rpc) {
    this.reset(player, rpc);
};

/**
 * 
 * @param {int} time - timestamp from animation loop
 * @returns {Boolean} - false to indicate no further updates are needed
 */
controller.AbsPosition.prototype.update = function (time) {
    return false;
};

controller.AbsPosition.prototype.reset = function(player, rpc) {
    this.player = player;
    rpc.exposeRpcMethod('position', this, this.position);
    rpc.exposeRpcMethod('shoot', this, this.shoot);
    return this;
};

controller.AbsPosition.prototype.position = function(x,y) {
    this.player.setPosition(x,y);
};

controller.AbsPosition.prototype.shoot = function() {
    this.player.shoot();
};