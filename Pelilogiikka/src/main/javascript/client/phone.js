var coms = null;
var currentController = null;
var controllerType = CONTROLLER;

var peli = peli || {};
peli.client = peli.client || {};
peli.client.phone = peli.client.phone || {};

peli.client.phone._rc = 0;
peli.client.phone._oc = 0;

/**
 * This encapsulate all the comunications stuff
 * @constructor
 */
peli.client.phone.windowOnload = function() {
    var canvas = document.getElementById("canvas");
    peli.client.phone._canvas = canvas;

    var ctx = canvas.getContext("2d");

    var rc = 0; // resize counter
    var oc = 0; // orientiation counter
    var ios = navigator.userAgent.match(/(iPhone)|(iPod)/); // is iPhone

    log.info("trying to open connection");
    coms.open(function() {
        log.info("Connection establised, trying to join game");
        peli.client.phone.onConnectionOpened();
    });

    $(window).on("orientationchange", peli.client.phone.onOrientationChange);
    $(window).resize(peli.client.phone.onResize);
};

peli.client.phone._orienting = false;
peli.client.phone.onOrientationChange = function() {
    if (peli.client.phone._orienting === false) {
        peli.client.phone._orienting = true;
        setTimeout(function() {
            peli.client.phone._oc++;
        }, 50);
    }
    peli.client.phone._orienting = false;
};

peli.client.phone._resizing = false;
peli.client.phone.onResize = function() {
    if (peli.client.phone._resizing === false) {
        peli.client.phone._resizing = true;
        setTimeout(function() {
            //rc++;

            if (ios) {
                // increase height to get rid off ios address bar
                $("#container").height($(window).height() + 60);
            }

            // set canvas width and height
            $("#canvas").attr('width', $("#container").width());
            $("#canvas").attr('height', $("#container").height());

            // hides the WebKit url bar
            if (navigator.userAgent.match(/(iPhone)|(iPod)/)) {
                setTimeout(function() {
                    window.scrollTo(0, 1);
                }, 100);
            }

            drawText('Orientiation changes: ' + oc, 0);
            drawText('Resize events: ' + rc, 1);
        }, 100);
        peli.client.phone._resizing = false;
    }
};

peli.client.phone.onConnectionOpened = function() {
    peli.client.coms.joinGame(function(controllerType) {
        log.info("Game On!!");
        peli.client.phone.loadController(canvas);
    });
};

peli.client.phone.loadController = function(type) {
    if (typeof type === undefined) {
        type = CONTROLLER;
    }

    if (typeof peli.client.phone._controllerDisabler === 'function') {
        peli.client.phone._controllerDisable();
        peli.client.phone._controllerDisable = null;
    }

    var canvas = peli.client.phone._canvas;

    switch (controllerType) {
        case 'mouseMove':
            peli.client.phone._controllerDisable = peli.client.mouseMove(canvas);
            break;
        case 'touchDrag':
            var touchDragx = new TouchDrag();
            touchDragx.enable(coms, canvas);
            currentController = touchDragx;
            break;
        case 'swipe':
            var swipe = new Swipe();
            swipe.enable(coms, canvas);
            currentController = swipe;
            break;
        case 'ThumbStick':
            var thumbStick = new ThumbStick();
            thumbStick.enable(coms, canvas);
            currentController = thumbStick;
            break;
        case 'motion':
            var motion = new MotionController();
            motion.enable(coms, window);
            currentController = motion;
            break;
    }
};

$(document).ready(peli.client.phone.windowOnLoad);

function getFingerCoords(id) {
    var canvas_x = event.targetTouches[id].pageX;
    var canvas_y = event.targetTouches[id].pageY;
    return [canvas_x, canvas_y];
}

//var canvasDimensions = null;

function getRelativeCoords(id) {
    var coords = getFingerCoords(id);
    var canvasDimensions = getCanvasDimensions();
    var relativeX = coords[0] / canvasDimensions[0];
    var relativeY = coords[1] / canvasDimensions[1];
    return [relativeX, relativeY];
}

//Test code
function updateCoordinatesText(x, y) {
    var canvasDimensions = getCanvasDimensions();

    drawText("Coordinates: (" + x + ", " + y + ")", 2);
    drawText("Canvas width: " + canvasDimensions[0] + "\nCanvas height: " + canvasDimensions[1], 3);
}

//Test code
function updateStartTimeText(time) {
    drawText("Start time: " + time, 4);
}

//Test code
function updateCurrentTimeText(time) {
    drawText("Current time: " + time, 5);
}

//Test code
function updateStartCoordinatesText(x, y) {
    var canvasDimensions = getCanvasDimensions();

    drawText("Start coordinates: (" + x + ", " + y + ")", 6);
}

//Test code
function updateSendTimeText(time) {
    drawText("Sent time: " + time, 7);
}


//Test code
var texts = [];

function drawText(text, id) {
    var canvasDimensions = getCanvasDimensions();

    drawBackground();

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';

    if (typeof id !== 'undefined') {
        texts[id] = text;
    }

    var offset = 0;

    texts.forEach(function(entry) {
        ctx.fillText(entry, canvasDimensions[0] / 2, canvasDimensions[1] / 2 + offset);
        offset += 10;
    });

}

function drawBackground() {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'black';
    ctx.fillRect(10, 10, width - 20, height - 20);
}

function getCanvasDimensions() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;

    return [width, height];
}

function drawCircle(x, y, r) {
    //drawText();

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    context.strokeStyle = "#FF0000";
    context.fillStyle = "#FFFF00";
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, true);
    context.closePath();
    context.stroke();
    context.fill();
}

