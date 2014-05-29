/*global console: false*/
/*global $: false*/
/*global game: false*/
/*global graphics2d: false*/
/*jslint browser: true*/

var dummy = dummy || {};
dummy.game = {
    start: function () {
        "use strict";

        //this.updateables.push(graphics2d.fpsDisplay.createFancy(canvas));
        //this.updateables.push(graphics2d.rpsDisplay.createFancy(canvas));
        //this.updateables.push(graphics2d.playerPerformance.create(canvas));

        //this.connectToServer();

        dummy.screen.start(document.getElementById("canvas"));
    },
    onPlayerJoined: function (player) {
        "use strict";
        console.info("New player connected ", player);
        var crosshair = graphics2d.crosshair.createRandomColor(0.5, 0.5, 20);//Crosshair(0, 0, 20);
        player.setCrosshair(crosshair);
        dummy.players.push(player);
    },
    onPlayerLeft: function (player) {
        "use strict";
        console.info("Player disconnected ", player);
        //playerPerformance.removePlayer(player);
        var i = 0;
        while (i < dummy.players.length) {
            if (dummy.players[i] === player) {
                break;
            }
            i += 1;
        }
        dummy.players.splice(i, 1);
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
/*
 function animate (time) {
 update(time);
 draw(time);
 
 requestAnimationFrame(animate);
 }
 
 function update (time) {
 players.forEach(function (player) {
 player.update(time);
 });
 
 updateables.forEach(function (updatable) {
 updatable.update(time);
 });
 }
 
 function draw (time) {
 ctx = canvas.getContext('2d');
 ctx.clearRect(0, 0, c_width, c_height);
 
 drawRectangle(ctx);
 
 updateables.forEach(function (updatable) {
 updatable.draw(ctx, time);
 });
 
 
 players.forEach(function (player) {
 player.draw(ctx, time);
 });
 
 ctx.restore();
 }
 
 var testRect = {
 x: 0,
 y: 0,
 width: 100,
 height: 100,
 xm: 1,
 ym: 1
 };
 
 function drawRectangle (ctx) {
 ctx.save();
 ctx.fillStyle = "rgb(200, 0, 0)";
 testRect.x += testRect.xm;
 testRect.y += testRect.ym;
 ctx.fillRect(testRect.x, testRect.y, 100, 100);
 if (testRect.x <= 0) {
 testRect.xm = 1;
 } else if (testRect.x >= (c_width - testRect.width)) {
 testRect.xm = -1;
 }
 if (testRect.y <= 0) {
 testRect.ym = 1;
 } else if (testRect.y >= (c_height - testRect.height)) {
 testRect.ym = -1;
 }
 ctx.restore();
 }
 */