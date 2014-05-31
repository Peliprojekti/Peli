var controller = controller || {};

controller.loadedTypes = controller.loadedTypes || [];
controller.loadedTypes.ThumbStick = function (container, canvas, phone, coms, crosshair) {
    "use strict";
    var x,
        y,
        r,
        sounds = [];

    for (var i = 0; i < 20; i++) {
        sounds[i] = new Audio("/data/gun.wav");
    }

    this.draw = function(context) {
        "use strict";
        context.strokeStyle = "#FF0000";
        context.fillStyle = "#FFFF00";
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2, true);
        context.closePath();
        context.stroke();
        context.fill();
    };

    var touchStartListener = function (event) {
        event.preventDefault();
        for (var i = 0; i < event.targetTouches.length; i++) {
            if (event.targetTouches[i].pageX < (canvas.width/2)) {
                x = event.targetTouches[i].pageX;
                y = event.targetTouches[i].pageY;
                coms.call('thumbStickPosition', [ 
                    (x / canvas.width) * 2, 
                    (y / canvas.heigth) * 2
                ], null, null);
            } 
            else {
                coms.call('buttonPushed', null, null, null);

                var sound = sounds.pop();
                sound.play();
                sounds.unshift(sound);
            }
        }
    };

    var touchMoveListener = function (event) {
        event.preventDefault();
        for (var i = 0; i < event.targetTouches.length; i++) {
            if (event.targetTouches[i].pageX < (canvas.width/2)) {
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
        //coms.call('thumbStickPosition', [0.5, 1], null, null);
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