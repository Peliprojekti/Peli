/*jslint browser: true*/
/*global console: false*/
/*global $: false*/
/*global game: false*/
/*global Root_Exception_Handler: false*/
/*global global_Initializer: false*/

var renderingPeli = renderingPeli || {};
renderingPeli.game = {
    players: [],
    crosshairManager: new CrosshairManager(0),
    scene: null,
    start: function (canvas, container) {
        "use strict";

        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        //this.initConfigMenu();

        this.connectToServer();
        this.scene = renderingPeli.scene;
        this.scene.start(canvas);
    },
    onPlayerJoined: function (player, controller) {
        "use strict";
        var self = renderingPeli.game,
            crosshair = renderingPeli.game.crosshairManager.requestCrosshair(player);
        console.info("renderingPeli - New player connected ", player.userID);
        player.setCrosshair(crosshair);
        player.setOnShoot(function (x, y) {
            //self.screen.shoot(x, y);
        });
        self.scene.addController(controller);
        self.scene.addPlayer(player);
        return crosshair.id;
    },
    onPlayerLeft: function (player, controller) {
        "use strict";
        var self = renderingPeli.game;
        console.info("renderingPeli - Player disconnected ", player.userID);
        self.scene.removeController(controller);
        if (typeof player.crossh.id !== 'undefined') {
            renderingPeli.game.crosshairManager.freeCrosshair(player.crossh.id);
        }
        self.scene.removePlayer(player);

    },
    connectToServer: function () {
        "use strict";
        game.controllerHub.openHub(this.onPlayerJoined, this.onPlayerLeft,

                {// playerFactory
                    getPlayer: function (userID) {
                        return new Player(userID);
                    },
                    freePlayer: function (player) {
                        player.crosshair = null;
                        player = null;
                    }
                }, 100 /* maxPlayers */);
    },
};

$(document).ready(function () {
    "use strict";
    var canvas = document.getElementById("Canvas"),
        container = document.getElementById("container");

    if (container !== null) {
        renderingPeli.game.start(canvas, container);
    }
});