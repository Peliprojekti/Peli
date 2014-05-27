var game = game || {};

game.controllerHub = {
    controllerType: CONTROLLER,
    ws_protocol: undefined, //JSONRPC_RPOTOCOL,
    ws_port: SCREEN_PORT,

    onPlayerJoined: null,
    onPlayerLeft: null,
    playerFactory: null,

    maxPlayers: 100,
    minimumFreeConnections: 2,
    freeConnections: 2,
    playerCount: 0,


    sequence: 0,
    controllers: [],

    loadedControllerTypes: {},

    registerController: function(name, controllerObject) {
        game.controller.loadedControllers[name] = controllerObject;
    },

    openHub: function(onPlayerJoined, onPlayerLeft, playerFactory, maxPlayers) {
        var self = this;
        if (onPlayerJoined === undefined) console.error("onPlayerJoined undefined");
        if (onPlayerLeft === undefined) console.error("onPlayerLeft undefined");
        if (playerFactory === undefined) console.error("playerFactory undefined");
        if (!self.loadedControllers[self.controllerType]) { console.error("unregistered controller type: ", self.controllerType); }

        self.onPlayerJoined = onPlayerJoined;
        self.onPlayerLeft = onPlayerLeft;
        self.playerFactory = playerFactory;
        self.maxPlayers = maxPlayers;

        openConnection();

        function openConnection() {
            if ((self.freeConnections >= self.minimumFreeConnections) || self.playerCount == self.maxPlayers) {
                return;
            }

            log.info("Opening new connection");
            var connection = new ConnectionWebsocket(location.hostname, self.ws_port, self.ws_protocol, true);
            var rpc = new PeliRPC(connection);
            var sequence = self.sequence++;

            rpc.exposeRpcMethod('joinGame', this, function(userID) {
                console.info("Player joined game with userID ", userID);
                var player = self.playerFactory.getPlayer(userID);
                var controller = self.loadedControllers[controllerType].getController(player, rpc);
                self.playerCount++;
                self.freeConnections--;
                self.controllers[sequence] = controller;

                openConnection();
                return self.controllerType;
            });

            connection.connect(function() {
                    // onConnection
                    self.freeConnections++;
                    console.log("New connection successfully opened, total connecitons: ", self.controllerCount + self.playerCount);
                    openConnection();
                },
                function() { // onClose
                    if (controllers[sequence]) {
                        console.info("player disconnected, closing connection");
                        self.loadedControllers[controllerType].freeController(controllers[sequence], player);
                        controllers[sequence] = null;
                        self.playerCount--;
                    }
                    else {
                        console.warn("connection unexpectedly closed");
                    }
                },
                rpc.getOnMessage());
        }
    },

};
