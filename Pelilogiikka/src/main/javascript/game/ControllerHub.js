/*jslint browser: true*/
/*global SCREEN_PORT: true*/
/*global CONTROLLER: true*/
/*global controller: false*/
/*global game: false*/

var game = game || {};

game.controllerHub = {
    controllerType: CONTROLLER,
    ws_protocol: undefined, //JSONRPC_RPOTOCOL,
    ws_port: SCREEN_PORT,
    onPlayerJoined: null,
    onPlayerLeft: null,
    maxPlayers: 100,
    minimumFreeConnections: 2,
    freeConnections: 0,
    playerCount: 0,
    sequence: 0,
    players: {},
    controllers: {},
    connectionsInUse: [],
    changeControllerType: function (type) {
        "use strict";

        console.log("controllerHub::changeControllerType - changing controllerType ", type);
        var connection = this.connectionsInUse.pop();
        while (typeof connection !== 'undefined') {
            connection.close();
            connection = this.connectionsInUse.pop();
        }

        this.controllerType = type;
        this.controllerLoader = controller.loadedTypes[this.controllerType];
    },
    update: function (time) {
        "use strict";
        var self = game.controllerHub,
            key;
        for (key in self.controllers) {
            self.controllers[key].update(time);
        }
    },
    openHub: function (onPlayerJoined, onPlayerLeft, maxPlayers) {
        "use strict";
        if (onPlayerJoined === undefined)
            console.error("onPlayerJoined undefined");
        if (onPlayerLeft === undefined)
            console.error("onPlayerLeft undefined");
        if (!controller.loadedTypes[this.controllerType])
            console.error("Controller not loaded", this.controllerType);

        this.controllerLoader = controller.loadedTypes[this.controllerType];
        this.onPlayerJoined = onPlayerJoined;
        this.onPlayerLeft = onPlayerLeft;
        this.maxPlayers = maxPlayers;

        if (!this.openConnection())
            console.error("unable to open first connection");
    },
    openConnection: function () {
        "use strict";
        var connection,
            rpc,
            sequence;

        if ((this.freeConnections >= this.minimumFreeConnections) || this.playerCount === this.maxPlayers) {
            return false;
        }

        connection = new ConnectionWebsocket(location.hostname, this.ws_port, this.ws_protocol, true);
        rpc = peliRPC.create(connection); //new PeliRPC(connection);
        sequence = this.sequence++;

        console.info("ControllerHub::openConneciton - opened connection sequence", sequence);

        rpc.exposeRpcMethod('joinGame', null, function (userID) {
            return game.controllerHub.rpcJoinGame(sequence, rpc, connection, userID);
        });

        connection.connect(
            function (error, ok) { 
                // connection.onOpen(error, ok)
                return game.controllerHub.onConnectionOpened(sequence, rpc, error, ok);
            },
            function () { 
                // connection.onclose()
                return game.controllerHub.onConnectionClosed(sequence, rpc);
            },
            function (message) { 
                // conneciton.onMessage(message)
                return rpc.onMessage(message);
            }
        );
        return true;
    },
    rpcJoinGame: function (sequence, rpc, connection, userID) {
        "use strict";
        var player = this.onPlayerJoined(userID);
        var controller = this.controllerLoader.getController(player, rpc);
        this.connectionsInUse.push(connection);

        try {
            console.debug("ControllerHub::rpcJoinGame - registering controller and player, sequence", sequence);
            this.playerCount++;
            this.freeConnections--;
            this.controllers[sequence] = controller;
            this.players[sequence] = player;
        } catch (e) {
            console.error("Error while loading controller", this.controllerType);
            throw new Error("Error while loading controller", this.controllerType);
        }

        window.setTimeout(function () {
            game.controllerHub.openConnection();
        }, 100);

        console.debug("controllerHub::rpcJoinGame - returning", this.controllerType);
        return [this.controllerType, player.getPlayerData()];
    },
    onConnectionOpened: function (sequence, rpc, error, ok) {
        "use strict";
        if (error === null) {
            this.freeConnections++;
            console.log("New connection successfully opened (con,pla): ", this.freeConnections, this.playerCount);
            this.openConnection();
        } else {
            console.warn("Connection error ", sequence, error);
        }
    },
    onConnectionClosed: function (sequence, rpc) {
        "use strict";
        var controller = this.controllers[sequence],
            player = this.players[sequence];

        if (controller !== undefined && controller !== null) {
            console.info("ControllerHub::onConnectionClosed - player disconnected, closing connection ");

            this.controllerLoader.freeController(controller);
            peliRPC.free(rpc);

            delete this.controllers[sequence];
            delete this.players[sequence];
            this.playerCount--;
            this.onPlayerLeft(player);
        } else {
            this.freeControllers--;
            console.warn("ControllerHub::onConnectionClosed - connection unexpectedly closed", sequence);
        }
    }
};
