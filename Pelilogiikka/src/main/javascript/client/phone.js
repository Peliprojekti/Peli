var coms = null;
var currentController = null;
var controllerType = CONTROLLER;

var peli = peli || {};
peli.client = peli.client || {};
peli.client.phone = peli.client.phone || {};

peli.client.phone._rc = 0;
peli.client.phone._oc = 0;
peli.client.phone._canvas = null;
peli.client.phone._container = null;

/**
 * This encapsulate all the comunications stuff
 * @constructor
 */
peli.client.phone.windowOnload = function() {
    peli.client.phone._canvas = document.getElementById('canvas'); //$('#canvas');
    peli.client.phone._container = $('#container');

    var ctx = canvas.getContext("2d");

    var rc = 0; // resize counter
    var oc = 0; // orientiation counter

    log.info("trying to open connection");
    peli.client.coms.open(function() {
        peli.client.phone.onConnectionOpened();
    });

    $(window).on("orientationchange", peli.client.phone.onOrientationChange);
    $(window).resize(peli.client.phone.onResize);

    peli.client.phone.onResize();
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
    var self = peli.client.phone;

    if (peli.client.phone._resizing === false) {
        peli.client.phone._resizing = true;
        setTimeout(function() {
            //rc++;
            var ios = navigator.userAgent.match(/(iPhone)|(iPod)/); // is iPhone

            if (ios) {
                // increase height to get rid off ios address bar
                $("#container").height($(window).height() + 60);
            }

            // set canvas width and height
            //self._canvas.widht = self._container.width();
            //self._canvas.height = self._container.height();


            $("#canvas").attr('width', $("#container").width());
            $("#canvas").attr('height', $("#container").height());

            // hides the WebKit url bar
            if (navigator.userAgent.match(/(iPhone)|(iPod)/)) {
                setTimeout(function() {
                    window.scrollTo(0, 1);
                }, 100);
            }

            peli.client.phone.drawText('Orientiation changes: ' + peli.client.phone._oc++, 0);
            peli.client.phone.drawText('Resize events: ' + peli.client.phone._rc++, 1);
        }, 100);
        peli.client.phone._resizing = false;
    }
};

peli.client.phone.onConnectionOpened = function() {
    log.info("peli.phone.onConnectionOpened - trying to joinGame with userID: " + USERID);
    peli.client.coms._rpc.callRpc('joinGame', [USERID], this, function(controllerType) {
        log.info("Game On!!");
        peli.client.phone.loadController(controllerType);
    });
};

peli.client.phone._texts = [];
peli.client.phone.drawText = function(text, textID) {
    var texts = peli.client.phone._texts;

    if (typeof textID === 'undefined') {
        throw "peli.client.phone.drawText - needs a textID";
    }

    if (texts.textIndexes === undefined) {
        texts.textIndexes = {};
        texts.lines = 0;
    }

    if (texts.textIndexes[textID] === undefined) {
        texts.textIndexes[textID] = texts.lines++;
        texts.push(null);
    }

    if (texts[texts.textIndexes[textID]] != text) {
        texts[texts.textIndexes[textID]] = text;
        peli.client.phone.draw();
    }
};

peli.client.phone.draw = function() {
    var width = peli.client.phone._canvas.width;
    var height = peli.client.phone._canvas.height;
    var canvasDimensions = [width, height];

    var ctx = peli.client.phone._canvas.getContext("2d");
    drawBackground(ctx);

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';

    var offset = 0;
    var texts = peli.client.phone._texts;
    for (var i = 0; i < texts.length; i++) {
        ctx.fillText(texts[i],
            width / 2, (height / 2) + (i * 10));
    }

    function drawBackground(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'black';
        ctx.fillRect(10, 10, width - 20, height - 20);
    }
    /*
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
    */
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
    var container = peli.client.phone._canvas;

    canvas.drawText = peli.client.phone.drawText;

    switch (controllerType) {
        case 'mouseMove':
            peli.client.phone._controllerDisable = peli.client.mouseMove(container, canvas);
            break;
        default:
            log.error('trying to load unknown controller: ' + type);

            /*
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
               */
    }
};

$(document).ready(peli.client.phone.windowOnload);



/*

   function getFingerCoords(id) {
   var canvas_x = event.targetTouches[id].pageX;
   var canvas_y = event.targetTouches[id].pageY;
   return [canvas_x, canvas_y];
   }

   function getRelativeCoords(id) {
   var coords = getFingerCoords(id);
   var canvasDimensions = getCanvasDimensions();
   var relativeX = coords[0] / canvasDimensions[0];
   var relativeY = coords[1] / canvasDimensions[1];
   return [relativeX, relativeY];
   }



//Test code
var texts = [];

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

*/
