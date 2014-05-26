var controller = controller || {};

controller.touchDrag = function(container, canvas, phone) {
    function drawCircle(x, y, r) {
        phone.addDrawable({
            draw: function() {
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
        });
    }

    function ThumbStick() {
        //this.coms;
    }

    ThumbStick.prototype.doTouchStart = function(event) {
        event.preventDefault();
        for (var i = 0; i < event.targetTouches.length; i++) {
            if (getRelativeCoords(i)[0] < 0.5) {
                var coords = getFingerCoords(i);
                drawCircle(coords[0], coords[1], 10);
            } else {
                //Napin painallus
            }
        }


    };

    // En tajuu yhtään mitään, mut mä kopy pastaan juttui :D t: Tuomas
    ThumbStick.prototype.doTouchMove = function(event) {
        event.preventDefault();
        for (var i = 0; i < event.targetTouches.length; i++) {
            if (getRelativeCoords(i)[0] < 0.5) {
                var coords = getFingerCoords(i);
                drawCircle(coords[0], coords[1], 10);
            }
        }
    };

    // Ps. var tarkottaa muuttujaa?
    // Jos toi on noin, niin mitä i sitten meinaa? t: Tuomas

    ThumbStick.prototype.enable = function(canvas) {
        var thisObject = this;
        log.coms = coms;
        this.coms = coms;

        canvas.addEventListener("touchstart", function(event) {
            thisObject.doTouchStart(event);
        }, false);

        canvas.addEventListener("touchmove", function(event) {
            thisObject.doTouchMove(event);
        }, false);

    };

    var Obj = new ThumbStick();
    Obj.enable(canvas);
    return function() {
        // TODO return a disabler
    };
};

$(document).ready(function() {
    client.phone.registerController('ThumbStick', controller.touchDrag);
});
