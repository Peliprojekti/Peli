var client = client || {};

client.loadedTypes = client.loadedTypes || [];
client.loadedTypes.Swipe = function(container, canvas, phone, coms, updatePeriod) {
    
    function Swipe() {
        this.updatePeriod = 20;
        if (typeof updatePeriod !== 'undefined') this.updatePeriod = updatePeriod;
        this.previousSendTime;
    }

    Swipe.prototype.doTouchStart = function(event) {
        event.preventDefault();
      
        this.previousSendTime = new Date().getTime();
        this.sendCoords(event, true);
    };

    Swipe.prototype.sendCoords = function(event, isStart) {
        event.preventDefault();

        //var coords = phone.getrelativecoords(0, event);
        var coords = [
            event.targetTouches[0].pageX / canvas.width,
            event.targetTouches[0].pageY / canvas.height
        ];
            
        coms.call('swipe', [coords[0], coords[1], isStart], null, null);
        //log.debug("sent swipe: (" + coords[0] + ", " + coords[1] + ")" + ", 0", true);
    };

    Swipe.prototype.doTouchMove = function(event) {
        event.preventDefault();

        var currentTime = new Date().getTime();
        if (currentTime - this.previousSendTime >= this.updatePeriod) {
            this.sendCoords(event, false);
            this.previousSendTime = currentTime;
        }

        /*
        if (debug) {
            var coords = phone.getrelativecoords(0, event);
            updatecoordinatestext(coords[0], coords[1]);
        }
        */
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

    /*
    function updateCoordinatesText(x, y) {
        var canvasDimensions = phone.getCanvasDimensions();

        phone.setControllerInfo(
            "Coordinates: (" + x + ", " + y + ")",
            "Canvas width: " + canvasDimensions[0] + "\nCanvas height: " + canvasDimensions[1]
        );
    }
    */

    var swipeObj = new Swipe();
    swipeObj.enable(canvas);
};