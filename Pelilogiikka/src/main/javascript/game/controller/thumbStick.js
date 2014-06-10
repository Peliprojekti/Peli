var controller = controller || {};

controller.loadedTypes = controller.loadedTypes || [];
controller.loadedTypes['ThumbStick'] = {
    freeControllers: [],
    
    getController: function (player, rpc) {
        return (this.freeControllers.length > 0 ?
            this.freeControllers.pop().reset(player, rpc) :
            new controller.ThumbStick(player, rpc)
            );
       //return new controller.ThumbStick(player, rpc);
    },
    freeController: function (controller) {
        //controller.absPosition.freeControllers.push(controller);
    }
};

controller.ThumbStick = function (player, rpc) {
    this.reset(player, rpc);
};

controller.ThumbStick.prototype.reset = function (player, rpc) {
    this.player = player;
    
    this.x = 0;
    this.playerPos = new Vector2(0.5, 0.5);

    this.posChangeSpeed = 0.01;
    this.thumbStickPos = new Vector2(0, 0);

    rpc.exposeRpcMethod('thumbStickPosition', this, this.thumbStickPosition);
    rpc.exposeRpcMethod('buttonPushed', this, this.buttonPushed);
};

controller.ThumbStick.prototype.clear = function () {
    this.player = null;
};


controller.ThumbStick.prototype.update = function () {
    var newPos = this.playerPos.add(this.thumbStickPos.multiply(this.posChangeSpeed));
    this.position(newPos);
};

controller.ThumbStick.prototype.buttonPushed = function () {
    this.player.shoot();
};

controller.ThumbStick.prototype.thumbStickPosition = function (x, y) {
    if (x <= 1) {
        this.x = x;
    }
    this.thumbStickPos = new Vector2(this.x - 0.5, y - 1);
};


controller.ThumbStick.prototype.position = function (newPos) {
    if (newPos.x <= 0 || newPos.x >= 1) {
        newPos.x = this.player.x;
    }
    if (newPos.y <= 0 || newPos.y >= 1) {
        newPos.y = this.player.y;
    }

    this.playerPos = newPos;
    this.player.setPosition(newPos.x, newPos.y);
};