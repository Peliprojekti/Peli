var client = client || {};

client.loadedTypes = client.loadedTypes || [];
client.loadedTypes.Swipe = function(container, canvas, phone, coms) {
    
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

        this.sendCoords(event, true);
    };

    Swipe.prototype.sendCoords = function(event, isStart) {
        event.preventDefault();

        var coords = phone.getRelativeCoords(0, event);
        coms.call('swipe', [coords[0], coords[1], isStart], null, null);
        //log.debug("Sent swipe: (" + coords[0] + ", " + coords[1] + ")" + ", 0", true);
    };

    Swipe.prototype.doTouchMove = function(event) {
        event.preventDefault();

        var currentTime = new Date().getTime();
        if (currentTime - this.previousSendTime >= this.updatePeriod) {
            this.sincePrevious = new Date().getTime() - this.previousSendTime;
            this.sendCoords(event, false);
            this.previousSendTime = currentTime;
        }

        if (DEBUG) {
            var coords = phone.getRelativeCoords(0, event);
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

    function updateCoordinatesText(x, y) {
        var canvasDimensions = phone.getCanvasDimensions();

        phone.setControllerInfo(
            "Coordinates: (" + x + ", " + y + ")",
            "Canvas width: " + canvasDimensions[0] + "\nCanvas height: " + canvasDimensions[1]
        );
    }

    var swipeObj = new Swipe();
    swipeObj.enable(canvas);
};