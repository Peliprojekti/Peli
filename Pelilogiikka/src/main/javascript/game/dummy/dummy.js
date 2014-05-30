/*global console: false*/
/*global $: false*/
/*global game: false*/
/*global graphics2d: false*/
/*jslint browser: true*/

var dummy = dummy || {};
dummy.game = {
    players: [],
    screen: null,
    start: function () {
        "use strict";
        var canvas = document.getElementById("canvas"),
            container = document.getElementById("container");
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        //this.updateables.push(graphics2d.fpsDisplay.createFancy(canvas));
        //this.updateables.push(graphics2d.rpsDisplay.createFancy(canvas));
        //this.updateables.push(graphics2d.playerPerformance.create(canvas));

        this.connectToServer();
        this.screen = dummy.screen;

        this.screen.start(document.getElementById("canvas"));
    },
    onPlayerJoined: function (player, controller) {
        "use strict";
        var self = dummy.game,
            crosshair = graphics2d.crosshair.createRandomColor(0.5, 0.5, 20);//Crosshair(0, 0, 20);
        console.info("New player connected ", player);
        player.setCrosshair(crosshair);
        player.setOnShoot(function(x,y) {
            self.screen.shoot(x,y);
        });
        self.screen.addController(controller);
        self.screen.addPlayer(player);
    },
    onPlayerLeft: function (player, controller) {
        "use strict";
        var self = dummy.game;
        console.info("Player disconnected ", player);
        self.screen.removeController(controller);
        self.screen.removePlayer(player);
    },
    connectToServer: function () {
        "use strict";
        game.controllerHub.openHub(this.onPlayerJoined, this.onPlayerLeft,
                {// playerFactory
                    getPlayer: function (userID) {
                        var player = new Player(userID);
                        console.error("and here");
                        return new Player(userID);
                    },
                    freePlayer: function (player) {
                        player.crosshair = null;
                        player = null;
                        // remove from could do some object recycling, or something

                    }
                }, 100 /* maxPlayers */);
    }
};

$(document).ready(function () {
    "use strict";
    dummy.game.start();
});