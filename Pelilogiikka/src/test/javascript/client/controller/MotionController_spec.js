describe('the MotionController (client) object', function () {

    var canvas;
    var evt;
    var coms;
    var controllerDisabler;
    var old_deviceOrEvt;

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
        old_deviceOrEvt = window.DeviceOrientationEvent;
        window.DeviceOrientationEvent = true;
        canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        coms = {
            call: function (method, params, object, callback) {
            }
        };
        controllerDisabler = client.loadedTypes.motionController(null, canvas, null, coms);
    });

    //Clean it up after each spec
    afterEach(function () {
        window.DeviceOrientationEvent = old_deviceOrEvt;
    });

    //Specs
    describe('MotionController tests', function () {
        it('calls coms on device orientation event', function () {
            spyOn(coms, 'call');
            evt = document.createEvent("Events");
            evt.initEvent('deviceorientation', true, true, 10, 20, 30, 5); //true for can bubble, true for cancelable
            var data = {
                gamma: 10,
                beta: 20,
                alpha: 30
            };
            evt.eventData = data;
            window.dispatchEvent(evt);
            var arr = [10, 20, 30];
            expect(coms.call).toHaveBeenCalled();
        });

        it('the disabling function removes the deviceorientationevent listener', function () {
            spyOn(window, 'removeEventListener');
            controllerDisabler();
            expect(window.removeEventListener).toHaveBeenCalledWith('deviceorientation', jasmine.any(Function));
        });
    });

});