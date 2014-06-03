describe('the Swipe object', function () {
    var canvas;
    var coms;
    var updatePeriod = 20;

    beforeEach(function () {
        canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        coms = {
            call: function (method, params, object, callback) {
            }
        };

        spyOn(coms, 'call');
        client.phone.canvas = canvas;
        client.loadedTypes.Swipe(null, canvas, client.phone, coms, updatePeriod);
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('Swipe tests', function () {
        it('calls coms with the correct method and position parameters on touch start', function () {
            //Touch start event
            var evt = document.createEvent("Events")
            //Aim: initialize it to be the event we want
            evt.initEvent('touchstart', true, true); //true for can bubble, true for cancelable
            evt.targetTouches = [{pageX: 12, pageY: 10}, {pageX: 12, pageY: 10}];
            canvas.dispatchEvent(evt);

            var arr = [(12 / canvas.width), (10 / canvas.height), true];

            expect(coms.call).toHaveBeenCalled();
            expect(coms.call).toHaveBeenCalledWith('swipe', arr, null, null);
        });

        it('calls coms with the correct method and position parameters on touch move', function () {
            //Touch start event
            var evt = document.createEvent("Events")
            evt.initEvent('touchstart', true, true); 
            evt.targetTouches = [{pageX: 4, pageY: 3}, {pageX: 12, pageY: 10}];
            canvas.dispatchEvent(evt);
            
            var date = new Date();
            var curDate = null;
            
            //Wait loop because of send interval
            do {
                curDate = new Date();
            }
            while (curDate - date < updatePeriod + 1);

            //Touch move event
            evt = document.createEvent("Events");
            evt.initEvent('touchmove', true, true);
            evt.targetTouches = [{pageX: 12, pageY: 10}, {pageX: 12, pageY: 10}];
            canvas.dispatchEvent(evt);

            var arr = [(12 / canvas.width), (10 / canvas.height), false];

            expect(coms.call).toHaveBeenCalled();
            expect(coms.call).toHaveBeenCalledWith('swipe', arr, null, null);
        });
    });


});