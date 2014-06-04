

describe('the ThumbStick object', function () {
    //Create an easily-removed container for our tests to play in

    var mockPlayer;
    var mockRpc = {
        exposeRpcMethod: function () {
        }
    };
    var controllerObj;

    beforeEach(function () {
        controllerObj = controller.loadedTypes.Swipe.getController(mockPlayer, mockRpc);
        spyOn(controllerObj, 'calcNewPosition');
        spyOn(controllerObj, 'calcNewDirection');
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('ThumbStick tests', function () {

        it('reset function resets attributes correctly', function () {

            spyOn(mockRpc, 'exposeRpcMethod');


            controllerObj.reset(mockPlayer, mockRpc);

            expect(controllerObj.player).toBe(mockPlayer);
            expect(mockRpc.exposeRpcMethod).toHaveBeenCalledWith('swipe', controllerObj, controllerObj.pushSwipe);
            expect(controllerObj.x).toBe(0.5);
            expect(controllerObj.y).toBe(0.5);
            expect(controllerObj.lastSwipe).toBe(null);
            expect(controllerObj.startCoords).toBe(null);
            expect(controllerObj.currentDirection.x).toBe(0);
            expect(controllerObj.currentDirection.y).toBe(0);
            expect(controllerObj.previousDirection).toBe(null);
            expect(controllerObj.interpolator.begin).toBe(1);
            expect(controllerObj.interpolator.end).toBe(0);
            expect(controllerObj.time).toBe(0);
            expect(controllerObj.previousTime).toBe(0);

        });

        it('pushSwipe function works', function () {

            controllerObj.pushSwipe(0, 0, true);
            var arr = [[0, 0], true];

            expect(controllerObj.lastSwipe).toEqual(arr);

        });

        it('updates attributes correctly on update if swipe has been started', function () {

            controllerObj.pushSwipe(7, 15, true);
            controllerObj.previousTime = 10;


            var time = Date.now();
            controllerObj.update(time);
            var coords = [7, 15];

            expect(controllerObj.startCoords).toEqual(coords);
            expect(controllerObj.previousTime).toEqual(0);
            expect(controllerObj.calcNewPosition).toHaveBeenCalled();
            expect(controllerObj.calcNewPosition).toHaveBeenCalledWith(time);
            expect(controllerObj.calcNewDirection).not.toHaveBeenCalled();

        });

        it('calculates new position if lastSwipe is null', function () {

            controllerObj.previousTime = 4;
            var time = Date.now();
            controllerObj.update(time);

            expect(controllerObj.previousTime).toBe(4);
            expect(controllerObj.calcNewDirection).not.toHaveBeenCalled();
            expect(controllerObj.calcNewPosition).toHaveBeenCalledWith(time);

        });

        it('updates attributes correctly on update if swipe is continuing', function () {
            
            var coords = [7, 15];
            var startCoords = [2, 5];
            controllerObj.pushSwipe(coords[0], coords[1], false);
            controllerObj.startCoords = startCoords;

            var time = Date.now();
            controllerObj.update(time);
            
            expect(controllerObj.calcNewDirection).toHaveBeenCalledWith(startCoords, coords);

        });
    });
});