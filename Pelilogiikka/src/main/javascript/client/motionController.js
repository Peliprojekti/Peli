function MotionController() {
    this.coms = null;
}

MotionController.prototype.deviceOrientationHandler = function(eventData) {
    // event.preventDefault();

    // gamma is the left-to-right tilt in degrees, where right is positive
    var tiltLR = eventData.gamma;

    // beta is the front-to-back tilt in degrees, where front is positive
    var tiltFB = eventData.beta;

    // alpha is the compass direction the device is facing in degrees
    var dir = eventData.alpha;

    //  send data to server
    coms.orientation(tiltLR, tiltFB, dir);

    if (DEBUG) {
        log.info("Orientation changed, new orientation:\n" +
                "tiltLR (gamma): " + this.toInteger(tiltLR) + "\n" +
                "tiltFB (beta): " + this.toInteger(tiltFB) + "\n" +
                "dir (alpha): " + this.toInteger(dir));
    }


    if (DEBUG) {
        updateCoordinatesText(this.coords[0], this.coords[1])
    }
    ;
}

MotionController.prototype.toInteger = function(num) {
    return parseFloat(num).toFixed(0);
}

MotionController.prototype.enable = function(coms, window) {
    var thisObject = this;
    if (window.DeviceOrientationEvent) {
        // Listen for the deviceorientation event and handle the raw data
        window.addEventListener('deviceorientation', function(eventData) {
            thisObject.deviceOrientationHandler(eventData)
        }, false);

    } else {
        log.warn("Device orientation event not supported", true);
    }

    log.coms = coms;
}

MotionController.prototype.disable = function(window) {
    window.removeEventListener("deviceorientation", this.doTouchMove);
}
