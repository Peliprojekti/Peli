var controller = controller || {};

controller.swipe = function(container, canvas, drawText) {
    var coms = client.coms;

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

        this.sendCoords();
    };

    Swipe.prototype.sendCoords = function() {
        try {
        event.preventDefault();

        var coords = [
            event.changedTouches[0].clientX / canvas.width,
            event.changedTouches[0].clientY / canvas.height ];

        if (this.sincePrevious === 0) {
            this.sincePrevious = new Date().getTime() - this.startTime;
            client.coms.call('swipe', [coords[0], coords[1], 0], null, null);
            log.info("Sent swipe: (" + coords[0] + ", " + coords[1] + ")" + ", 0");
        } else {
            this.sincePrevious = new Date().getTime() - this.previousSendTime;
            client.coms.call('swipe', [coords[0], coords[1], this.sincePrevious], null, null);
            log.info("Sent swipe: (" + coords[0] + ", " + coords[1] + ")" + ", " + this.sincePrevious);
        }
        }
        catch(e) {
            log.throwToServer(e);
        }
    };


    Swipe.prototype.doTouchMove = function(event) {
        event.preventDefault();

        var currentTime = new Date().getTime();
        if (currentTime - this.previousSendTime >= this.updatePeriod) {
            this.sendCoords();
            this.previousSendTime = currentTime;
        }

        if (DEBUG) {
            var coords = getRelativeCoords(0);
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

    var swipeObj = new Swipe();
    swipeObj.enable(canvas);
};

$(document).ready(function() {
    client.phone.registerController('swipe', controller.swipe);
});
