var controller = controller || {};

controller.swipe = function(container, canvas, phone) {
    function Swipe() {
        this.updatePeriod = 20; //time in ms
        this.sincePrevious = 0;
        this.startTime = null;
        this.previousSendTime = 0;
    }

    Swipe.prototype.doTouchStart = function(event) {
        event.preventDefault();
        this.startTime = new Date().getTime();
        this.sincePrevious = 0;

        this.sendCoords(event);
    };

    Swipe.prototype.sendCoords = function(event) {
        event.preventDefault();

        var coords = getRelativeCoords(0, event);

        if (this.sincePrevious === 0) {
            this.sincePrevious = new Date().getTime() - this.startTime;
            client.coms.call('swipe', [coords[0], coords[1], 0], null, null);
            log.info("Sent swipe: (" + coords[0] + ", " + coords[1] + ")" + ", 0", true);
        } else {
            this.sincePrevious = new Date().getTime() - this.previousSendTime;
            client.coms.call('swipe', [coords[0], coords[1], this.sincePrevious], null, null);
            log.info("Sent swipe: (" + coords[0] + ", " + coords[1] + ")" + ", " + this.sincePrevious, true);
        }

    };

    Swipe.prototype.doTouchMove = function(event) {
        event.preventDefault();

        var currentTime = new Date().getTime();
        if (currentTime - this.previousSendTime >= this.updatePeriod) {
            this.sendCoords(event);
            this.previousSendTime = currentTime;
        }

        if (DEBUG) {
            var coords = getRelativeCoords(0, event);
            updateCoordinatesText(coords[0], coords[1]);
        }
    };


    Swipe.prototype.enable = function(canvas) {
        var thisObject = this;
        canvas.addEventListener("touchstart", function(event) {
            thisObject.doTouchStart(event);
        }, false);
        canvas.addEventListener("touchmove", function(event) {
            thisObject.doTouchMove(event);
        }, false);
    };

    function getFingerCoords(id, event) {
        var canvas_x = event.targetTouches[id].pageX;
        var canvas_y = event.targetTouches[id].pageY;
        return [canvas_x, canvas_y];
    }

    function getRelativeCoords(id, event) {
        var coords = getFingerCoords(id, event);
        var canvasDimensions = getCanvasDimensions();
        var relativeX = coords[0] / canvasDimensions[0];
        var relativeY = coords[1] / canvasDimensions[1];
        return [relativeX, relativeY];
    }

    function getCanvasDimensions() {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        width = canvas.width;
        height = canvas.height;

        return [width, height];
    }

    function updateCoordinatesText(x, y) {
        var canvasDimensions = getCanvasDimensions();

        phone.setControllerInfo(
            "Coordinates: (" + x + ", " + y + ")",
            "Canvas width: " + canvasDimensions[0] + "\nCanvas height: " + canvasDimensions[1]
        );
    }

    var swipeObj = new Swipe();
    swipeObj.enable(canvas);
};

$(document).ready(function() {
    client.phone.registerController('swipe', controller.swipe);
});
