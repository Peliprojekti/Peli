describe('the MotionController (game) object', function () {
    //Create an easily-removed container for our tests to play in
    var mockPlayer = {
        x: 0.55,
        y: 0.15,
        setPosition: function () {
        },
        shoot: function () {
        }
    };
    var mockRpc = {
        exposeRpcMethod: function () {
        }
    };
    var controllerObj;

    beforeEach(function () {
        controllerObj = controller.loadedTypes.motionController.getController(mockPlayer, mockRpc);

    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('MotionController (game) tests', function () {

        it('resets the values correctly and calls exposerpc method with correct values', function () {

            canvas = document.createElement("canvas");
            canvas.width = 100;
            canvas.height = 100;

            spyOn(mockRpc, 'exposeRpcMethod');

            controllerObj.reset(mockPlayer, mockRpc);

            expect(mockRpc.exposeRpcMethod).toHaveBeenCalled();
            expect(mockRpc.exposeRpcMethod).toHaveBeenCalledWith('orientation', controllerObj, controllerObj.orientation);
            expect(mockRpc.exposeRpcMethod).toHaveBeenCalledWith('motion', controllerObj, controllerObj.motion);
            expect(controllerObj.x).toBe(mockPlayer.x);
            expect(controllerObj.y).toBe(mockPlayer.y);
            expect(controllerObj.player).toBe(mockPlayer);
            expect(controllerObj.tiltLR).toBe(0);
            expect(controllerObj.tiltFB).toBe(0);
            expect(controllerObj.multiplier).toBe(0.0001);

        });

        it('sets the correct position when calling the setposition function with valid values', function () {
            spyOn(mockPlayer, 'setPosition');

            var x = 0.4;
            var y = 0.1;

            controllerObj.setPosition(x, y);

            expect(mockPlayer.setPosition).toHaveBeenCalled();
            expect(mockPlayer.setPosition).toHaveBeenCalledWith(x, y);

        });

    });
});