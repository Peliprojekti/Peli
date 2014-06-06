/*jslint browser: true*/
/*global peliAudio: true*/
/*global client: false*/
var client = client || {};

client.loadedTypes = client.loadedTypes || [];
client.loadedTypes.motionController = function(container, canvas, phone, coms) {
	function MotionController() {
		this.orientationListener = false;   //boolean tells wehter the listener exists
        this.motionListener = false;        //boolean tells wehter the listener exists
	}

	MotionController.prototype.deviceOrientationHandler = function(eventData) {
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

		//coms.call('motion', eventData, null, null);

	};

	MotionController.prototype.toInteger = function(num) {
		return parseFloat(num).toFixed(0);
	};

	MotionController.prototype.enable = function() { //coms, window) {
		var thisObject = this;
		//this.coms = coms;
		log.info("Enabling MotionController", true);
		if (window.DeviceOrientationEvent) {
			// Listen for the deviceorientation event and handle the raw data
			window.addEventListener('deviceorientation', function(eventData) {
					thisObject.deviceOrientationHandler(eventData)
					}, false);
            this.orientationListener = true;

		} else {
			log.warn("Device orientation event not supported", true, false);
		}

//		if (window.DeviceMotionEvent) {
//			window.addEventListener('devicemotion', deviceMotionHandler, false);
//            this.motionListener = true;
//		} else {
//			log.warn("Device motion event not supported");
//		}
	};

	MotionController.prototype.disable = function(window) {
        if(this.orientationListener){
            window.removeEventListener("deviceorientation", this.deviceOrientationHandler);
            this.orientationListener = false;
        }
		if(this.motionListener){
            window.removeEventListener("devicemotion", this.deviceMotionHandler);
            this.motionListener = false;
        }
	};

    var tdObj = new MotionController();
    tdObj.enable();
    return tdObj.disable.bind(tdObj);
};