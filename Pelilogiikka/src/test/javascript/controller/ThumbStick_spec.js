describe('the ThumbStick object', function () {
    //Create an easily-removed container for our tests to play in
    var canvas;
    var evt;
    var coms;

    beforeEach(function () {

    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('ThumbStick tests', function () {

        it('calls coms with the correct method and position parameters on touch start', function () {
            canvas = document.createElement("canvas");
            canvas.width = 100;
            canvas.height = 100;

            coms = {
                call: function (method, params, object, callback) {
                }
            };

            spyOn(coms, 'call');
            evt = document.createEvent("Events");

            client.loadedTypes.ThumbStick(null, canvas, null, coms);
            //Aim: initialize it to be the event we want
            evt.initEvent('touchstart', true, true); //true for can bubble, true for cancelable
            evt.targetTouches = [{pageX: 12, pageY: 10}, {pageX: 12, pageY: 10}];

            canvas.dispatchEvent(evt);

            var arr = [(12 / canvas.width) * 2, (10 / canvas.height) * 2];

            expect(coms.call).toHaveBeenCalled();
            expect(coms.call).toHaveBeenCalledWith('thumbStickPosition', arr, null, null);


        });


        it('calls coms with the correct method and position parameters on touch move', function () {
            spyOn(coms, 'call');
            evt.initEvent('touchmove', true, true); //true for can bubble, true for cancelable
            evt.targetTouches = [{pageX: 18, pageY: 5}, {pageX: 7, pageY: 6}];
            canvas.dispatchEvent(evt);

            var arr = [(18 / canvas.width) * 2, (5 / canvas.height) * 2];

            expect(coms.call).toHaveBeenCalled();
            expect(coms.call).toHaveBeenCalledWith('thumbStickPosition', arr, null, null);

        });

        it('calls coms with the correct method and position parameters on touch end', function () {
            spyOn(coms, 'call');
            evt.initEvent('touchend', true, true); //true for can bubble, true for cancelable
            evt.changedTouches = [{pageX: 18, pageY: 5}, {pageX: 7, pageY: 6}];
            canvas.dispatchEvent(evt);

            var arr = [0.5, 1];

            expect(coms.call).toHaveBeenCalled();
            expect(coms.call).toHaveBeenCalledWith('thumbStickPosition', arr, null, null);

        });
    });
});