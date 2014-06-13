var renderingPeli = renderingPeli || {};
renderingPeli.playerManager = {
    players: [],
    crosshairCounter: 0,
    addPlayer: function (player) {
        "use strict";
        console.info("scene::addPlayer - attaching player to scene");

        this.crosshairCounter = (this.crosshairCounter + 1) % 8;
        var texture = new Texture('/data/crosshairs/crosshair' + this.crosshairCounter + '.png');

        player.shader = new GuiShader();
        player.guiItem = new GuiItem(new Vector2(0, 0), new Dimension2(0.07, 0.07), texture);
        player.setCrosshairID(this.crosshairCounter);
        player.duckScore = 0;
        this.players.push(player);
    },
    removePlayer: function (player) {
        "use strict";

        this.players = this.players.filter(function (p) {
            return (p === player ? false : true);
        });

        delete player.guiItem;
        delete player.shader;
    },
    updatePlayers: function (time) {
        this.players.forEach(function (p) {
            p.update(time);
        });
    },
    addPlayerScore: function (player) {
        "use strict";
        player.duckScore++;
    },
    onPlayerJoined: function (userID) {
        "use strict";
        var self = renderingPeli.playerManager,
            player = self.createPlayer(userID);

        console.info("playerManager::onPlayerJoined - New player connected", player.userID);

        self.addPlayer(player);
        console.debug("playerManager::onPlayerJoined - Player addition to scene is done", player.userID);
        return player;
    },
    onPlayerLeft: function (player) {
        "use strict";
        //console.info("renderingPeli::onPlayerLeft - Player left", player.userID);
        this.removePlayer(player);
    },
    createPlayer: function (userID) {
        "use strict";
        var player = new Player(userID);
        player.vecPosition = new Vector2(0, 0);

        /**
         * @param {Vector2} position vector of the shot position
         * @param {Player} the player who shot
         * @returns {boolean} was it a hit or not
         */
        player.setOnShoot(function () {
            if (renderingPeli.targetManager.shoot(player.vecPosition)) {
                renderingPeli.playerManager.addPlayerScore(player);
                return true;
            }
            return false;
        });

        player.setOnSetPosition(function (x, y) {
            player.vecPosition.x = -1 + x * 2;
            player.vecPosition.y = 1 - y * 2;


            player.guiItem.set_Position(this.vecPosition);
        });

        player.setOnDisconnect(function () {
            renderingPeli.playerManager.onPlayerLeft(this);
        });
        return player;
    }

};