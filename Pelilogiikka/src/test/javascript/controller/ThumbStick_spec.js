describe('the ThumbStick object', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('ThumbStick tests', function () {

        it('calls coms with the correct method and position parameters on touch start', function () {
            var canvas = document.createElement("canvas");
            canvas.width = 100;
            canvas.height = 100;
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
            canvas.dispatchEvent(evt);

            var arr = [(12 / canvas.width) * 2, (10 / canvas.height) * 2];

            expect(coms.call).toHaveBeenCalled();
            expect(coms.call).toHaveBeenCalledWith('thumbStickPosition', arr, null, null);

        });



    });


});