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

        rpc.exposeRpcMethod('position', controller, controller.position);
        rpc.exposeRpcMethod('swipe', controller, controller.swipe);
        rpc.exposeRpcMethod('moveSwipe', controller, controller.moveSwipe);
        rpc.exposeRpcMethod('orientation', controller, controller.orientation);

        return controller;
    },
};

game.Controller = function() {};

game.Controller.prototype.setPlayer = function(player) {
    this.player = player;
};

game.Controller.prototype.clearPlayer = function() {
    var player = this.player;
    this.player = null;
    return player;
};

game.Controller.prototype.position = function(x, y) {
    this.player.setPosition(x, y);
};

game.Controller.prototype.swipe = function(x, y, sincePrevious) {
    this.player.pushSwipe([x, y], sincePrevious);
};

game.Controller.prototype.swipe = function(x, y, sincePrevious) {
    this.player.pushSwipe([x, y], sincePrevious);
};

game.Controller.prototype.orientation = function(tiltLR, tiltFB, dir) {
    this.player.orientation(tiltLR, tiltFB, dir);
};
