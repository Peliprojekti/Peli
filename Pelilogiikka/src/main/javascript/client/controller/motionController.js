/*jslint browser: true*/
/*global peliAudio: true*/
/*global client: false*/
var client = client || {};

client.loadedTypes = client.loadedTypes || [];
client.loadedTypes.motionController = function (container, canvas, phone, coms) {
    function MotionController () {
        this.orientationListener = false;   //boolean tells wehter the listener exists
    }

    MotionController.prototype.deviceOrientationHandler = function (eventData) {
        // event.preventDefault();

        // gamma is the left-to-right tilt in degrees, where right is positive
        var tiltLR = eventData.gamma;

        // beta is the front-to-back tilt in degrees, where front is positive
        var tiltFB = eventData.beta;

        // alpha is the compass direction the device is facing in degrees
        var dir = eventData.alpha;

        coms.call('orientation', [tiltLR, tiltFB, dir], null, null);
        //log.debug("sent orientation: " + tiltLR + ", " + tiltFB, true);

        if (DEBUG) {
            log.info("Orientation changed, new orientation:\n" +
                "tiltLR (gamma): " + this.toInteger(tiltLR) + "\n" +
                "tiltFB (beta): " + this.toInteger(tiltFB) + "\n" +
                "dir (alpha): " + this.toInteger(dir));
        }
    }

    MotionController.prototype.toInteger = function (num) {
        return parseFloat(num).toFixed(0);
    };

    MotionController.prototype.enable = function () { //coms, window) {
        var thisObject = this;
        //this.coms = coms;
        log.info("Enabling MotionController", true);
        if (window.DeviceOrientationEvent) {
            // Listen for the deviceorientation event and handle the raw data
            window.addEventListener('deviceorientation', function (eventData) {
                thisObject.deviceOrientationHandler(eventData)
            }, false);
            this.orientationListener = true;

        } else {
            log.warn("Device orientation event not supported", true, false);
        }
    };

    MotionController.prototype.disable = function (window) {
        if (this.orientationListener) {
            window.removeEventListener("deviceorientation", this.deviceOrientationHandler);
            this.orientationListener = false;
        }
    };
    var tdObj = new MotionController();
    tdObj.enable();
    return function () {
        tdObj.disable(window);
    };
};