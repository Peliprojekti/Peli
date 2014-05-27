var controller = controller || {};

controller.motionController = function(container, canvas, phone) {
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
        client.coms.orientation(tiltLR, tiltFB, dir);

        if (DEBUG) {
            log.info("Orientation changed, new orientation:\n" +
                    "tiltLR (gamma): " + this.toInteger(tiltLR) + "\n" +
                    "tiltFB (beta): " + this.toInteger(tiltFB) + "\n" +
                    "dir (alpha): " + this.toInteger(dir));
        }
    }

    //motion integration with server not tested yet
    MotionController.prototype.deviceMotionHandler = function(eventData) {
        // Grab the acceleration from the results
        var acceleration = eventData.acceleration;
        var accelerationIncludingGravity = eventData.accelerationIncludingGravity;
        var rotation = eventData.rotationRate;

        if (DEBUG) {
            log.info("Acceleration: \n" +
                    "x: " + acceleration.x + "\n" +
                    "y: " + acceleration.y + "\n" +
                    "z: " + acceleration.z + "\n" +
                    "Acceleration including gravity \n" +
                    "x: " + accelerationIncludingGravity.x + "\n" +
                    "y: " + accelerationIncludingGravity.y + "\n" +
                    "z: " + accelerationIncludingGravity.z + "\n" +
                    "Rotation:\n" +
                    "x: " + rotation.x + "\n" +
                    "y: " + rotation.y + "\n" +
                    "z: " + rotation.z);
        }

        //lähetä data serverille

    }

    MotionController.prototype.toInteger = function(num) {
        return parseFloat(num).toFixed(0);
    }

    MotionController.prototype.enable = function() {
        var thisObject = this;
        //this.coms = coms;
        log.info("Enabling MotionController", true);
        if (window.DeviceOrientationEvent) {
            // Listen for the deviceorientation event and handle the raw data
            window.addEventListener('deviceorientation', function(eventData) {
                thisObject.deviceOrientationHandler(eventData)
            }, false);

        } else {
            log.warn("Device orientation event not supported", true, false);
        }

        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', deviceMotionHandler, false);
        } else {
            log.warn("Device motion event not supported");
        }
    }

    MotionController.prototype.disable = function(window) {
        window.removeEventListener("deviceorientation", this.doTouchMove);
    }

    var tdObj = new MotionController();
    tdObj.enable(canvas);
    return function() {
        // TODO tässä pitäis olla funktio millä saa disabloitua
    };
};

$(document).ready(function() {
    client.phone.registerController('motionController', controller.motionController);
});
