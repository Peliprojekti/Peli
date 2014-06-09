describe('the MotionController (client) object', function () {

    var canvas;
    var evt;
    var coms;
    var arr;
    var controllerDisabler;

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {

    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('MotionController tests', function () {

        it('calls coms on device orientation', function () {
            canvas = document.createElement("canvas");
            canvas.width = 100;
            canvas.height = 100;
            coms = {
                call: function (method, params, object, callback) {
                }
            };

            client.loadedTypes.motionController(null, canvas, null, coms);

            spyOn(coms, 'call');
            spyOn(window, 'addEventListener');

            evt = document.createEvent("Events");

            evt.initEvent('deviceorientation', true, true, 10, 20, 30, 5); //true for can bubble, true for cancelable

            var data = {
                gamma : 10,
                beta : 20,
                alpha : 30
            };
            evt.eventData = data;
            window.dispatchEvent(evt);

            var arr = [10, 20, 30];
            expect(coms.call).toHaveBeenCalled();

        });
    });

});