/*jslint browser: true*/
/*global SCREEN_PORT: false*/
/*global CONTROLLER: false*/
/*global controller: false*/
/*global ConnectionWebsocket: false*/
/*global peliRPC: false*/
/*global console: false*/
/*global game: true*/

var game = game || {};

game.controllerHub = {
    controllerType: CONTROLLER,
    ws_protocol: undefined, //JSONRPC_RPOTOCOL,
    ws_port: SCREEN_PORT,
    onPlayerJoined: null,
    //onPlayerLeft: null,
    maxPlayers: 100,
    minimumFreeConnections: 2,
    //freeConnections: 0,
    connectionCount: 0,
    playerCount: 0,
    sequence: 0,
    joined: {},
    //players: {},
    //controllers: {},
    connectionsInUse: [],
    changeControllerType: function (type) {
        "use strict";

        console.log("controllerHub::changeControllerType - changing controllerType ", type);
        var connection = this.connectionsInUse.pop();
        while (connection !== undefined) {
            connection.close();
            connection = this.connectionsInUse.pop();
        }

        this.controllerType = type;
        this.controllerLoader = controller.loadedTypes[this.controllerType];
    },
    /*
    update: function (time) {
        "use strict";
        var self = game.controllerHub,
            key;
        for (key in self.controllers) {
            self.controllers[key].update(time);
        }
    },
    */
    openHub: function (onPlayerJoined, maxPlayers) {
        "use strict";
        if (onPlayerJoined === undefined) {
            throw new Error("onPlayerJoined undefined");
        }
        if (!controller.loadedTypes[this.controllerType]) {
            throw new Error("controller not loaded " + this.controllerType);
        }

        this.controllerLoader = controller.loadedTypes[this.controllerType];
        this.onPlayerJoined = onPlayerJoined;
        this.maxPlayers = maxPlayers;

        this.openConnectionIfNeeded();
    },
    openConnectionIfNeeded: function () {
        "use strict";

        if (this.connectionCount !== this.maxPlayers && this.minimumFreeConnections > (this.connectionCount - this.playerCount)) {
            game.controllerHub.openConnection();

            window.setTimeout(function () {
                game.controllerHub.openConnectionIfNeeded();
            }, 100);
        }
    },
    openConnection: function () {
        "use strict";
        var connection,
            rpc,
            sequence;

        connection = new ConnectionWebsocket(location.hostname, this.ws_port, this.ws_protocol, true);
        rpc = peliRPC.create(connection);
        sequence = this.sequence;
        this.sequence += 1;

        console.info("ControllerHub::openConneciton - opened connection sequence", sequence);

        rpc.exposeRpcMethod('joinGame', null, function (userID) {
            return game.controllerHub.rpcJoinGame(sequence, userID, rpc, connection);
        });

        connection.connect(
            function (error, ok) { // on connection opened
                return game.controllerHub.onConnectionOpened(error, ok);
            },
            function () {  // on connection closed
                return game.controllerHub.onConnectionClosed(sequence);
            },
            function (message) {
                return rpc.onMessage(message);
            }
        );
    },
    rpcJoinGame: function (sequence, userID, rpc, connection) {
        "use strict";
        console.info("ControllerHub::rpcJoinGame - new player joining", userID);
        var player = this.onPlayerJoined(userID),
            controller = this.controllerLoader.getController(player, rpc);

        player.setController(controller);

        this.playerCount += 1;

        this.joined[sequence] = {
            player: player,
            controller: controller,
            rpc: rpc
        };

        this.connectionsInUse.push(connection);
        this.openConnectionIfNeeded();

        return [this.controllerType, player.getPlayerData()];
    },
    onConnectionOpened: function (error, ok) {
        "use strict";
        if (ok) {
            this.connectionCount += 1;
            console.log("ControllerHub::onConnectionOpened - new conneciton opened (connections,players): ", this.connectionCount, this.playerCount);
        } else {
            console.error("ControllerHub::onConnecitonOpened - Connection error", error);
        }
    },
    onConnectionClosed: function (sequence) {
        "use strict";
        var joined;

        this.connectionCount -= 1;

        if (this.joined[sequence] !== undefined) {
            console.info("ControllerHub::onConnectionClosed - player disconnected, closing connection ");
            joined = this.joined[sequence];

            joined.player.disconnect();
            this.controllerLoader.freeController(joined.controller);
            peliRPC.free(joined.rpc);

            delete joined.controller;
            delete joined.rpc;
            delete joined.player;
            delete this.joined[sequence];

            this.playerCount -= 1;
        } else {
            console.warn("ControllerHub::onConnectionClosed - connection unexpectedly closed", sequence);
        }
    }
};
