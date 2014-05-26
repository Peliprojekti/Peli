var controller = controller || {};

controller.touchDrag = function(container, canvas, phone) {
    function TouchDrag() {
        this.previousSendTime = 0;
        this.interval = 20;
        //this.coords = null;
        this.currentTime = null;
        this.moveCounter = 0;
    }

    TouchDrag.prototype.doTouchMove = function(event) {
        event.preventDefault();

        var x = event.changedTouches[0].clientX / canvas.width;
        var y = event.changedTouches[0].clientY / canvas.height;

        this.moveCounter++;

        this.currentTime = new Date().getTime();

        if (this.currentTime - this.previousSendTime >= this.interval) {
            client.coms.call('position', [x, y], null, null);

            this.previousSendTime = this.currentTime;

            //log.info("touchmove events: " + this.moveCounter + ", interval: " + this.interval + "ms", true);
            this.moveCounter = 0;
        }

        this.updateCoordinatesText(x, y);
    };

    TouchDrag.prototype.enable = function(canvas) {
        var thisObject = this;

        canvas.addEventListener("touchmove", function(event) {
            thisObject.doTouchMove(event);
        }, false);
        return canvas;
    };

    TouchDrag.prototype.updateCoordinatesText = function(x, y) {
        phone.setControllerInfo(
            "Coordinates: (" + x + ", " + y + ")",
            "Canvas dimension: " + canvas.width + "x" + canvas.height
        );
    };

    var tdObj = new TouchDrag();
    tdObj.enable(canvas);
    return function() {
        canvas.removeEventListener("touchmove", tdObj.doTouchMove);
    };
};

$(document).ready(function() {
    client.phone.registerController('touchDrag', controller.touchDrag);
});
