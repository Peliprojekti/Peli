describe('the Swipe object', function() {
    var canvas;
    var coms;
    
    beforeEach(function() {
        canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        coms = {
            call: function (method, params, object, callback) {
            }
        };

        spyOn(coms, 'call');
        client.phone.canvas = canvas;
        client.loadedTypes.Swipe(null, canvas, client.phone, coms);
    });

    //Clean it up after each spec
    afterEach(function() {
    });

    //Specs
    describe('Swipe tests', function() {
        it('calls coms with the correct method and position parameters on touch start', function () { 
            var evt = document.createEvent("Events")
            //Aim: initialize it to be the event we want
            evt.initEvent('touchstart', true, true); //true for can bubble, true for cancelable
            evt.targetTouches = [{pageX: 12, pageY: 10}, {pageX: 12, pageY: 10}];
            canvas.dispatchEvent(evt);
            
            var arr = [(12 / canvas.width), (10 / canvas.height), 0];
            
            expect(coms.call).toHaveBeenCalled();
            expect(coms.call).toHaveBeenCalledWith('swipe', arr, null, null);
        });
        
        it('calls coms with the correct method and position parameters on touch move', function () { 
            /*
            var evt = document.createEvent("Events")
            //Aim: initialize it to be the event we want
            evt.initEvent('touchmove', true, true); //true for can bubble, true for cancelable
            evt.targetTouches = [{pageX: 12, pageY: 10}, {pageX: 12, pageY: 10}];
            canvas.dispatchEvent(evt);
            
            var arr = [(12 / canvas.width), (10 / canvas.height), 0];
            
            expect(coms.call).toHaveBeenCalled();
            expect(coms.call).toHaveBeenCalledWith('swipe', arr, null, null);
            */
        });
    });


});