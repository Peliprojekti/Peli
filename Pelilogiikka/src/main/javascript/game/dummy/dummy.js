/*global console: false*/
/*global $: false*/
/*global game: false*/
/*global rpsDisplay: false*/
/*global fpsDisplay: false*/
/*jslint browser: true*/

var dummy = dummy || {};
dummy.game = {
    initialConfig: {
        enablePhysics: false
    },
    enablePhsyics: false,
    players: [],
    crosshairManager: new CrosshairManager(0),
    screen: null,
    start: function (canvas, container) {
        "use strict";

        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        this.initConfigMenu();

        this.connectToServer();
        this.screen = dummy.screen;
        this.screen.setPhysicsEnabled(this.initialConfig.enablePhysics);
        this.screen.addToBackground(fpsDisplay.createFancy(canvas));
        this.screen.addToBackground(rpsDisplay.createFancy(canvas));

        this.screen.start(document.getElementById("canvas"));
    },
    onPlayerJoined: function (player, controller) {
        "use strict";
        var self = dummy.game,
            crosshair = dummy.game.crosshairManager.requestCrosshair(player);
        console.info("dummy - New player connected ", player.userID);
        player.setCrosshair(crosshair);
        player.setOnShoot(function (x, y) {
            self.screen.shoot(x, y);
        });
        self.screen.addController(controller);
        self.screen.addPlayer(player);
        return crosshair.id;
    },
    onPlayerLeft: function (player, controller) {
        "use strict";
        var self = dummy.game;
        console.info("dummy - Player disconnected ", player.userID);
        self.screen.removeController(controller);
        if (typeof player.crossh.id !== 'undefined') {
            dummy.game.crosshairManager.freeCrosshair(player.crossh.id);
        }
        self.screen.removePlayer(player);

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
    initConfigMenu: function() {
        var rightMenu = document.getElementById("rightMenu");

        rightMenu.appendChild(this.createMenuOption(
            "enable physics engine (Box2dWeb)",
            'checkbox',
            this.initialConfig.enablePhysics,
            function(value) {
                this.screen.setPhysicsEnabled(value);
            }.bind(this)));
    },
    createMenuOption: function(name, type, value, listener) {
        var configDiv = document.createElement('div'),
            varElement = document.createElement('div'),
            valElement = document.createElement('div');

        configDiv.className = 'configDiv';
        varElement.className = 'configVariable';
        valElement.className = 'configValue';

        varElement.innerHTML = name;

        switch(type) {
            case 'checkbox':
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = value;
                checkbox.addEventListener('change', function() {
                    listener(checkbox.checked);
                });
                valElement.appendChild(checkbox);
                break;
            default:
                valElement.innerHTML = 'ERROR';
        }

        configDiv.appendChild(varElement); 
        configDiv.appendChild(valElement); 
        configDiv.appendChild(document.createElement('br'));
        return configDiv;
    }
};

$(document).ready(function () {
    "use strict";
    var canvas = document.getElementById("canvas"),
        container = document.getElementById("container");

    if (container !== null) {
        dummy.game.start(canvas, container);
    }
});