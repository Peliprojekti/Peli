describe('the ThumbStick object', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('ThumbStick tests', function () {

        it('initializes the canvas', function () {
            var canvas = document.createElement("canvas");
            var coms = {
                call: function (method, params, object, callback) {
                }
            };

            spyOn(coms, 'call');

            client.loadedTypes.ThumbStick(null, canvas, null, coms);

            var evt = document.createEvent("Events")
            //Aim: initialize it to be the event we want
            evt.initEvent('touchstart', true, true); //true for can bubble, true for cancelable
            evt.targetTouches = [{pageX: 12, pageY: 10}, {pageX: 12, pageY: 10}];
            //FIRE!
            canvas.dispatchEvent(evt);
            
            expect(coms.call).toHaveBeenCalled();
        });

    });


});