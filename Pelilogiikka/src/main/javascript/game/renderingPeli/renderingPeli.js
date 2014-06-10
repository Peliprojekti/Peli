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
    width: 0,
    height: 0,
    scene: null,
    start: function (canvas, container) {
        "use strict";

        this.width = canvas.width = container.offsetWidth;
        this.height = canvas.height = container.offsetHeight;

        this.connectToServer();
        this.scene = renderingPeli.scene;
        this.scene.start(canvas);
    },
    onPlayerJoined: function (player, controller) {
        "use strict";
        var self = renderingPeli.game;
        console.info("renderingPeli::onPlayerJoined - New player connected", player.userID);
        player.setOnShoot(function () {
            //self.screen.shoot(x, y);
        });
        player.setOnPosition(function (x, y) {
            var vecX = -1 + x*2;
            var vecY = 1 - y*2;

            player.guiItem.set_Position(new Vector2(vecX, vecY));
        });
        return self.scene.addPlayer(player, controller);
    },
    onPlayerLeft: function (player, controller) {
        "use strict";
        //console.info("renderingPeli::onPlayerLeft - Player left", player.userID);
        this.scene.removePlayer(player);
    },
    connectToServer: function () {
        "use strict";
        game.controllerHub.openHub(this.onPlayerJoined.bind(this), this.onPlayerLeft.bind(this),

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