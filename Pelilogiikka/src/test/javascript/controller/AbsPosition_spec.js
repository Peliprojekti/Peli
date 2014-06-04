describe('the AbsPosition object', function () {

    var canvas;
    var evt;
    var coms;
    var arr;


    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('AbsPosition tests', function () {

        it('calls coms with the correct method and position parameters on touch move', function () {
            canvas = document.createElement("canvas");
            canvas.width = 100;
            canvas.height = 100;
            coms = {
                call: function (method, params, object, callback) {
                }
            };
            client.loadedTypes.absPosition(null, canvas, null, coms);

            spyOn(coms, 'call');
            evt = document.createEvent("Events");

            //Aim: initialize it to be the event we want     
            evt.initEvent('touchmove', true, true); //true for can bubble, true for cancelable
            evt.changedTouches = [{clientX: 12, clientY: 10}, {clientX: 12, clientY: 10}];


            var time = Date.now();
            while (Date.now() - time < 20)
                ;

            canvas.dispatchEvent(evt);

            arr = [(12 / canvas.width), (10 / canvas.height)];
            expect(coms.call).toHaveBeenCalled();
            expect(coms.call).toHaveBeenCalledWith('position', arr, null, null);

        });

//        it('calls coms with the correct method and position parameters on mousemove event', function () {
//
//            spyOn(coms, 'call');
//            evt = document.createEvent("Events");
//
//            //Aim: initialize it to be the event we want     
//            evt.initEvent('mousemove', true, true); //true for can bubble, true for cancelable
//            evt.clientX = 15;
//            evt.clientY = 30;
//
//            canvas.dispatchEvent(evt);
//
//            arr = [evt.clientX / canvas.width, evt.clientY / canvas.height];
//            expect(coms.call).toHaveBeenCalled();
//            expect(coms.call).toHaveBeenCalledWith('position', arr, null, null);
//
//        });
//
//        it('calls coms with the correct method and position parameters on click event', function () {
//
//            spyOn(coms, 'call');
//            evt = document.createEvent("Events");
//
//            //Aim: initialize it to be the event we want     
//            evt.initEvent('click', true, true); //true for can bubble, true for cancelable
//
//            canvas.dispatchEvent(evt);
//
//            arr = [];
//            expect(coms.call).toHaveBeenCalled();
//            expect(coms.call).toHaveBeenCalledWith('shoot', arr, null, null);
//
//        });

    });
});