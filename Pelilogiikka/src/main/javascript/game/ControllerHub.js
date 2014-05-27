var game = game || {};

game.controllerHub = {
    ws_protocol: undefined, //JSONRPC_RPOTOCOL,
    ws_port: SCREEN_PORT,
    onPlayerJoined: null,
    onPlayerLeft: null,
    maxControllers: 100,
    minFreeControllers: 2,

    controllerType: CONTROLLER,
    controllerCount: 0,
    controllers: [],
    controllersFree: 0,

    customRpcs: [],


    addCustomRpcMethod: function(methodName, methodContext, method) {
        this.customRpcs.push([methodName, methodContext, method]);
    },

    openHub: function(onPlayerJoined, onPlayerLeft, maxPlayers) {
        var self = this;
        if (onPlayerJoined === undefined) throw new Error("Need to supply at least a onPlayerJoined callback");
        self.onPlayerJoined = onPlayerJoined;
        self.onPlayerLeft = onPlayerLeft;
        self.max = maxPlayers;
        createNewController();

        function createNewController() {
            if ((self.controllersFree >= self.minFreeControllers) || self.controllerCount == self.max) {
                return;
            }

            log.info("Creating and connecting new Controller");
            var connection = new ConnectionWebsocket(location.hostname, self.ws_port, self.ws_protocol, true);

            var rpc = new PeliRPC(connection);
            var controller = game.controller.create(rpc);

            self.customRpcs.forEach(function(rpcMethod) {
                rpc.exposeRpcMethod(rpcMethod[0], rpcMethod[1], rpcMethod[2]);
            });

            rpc.exposeRpcMethod('joinGame', this, function(userID) {
                console.info("Player joined with userID ", userID);

                self.controllersFree--;
                var player = playerFactory.getPlayer(userID, controller);
                controller.setPlayer(player, self.controllerType);
                self.onPlayerJoined(player);

                createNewController();
                return self.controllerType;
            });

            var onMessage = rpc.getOnMessage();

            connection.connect(function() {
                    // onConnection
                    self.controllerCount++;
                    self.controllersFree++;
                    console.log("Controller successfully connected ", self.controllerCount);
                    createNewController();
                }, 
                function() { // onClose
                    self.controllerCount--;
                    // TODO check if was connected to player, and create update freeControllers ccordingly
                    console.log("Controller disconnected, now have a total of ", self.controllerCount);
                }, 
                rpc.getOnMessage(),// onMessage
                function() { // onPlayerDisconnected
                    //self.controllersFree++;
                    self.onPlayerLeft(controller.clearPlayer());
                });
        }
    }
};
