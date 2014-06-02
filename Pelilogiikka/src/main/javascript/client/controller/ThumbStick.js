/*jslint browser: true*/
/*global peliAudio: true*/
/*global controller: false*/
var controller = controller || {};

controller.loadedTypes = controller.loadedTypes || [];
controller.loadedTypes.ThumbStick = function (container, canvas, phone, coms, crosshair) {
    "use strict";
    var drawDot = false,
        x = canvas.width / 2,
        y = canvas.width / 2,
        stickID = null,
        r = 10;

    peliAudio.loadSound('gun', true);

    controller.loadedTypes.ThumbStick.draw  = function (context) {
        if (drawDot === true) {
            context.strokeStyle = "#FF0000";
            context.fillStyle = "#FFFF00";
            context.beginPath();
            context.arc(x, y, r, 0, Math.PI * 2, true);
            context.closePath();
            context.stroke();
            context.fill();
        }
    };


    var touchStartListener = function (event) {
        event.preventDefault();
        for (var i = 0; i < event.targetTouches.length; i++) {
            if (drawDot === false && event.targetTouches[i].pageX < (canvas.width / 2)) {
                drawDot = true;
                stickID = event.targetTouches[i].identifier;
                x = event.targetTouches[i].pageX;
                y = event.targetTouches[i].pageY;
                coms.call('thumbStickPosition', [ 
                    (x / canvas.width) * 2, 
                    (y / canvas.height) * 2 
                ], null, null);
            }
            else {
                coms.call('buttonPushed', null, null);
                peliAudio.play('gun');
            }
        }
    };

    var touchMoveListener = function (event) {
        event.preventDefault();
        for (var i = 0; i < event.targetTouches.length; i++) {
            if (event.targetTouches[i].identifier === stickID) {
                x = event.targetTouches[i].pageX;
                y = event.targetTouches[i].pageY;
                coms.call('thumbStickPosition', [
                    (x / canvas.width) * 2,
                    (y / canvas.height) * 2
                ], null, null);
            }
        }
    };

    var touchEndListener = function (event) {
        event.preventDefault();
        for (var i = 0; i < event.changedTouches.length; i++) {
            if (event.changedTouches[i].identifier === stickID) {
                drawDot = false;
                stickID = null;
                coms.call('thumbStickPosition', [0.5, 1], null, null);
            }
        }
    };

    canvas.addEventListener("touchstart", touchStartListener, false);
    canvas.addEventListener("touchmove", touchMoveListener, false);
    canvas.addEventListener("touchend", touchEndListener, false);

    return function () {
        canvas.removeEventListener("touchstart", touchStartListener, false);
        canvas.removeEventListener("touchmove", touchMoveListener, false);
        canvas.removeEventListener("touchend", touchEndListener, false);
    };
};