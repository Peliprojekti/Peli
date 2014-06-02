/*jslint browser: true*/

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
    freeConnections: 0,
    playerCount: 0,
    sequence: 0,
    players: {},
    controllers: {},
    update: function (time) {
        var self = game.controllerHub;
        for (var key in self.controllers) {
            self.controllers[key].update(time);
        }
    },
    openHub: function (onPlayerJoined, onPlayerLeft, playerFactory, maxPlayers) {
        "use strict";
        if (onPlayerJoined === undefined)
            console.error("onPlayerJoined undefined");
        if (onPlayerLeft === undefined)
            console.error("onPlayerLeft undefined");
        if (playerFactory === undefined)
            console.error("playerFactory undefined");
        if (!(playerFactory.getPlayer && playerFactory.freePlayer))
            console.error("malformed playerFactory");
        if (!controller.loadedTypes[this.controllerType])
            console.error("Controller not loaded", this.controllerType);

        this.controllerLoader = controller.loadedTypes[this.controllerType];
        this.onPlayerJoined = onPlayerJoined;
        this.onPlayerLeft = onPlayerLeft;
        this.playerFactory = playerFactory;
        this.maxPlayers = maxPlayers;

        if (!this.openConnection())
            console.error("unable to open first connection");
    },
    openConnection: function () {
        "use strict";
        if ((this.freeConnections >= this.minimumFreeConnections) || this.playerCount === this.maxPlayers) {
            return false;
        }

        var connection = new ConnectionWebsocket(location.hostname, this.ws_port, this.ws_protocol, true);
        var rpc = peliRPC.create(connection); //new PeliRPC(connection);
        var sequence = this.sequence++;

        rpc.exposeRpcMethod('joinGame', null, this.rpcJoinGame.bind(this, sequence, rpc));

        connection.connect(
            this.onConnectionOpened.bind(this, sequence, rpc),
            this.onConnectionClosed.bind(this, sequence, rpc),
            rpc.getOnMessage()
            );
        return true;
    },
    rpcJoinGame: function (sequence, rpc, userID) {
        "use strict";
        console.debug("here we are");
        var player = this.playerFactory.getPlayer(userID);
        var controller = this.controllerLoader.getController(player, rpc);

        try {
            this.playerCount++;
            this.freeConnections--;
            this.controllers[sequence] = controller;
            this.players[sequence] = player;
        } catch (e) {
            console.error("Error while loading controller", this.controllerType);
        }

        this.openConnection();

        var playerData = this.onPlayerJoined(player, controller);
        console.info("Player joined game with userID ", userID, "controllerType is ", this.controllerType);
        return [this.controllerType, playerData];

    },
    onConnectionOpened: function (sequence, rpc, error, ok) {
        "use strict";
        if (error === null) {
            this.freeConnections++;
            console.log("New connection successfully opened, total connecitons: ", this.freeConnections + this.playerCount);
            this.openConnection();
        } else {
            console.warn("Connection error ", sequence, error);
        }
    },
    onConnectionClosed: function (sequence, rpc) {
        "use strict";
        var controller = this.controllers[sequence],
            player = this.players[sequence];

        if (controller) {
            console.info("player disconnected, closing connection ");

            this.controllerLoader.freeController(controller);
            this.playerFactory.freePlayer(player);

            delete this.controllers[sequence];
            delete this.players[sequence];
            self.playerCount--;
            this.onPlayerLeft(player, controller);
            rpc.clear();
        } else {
            console.warn("connection unexpectedly closed ");
        }
    }
};
