/*global console: false*/
/*global $: false*/
/*global game: false*/
/*global rpsDisplay: false*/
/*global fpsDisplay: false*/
/*global Player: false*/
/*global crosshair: false*/
/*jslint browser: true*/

var dummy = dummy || {};
dummy.game = {
    initialConfig: {
        enablePhysics: false,
        enableEntities: false,
        enableStats: true
    },
    enablePhsyics: false,
    players: [],
    width: 0,
    height: 0,
    screen: null,
    start: function (canvas, container) {
        "use strict";

        this.width = canvas.width = container.offsetWidth;
        this.height = canvas.height = container.offsetHeight;

        this.initConfigMenu();

        this.connectToServer();
        this.screen = dummy.screen;
        this.screen.setPhysicsEnabled(this.initialConfig.enablePhysics);
        this.screen.setEntitiesEnabled(this.initialConfig.enableEntities);
        this.screen.setStatsEnabled(this.initialConfig.enableStats);

        this.screen.start(canvas);
    },
    onPlayerJoined: function (userID) {
        "use strict";
        var self = dummy.game,
            player = new Player(userID),
            ch = crosshairFactory.createImg();

        player.setCrosshairID(ch.getID());

        player.setOnShoot(function () {
            console.debug("dummy::onPlayerJoined - player is shooting");
            //self.screen.shoot(ch.x, ch.y);
        });
        player.setOnDisconnect(function () {
            self.screen.removePlayer(player);
            player.clear();
        });
        player.setOnSetPosition(function (x, y) {
            ch.x = x * self.width;
            ch.y = y * self.height;
        });

        player.draw = function (ctx) {
            ch.draw(ctx, ch.x, ch.y);
        };

        self.screen.addPlayer(player);
        return player;
    },
    connectToServer: function () {
        "use strict";
        window.setTimeout(function () {
            game.controllerHub.openHub(dummy.game.onPlayerJoined, 100);
        }, 500);
    },
    initConfigMenu: function () {
        var rightMenu = document.getElementById("rightMenu");

        rightMenu.appendChild(this.createMenuOption(
            "enable physics engine (Box2dWeb)",
            'checkbox',
            this.initialConfig.enablePhysics,
            function(value) {
                this.screen.setPhysicsEnabled(value);
            }.bind(this)));
        rightMenu.appendChild(this.createMenuOption(
            "enable drawing of entities",
            'checkbox',
            this.initialConfig.enableEntities,
            function(value) {
                this.screen.setEntitiesEnabled(value);
            }.bind(this)));
        rightMenu.appendChild(this.createMenuOption(
            "enable stats displays",
            'checkbox',
            this.initialConfig.enableStats,
            function(value) {
                this.screen.setStatsEnabled(value);
            }.bind(this)));
        rightMenu.appendChild(this.createMenuOption(
            "controller type",
            'dropdown',
            [
                {
                    value: 'absPosition',
                    isDefault: true
                },
                {
                    value: 'motionController'
                },
                {
                    value: 'ThumbStick'
                },
                {
                    value: 'Swipe'
                },
                {
                    value: 'speedTest'
                }
            ],
            function (value) {
                game.controllerHub.changeControllerType(value);
                window.alert("please refresh clients to update controllers");
            }.bind(this)));
    },
    createMenuOption: function (name, type, value, listener) {
        "use strict";

        var configDiv = document.createElement('div'),
            varElement = document.createElement('div'),
            valElement = document.createElement('div');

        configDiv.className = 'configDiv';
        varElement.className = 'configVariable';
        valElement.className = 'configValue';

        varElement.innerHTML = name;

        switch (type) {
        case 'checkbox':
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = value;
            checkbox.addEventListener('change', function () {
                listener(checkbox.checked);
            });
            valElement.appendChild(checkbox);
            break;
        case 'dropdown':
            var input = document.createElement('select');
            value.forEach(function (v) {
                var option = document.createElement('option');
                if (v.isDefault) {
                    option.selected = true;
                }

                option.value = v.value;
                option.innerHTML = v.value;
                input.appendChild(option);
            });
            input.addEventListener('change', function () {
                for (var i = 0; i < input.children.length; i++) {
                    var o = input.children[i];
                    if (o.selected === true) {
                        listener(o.value);
                    }
                }
            });
            valElement.appendChild(input);
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
    console.debug("STARTING.................");
    var canvas = document.getElementById("canvas"),
        container = document.getElementById("container");

    if (container !== null) {
        dummy.game.start(canvas, container);
    }
});