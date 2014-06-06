

describe('the Swipe (game) object', function () {
    //Create an easily-removed container for our tests to play in

    var mockPlayer = {
        setPosition: function () {

        }
    };
    var mockRpc = {
        exposeRpcMethod: function () {
        }
    };
    var controllerObj;

    beforeEach(function () {
        controllerObj = controller.loadedTypes.Swipe.getController(mockPlayer, mockRpc);

    });

    //Clean it up after each spec
    afterEach(function () {

    });

    //Specs
    describe('Swipe tests', function () {

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
            spyOn(controllerObj, 'calcNewPosition');
            spyOn(controllerObj, 'calcNewDirection');
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
            spyOn(controllerObj, 'calcNewPosition');
            spyOn(controllerObj, 'calcNewDirection');
            controllerObj.previousTime = 4;
            var time = Date.now();
            controllerObj.update(time);

            expect(controllerObj.previousTime).toBe(4);
            expect(controllerObj.calcNewDirection).not.toHaveBeenCalled();
            expect(controllerObj.calcNewPosition).toHaveBeenCalledWith(time);

        });

        it('updates attributes correctly on update if swipe is continuing', function () {
            spyOn(controllerObj, 'calcNewDirection');

            var coords = [7, 15];
            var startCoords = [2, 5];
            controllerObj.pushSwipe(coords[0], coords[1], false);
            controllerObj.startCoords = startCoords;

            var time = Date.now();
            controllerObj.update(time);

            expect(controllerObj.calcNewDirection).toHaveBeenCalledWith(startCoords, coords);

        });

        it('does not allow illegal coordinates to be set with setPosition function', function () {

            var x = 5;
            var y = 10;

            controllerObj.setPosition(x, y);

            expect(controllerObj.x).toBe(0.5);
            expect(controllerObj.y).toBe(0.5);

        });

        it('calculates new position correctly when previous time = 0', function () {
            controllerObj.reset(mockPlayer, mockRpc);
            var direction = new Vector2(1, 1);
            controllerObj.currentDirection = direction;
            controllerObj.time = 0.5;
            controllerObj.previousTime = 0;
            spyOn(controllerObj, 'setPosition');
            var time2 = Date.now();

            controllerObj.calcNewPosition(time2);

            expect(controllerObj.previousTime).toBe(time2);

            var expectedTime = 0.5 + controllerObj.delta;

            expect(controllerObj.time).toBe(expectedTime);
            var currentDir = direction.mul(controllerObj.interpolator.interpolate(controllerObj.time));

            expect(controllerObj.currentDirection).toEqual(currentDir);
            expect(controllerObj.setPosition).toHaveBeenCalledWith(controllerObj.x + currentDir.x * controllerObj.posChangeMul,
                controllerObj.y + currentDir.y * controllerObj.posChangeMul);

        });

        it('calculates new position correctly when previous time != 0', function () {
            controllerObj.reset(mockPlayer, mockRpc);
            var direction = new Vector2(1, 1);
            controllerObj.currentDirection = direction;
            controllerObj.time = 0.5;
            controllerObj.previousTime = 1;
            spyOn(controllerObj, 'setPosition');
            var time2 = Date.now();

            controllerObj.calcNewPosition(time2);

            expect(controllerObj.previousTime).toBe(time2);

            var expectedTime = (time2 - 1) * (controllerObj.delta / 100) + 0.5;

            expect(controllerObj.time).toBe(expectedTime);
            var currentDir = direction.mul(controllerObj.interpolator.interpolate(controllerObj.time));

            expect(controllerObj.currentDirection).toEqual(currentDir);
            expect(controllerObj.setPosition).toHaveBeenCalledWith(controllerObj.x + currentDir.x * controllerObj.posChangeMul,
                controllerObj.y + currentDir.y * controllerObj.posChangeMul);

        });

        it('calculates new direction correctly when previous direction is null', function () {
            controllerObj.time = 5;
            controllerObj.previousDirection = null;

            var beginning = [4, 9];
            var end = [12, 23];
            controllerObj.calcNewDirection(beginning, end);
            var startVect = new Vector2(beginning[0], beginning[1]);
            var endVect = new Vector2(end[0], end[1]);
            var newVect = endVect.sub(startVect);

            expect(controllerObj.time).toBe(0);
            expect(controllerObj.previousDirection).toEqual(newVect);
            expect(controllerObj.currentDirection).toEqual(newVect);
            expect(controllerObj.lastSwipe).toBe(null);

        });

        it('calculates new direction correctly when previous direction is NOT null', function () {
            spyOn(controllerObj, 'setPosition');
            var x = 2;
            var y = 5;

            var vect = new Vector2(x, y);

            controllerObj.previousDirection = vect;

            var beginning = [4, 9];
            var end = [12, 23];
            var startVect = new Vector2(beginning[0], beginning[1]);
            var endVect = new Vector2(end[0], end[1]);
            var newVect = endVect.sub(startVect);
            controllerObj.time = 5;

            x = 7;
            y = 10;

            vect = new Vector2(x, y);
            controllerObj.currentDirection = vect;

            var newDir = controllerObj.currentDirection.add(newVect);

            controllerObj.calcNewDirection(beginning, end);

            expect(controllerObj.time).toBe(0);
            expect(controllerObj.previousDirection).toEqual(newDir);
            expect(controllerObj.currentDirection).toEqual(newDir);
            expect(controllerObj.lastSwipe).toBe(null);
            
            controllerObj.x = 10;
            expect(controllerObj.setPosition).toHaveBeenCalled();

        });
    });
});