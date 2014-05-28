var controller = controller || {};

//controller.thumbStick.sound = new Audio("/data/gun.ogg");

controller.thumbStick = function(container, canvas, phone) {
    var sound = new Audio("/data/gun.ogg");
    
    var thumbStickDot = {
                x: 0,
                y: 0,
                r: 0,
                draw: function(context) {
                context.strokeStyle = "#FF0000";
                context.fillStyle = "#FFFF00";
                context.beginPath();
                context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
                context.closePath();
                context.stroke();
                context.fill();
            }};
        
    phone.addDrawable(thumbStickDot);
    
    
    //var last = new Date().getTime();
    function drawCircle(x, y, r) {
        //log.debug("Time since last: " + (new Date().getTime() - last), true);
        //last = new Date().getTime();
        thumbStickDot.x = x;
        thumbStickDot.y = y;
        thumbStickDot.r = r;
    }

    function ThumbStick() {  }

    ThumbStick.prototype.doTouchStart = function(event) {
        
        event.preventDefault();
        for (var i = 0; i < event.targetTouches.length; i++) {
            if (phone.getRelativeCoords(i, event)[0] < 0.5) {
                var coords = phone.getFingerCoords(i, event);
                drawCircle(coords[0], coords[1], 10);
                var coordsNormalized = phone.getRelativeCoords(i, event);
                client.coms.call('thumbStickPosition', [coordsNormalized[0] * 2, coordsNormalized[1] * 2], null, null);
            } else {
                client.coms.call('buttonPushed', null, null);
                sound.play();
            }
        }


    };

    // En tajuu yht��n mit��n, mut m� kopy pastaan juttui :D t: Tuomas
    ThumbStick.prototype.doTouchMove = function(event) {
        event.preventDefault();
        for (var i = 0; i < event.targetTouches.length; i++) {
            if (phone.getRelativeCoords(i, event)[0] < 0.5) {
                
                var coords = phone.getFingerCoords(i, event);
                drawCircle(coords[0], coords[1], 10);
                var coordsNormalized = phone.getRelativeCoords(i, event);
                client.coms.call('thumbStickPosition', [coordsNormalized[0] * 2, coordsNormalized[1] * 2], null, null);
            }
        }
    };
    
    ThumbStick.prototype.doTouchEnd = function(event) {
        event.preventDefault();
        client.coms.call('thumbStickPosition', [0.5, 1], null, null);
    }

    // Ps. var tarkottaa muuttujaa?
    // Jos toi on noin, niin mit� i sitten meinaa? t: Tuomas

    ThumbStick.prototype.enable = function(canvas) {
        var thisObject = this;

        canvas.addEventListener("touchstart", function(event) {
            thisObject.doTouchStart(event);
        }, false);

        canvas.addEventListener("touchmove", function(event) {
            thisObject.doTouchMove(event);
        }, false);
        
        canvas.addEventListener("touchend", function(event) {
            thisObject.doTouchEnd(event);
        }, false);

    };

    var Obj = new ThumbStick();
    Obj.enable(canvas);
    return function() {
        // TODO return a disabler
    };
};

$(document).ready(function() {
    client.phone.registerController('ThumbStick', controller.thumbStick);
});
