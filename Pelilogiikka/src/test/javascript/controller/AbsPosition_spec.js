describe('the AbsPosition object', function() {

    //Create an easily-removed container for our tests to play in
    beforeEach(function() {
    });

    //Clean it up after each spec
    afterEach(function() {
    });

    //Specs
    describe('AbsPosition tests', function() {
        it('calls coms with the correct method and position parameters on touch move', function () {
            var canvas = document.createElement("canvas");
            canvas.width = 100;
            canvas.height = 100;

            var coms = {
                call: function (method, params, object, callback) {
                }
            };

            spyOn(coms, 'call');
            
            evt = document.createEvent("Events");
            
            var interval = 20;
            
            client.loadedTypes.absPosition(null, canvas, null, coms, interval);
            //Aim: initialize it to be the event we want
            evt.initEvent('touchmove', true, true); //true for can bubble, true for cancelable
            evt.changedTouches = [{clientX: 12, clientY: 10}];
            
            var date = Date.now();
            do {
                curDate = Date.now();
            }
            while (curDate - date < interval + 1);

            canvas.dispatchEvent(evt);

            var arr = [(12 / canvas.width), (10 / canvas.height)];

            expect(coms.call).toHaveBeenCalled();
            expect(coms.call).toHaveBeenCalledWith('position', arr, null, null);


        });


    });


});