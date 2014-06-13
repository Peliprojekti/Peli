/*jslint browser: true*/
/*global console: false*/
/*global $: false*/
/*global game: false*/
/*global Root_Exception_Handler: false*/
/*global global_Initializer: false*/

var renderingPeli = renderingPeli || {};
renderingPeli.game = {
    players: [],
    //crosshairManager: new CrosshairManager(0),
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
    onPlayerJoined: function (userID) {
        "use strict";
        return renderingPeli.playerManager.onPlayerJoined(userID);
    },
    connectToServer: function () {
        "use strict";
        game.controllerHub.openHub(renderingPeli.playerManager.onPlayerJoined, 100);
    }
};

$(document).ready(function () {
    "use strict";
    var canvas = document.getElementById("Canvas"),
        container = document.getElementById("container");

    if (container !== null) {
        renderingPeli.game.start(canvas, container);
    }
});