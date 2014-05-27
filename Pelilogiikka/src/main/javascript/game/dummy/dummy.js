var dummy = dummy || {};

var MESSAGE_TIME = 10000;

var canvas = null;
var c_witdth = 0;
var c_height = 0;

var controllers = null;

var players = [];
var messages = [];
var message_timer = [];
var context = null;

var updateables = [];

function showMessage(msg) {
    log.info("displaying message: " + msg);
    messages.push(msg);
    message_timer.push(MESSAGE_TIME);
}

function initializeUI() {
    canvas = setupCanvas();

    //context = canvas.getContext('2d');

    c_width = canvas.width;
    c_height = canvas.height;

    this.updateables.push(graphics2d.fpsDisplay.createFancy(canvas));
    this.updateables.push(graphics2d.rpsDisplay.createFancy(canvas));
    //this.updateables.push(graphics2d.playerPerformance.create(canvas));

    requestAnimationFrame(animate);

    showMessage("starting anmiations");
}

function setupCanvas() {
    var container = document.getElementById("container");
    canvas = document.getElementById("canvas");

    var width = container.clientWidth;
    var height = container.clientHeight;

    c_height = height;
    c_width = width;

    log.info("setting canvas dimensions to " + c_width + "x" + c_height);
    canvas.width = c_width;
    canvas.height = c_height;

    return canvas;
}



function connectToServer() {
    var players = this.players;

    log.info("Opening controllerHub");

    game.controllerHub.openHub(
        function(player) { // onPlayerJoined
            log.info("New player connected to dummy game");
            var crosshair = new graphics2d.crosshair.createRandomColor(0.5,0.5,20);//Crosshair(0, 0, 20);
            player.setCrosshair(crosshair);
            players.push(player);
            //playerPerformance.addPlayer(player);
        },
        function(player) { // onPlayerLeft
            //playerPerformance.removePlayer(player);
            var i = 0;
            for (; i < players.length; i++) {
                if (players[i] == player) {
                    break;
                }
            }
            players.splice(i, 1);
        },
        100 // maxPlayers
    );

    //controllers.open();
}

function animate(time) {
    update(time);
    draw(time);

    requestAnimationFrame(animate);
}

function update(time) {
    players.forEach(function(player) {
        player.update(time);
    });

    updateables.forEach(function(updatable) {
        updatable.update(time);
    });
}

function draw(time) {
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, c_width, c_height);

    drawRectangle(ctx);

    updateables.forEach(function(updatable) {
        updatable.draw(ctx, time);
    });


    players.forEach(function(player) {
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

function drawRectangle(ctx) {
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

/*
   function drawMessages(ctx) {
   var canvasDimensions = getCanvasDimensions();

   ctx.save();

   ctx.fillStyle = 'white';
   ctx.textAlign = 'center';

   texts[id] = text;

   var offset = 0;

   texts.forEach(function(entry) {
   ctx.fillText(entry, canvasDimensions[0] / 2, canvasDimensions[1] / 2 + offset);
   offset += 10;
   });

   }
   */

$(document).ready(function() {
    log.info("initializing dummy UI");
    initializeUI();
    log.info("connecting dummy to server");
    connectToServer();
});
