describe('the ThumbStick object', function () {
    //Create an easily-removed container for our tests to play in
    var canvas;
    var evt;
    var coms;
    var disabler;

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

            disabler = client.loadedTypes.ThumbStick(null, canvas, null, coms);
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

        it('disables all the event listeners when the disable function is called', function () {
            spyOn(canvas, 'removeEventListener');
            disabler();
            expect(canvas.removeEventListener).toHaveBeenCalled();
            expect(canvas.removeEventListener).toHaveBeenCalledWith("touchstart", jasmine.any(Function), false);
            expect(canvas.removeEventListener).toHaveBeenCalledWith("touchend", jasmine.any(Function), false);
            expect(canvas.removeEventListener).toHaveBeenCalledWith("touchmove", jasmine.any(Function), false);

        });

        it('draws correctly', function () {
            /*
             context.strokeStyle = "#FF0000";
             context.fillStyle = "#FFFF00";
             context.beginPath();
             context.arc(x, y, r, 0, Math.PI * 2, true);
             context.closePath();
             context.stroke();
             context.fill();
             */

            evt = document.createEvent("Events");

            client.loadedTypes.ThumbStick(null, canvas, null, coms);
            //Aim: initialize it to be the event we want
            evt.initEvent('touchstart', true, true); //true for can bubble, true for cancelable
            evt.targetTouches = [{pageX: 12, pageY: 10}, {pageX: 12, pageY: 10}];

            canvas.dispatchEvent(evt);

            var ctx = canvas.getContext("2d");
            spyOn(ctx, 'beginPath');
            spyOn(ctx, 'closePath');
            spyOn(ctx, 'arc');
            spyOn(ctx, 'stroke');
            spyOn(ctx, 'fill');

            var controllerObj = client.loadedTypes['ThumbStick'];
            controllerObj.draw(ctx);
            expect(ctx.beginPath).toHaveBeenCalled();
            expect(ctx.arc).toHaveBeenCalled();
            expect(ctx.arc).toHaveBeenCalledWith(12, 10, 10, 0, Math.PI * 2, true);
            expect(ctx.closePath).toHaveBeenCalled();
            expect(ctx.stroke).toHaveBeenCalled();
            expect(ctx.fill).toHaveBeenCalled();
        });
    });
});