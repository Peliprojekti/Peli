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
    
    addPlayerScore: function(player){
      player.duckScore++;  
    }

};