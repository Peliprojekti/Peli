var controller = controller || {};

controller.thumbStick = {
    freeControllers: [],

    getController: function(player, rpc) {
        return (controller.thumbStick.freeControllers.length > 0 ?
                controller.thumbStick.freeControllers.pop().reset(player, rpc) :
                new controller.thumbStick.ThumbStick(player, rpc)
               );
    },

    freeController: function(controller) {
        //controller.absPosition.freeControllers.push(controller);
    },

    ThumbStick: function(player, rpc) {
        this.reset(player, rpc);
    },
};


controller.thumbStick.ThumbStick.prototype.clear = function() {
    this.player = null;
};

controller.thumbStick.ThumbStick.prototype.reset = function(player, rpc) {
    this.player = player;
    
    this.posChangeSpeed = 0.01;
    this.thumbStickPos = new Vector2(0, 0);
    
    rpc.exposeRpcMethod('thumbStickPosition', this, this.thumbStickPosition);;
    rpc.exposeRpcMethod('buttonPushed', this, this.buttonPushed);
};

controller.thumbStick.ThumbStick.prototype.update = function() {
    var playerPos = new Vector2(this.player.x, this.player.y);
    var newPos = playerPos.add(this.thumbStickPos.mul(this.posChangeSpeed));
    
    this.position(newPos);
};

controller.thumbStick.ThumbStick.prototype.buttonPushed = function() {
    console.info("Button pressed!!!");
};

controller.thumbStick.ThumbStick.prototype.thumbStickPosition = function(x,y) {
    this.thumbStickPos = new Vector2(x - 0.5, y-1);
};


controller.thumbStick.ThumbStick.prototype.position = function(newPos) {
    if (newPos.x <= 0 || newPos.x >= 1) {
        newPos.x = this.player.x;
    }
    if (newPos.y <= 0 || newPos.y >= 1) {
        newPos.y = this.player.y;
    }
    
    this.player.setPosition(newPos.x,newPos.y);
};

$(document).ready(function() {
    game.controllerHub.registerController('ThumbStick', controller.thumbStick);
});
