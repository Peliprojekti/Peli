describe('the ThumbStick (game) object', function () {
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
        controllerObj = controller.loadedTypes.ThumbStick.getController(mockPlayer, mockRpc);

    });

    //Clean it up after each spec
    afterEach(function () {

    });

    //Specs
    describe('ThumbStick (game) tests', function () {

        it('resets player and calls exposeRpcMethod on reset', function () {

            spyOn(mockRpc, 'exposeRpcMethod');

            controllerObj.x = 10;

            controllerObj.reset(mockPlayer, mockRpc);

            var pos = new Vector2(0, 0);

            expect(mockRpc.exposeRpcMethod).toHaveBeenCalled();
            expect(mockRpc.exposeRpcMethod).toHaveBeenCalledWith('thumbStickPosition', controllerObj, controllerObj.thumbStickPosition);
            expect(mockRpc.exposeRpcMethod).toHaveBeenCalledWith('buttonPushed', controllerObj, controllerObj.buttonPushed);
            expect(controllerObj.x).toBe(0);
            expect(controllerObj.posChangeSpeed).toBe(0.01);
            expect(controllerObj.thumbStickPos).toEqual(pos);
            expect(controllerObj.player).toBe(mockPlayer);

        });

        it('calls players shoot method on buttonpushed', function () {

            spyOn(mockPlayer, 'shoot');

            controllerObj.buttonPushed();

            expect(mockPlayer.shoot).toHaveBeenCalled();

        });

        it('updates position correctly on update', function () {
            spyOn(controllerObj, 'position');
            
            var playerPos = new Vector2(mockPlayer.x, mockPlayer.y);
            var newPos = playerPos.add(controllerObj.thumbStickPos.multiply(controllerObj.posChangeSpeed));

            controllerObj.update();

            expect(controllerObj.position).toHaveBeenCalled();
            expect(controllerObj.position).toHaveBeenCalledWith(newPos);

        });



        it('updates x and thumbstickpos correctly when thumbStickPosition is called with x < 1 && x > 0', function () {
            var x = 0.3;
            var y = 0.7;

            controllerObj.thumbStickPosition(x, y);

            var vect = new Vector2(x - 0.5, y - 1);

            expect(controllerObj.x).toBe(0.3);
            expect(controllerObj.thumbStickPos).toEqual(vect);

        });

        it('updates thumbstickpos correctly when thumbStickPosition is called with x >1 and does not update x', function () {
            controllerObj.x = 0.6;
            var x = 1.1;
            var y = 0.7;

            controllerObj.thumbStickPosition(x, y);

            var vect = new Vector2(0.6 - 0.5, y - 1);

            expect(controllerObj.x).toBe(0.6);
            expect(controllerObj.thumbStickPos).toEqual(vect);

        });

        it('updates player position correctly when the position function is called with valid x and y', function () {
            spyOn(mockPlayer, 'setPosition');
            var x = 0.3;
            var y = 0.7;

            var vect = new Vector2(x, y);

            controllerObj.position(vect);

            expect(mockPlayer.setPosition).toHaveBeenCalled();
            expect(mockPlayer.setPosition).toHaveBeenCalledWith(x, y);

        });

        it('updates x and y correctly when the position function is called with invalid x and y', function () {
            spyOn(mockPlayer, 'setPosition');
            var x = 1.5;
            var y = -0.5;

            var vect = new Vector2(x, y);

            controllerObj.position(vect);

            expect(mockPlayer.setPosition).toHaveBeenCalled();
            expect(vect.x).toBe(mockPlayer.x);
            expect(vect.y).toBe(mockPlayer.y);
        });

    });
});