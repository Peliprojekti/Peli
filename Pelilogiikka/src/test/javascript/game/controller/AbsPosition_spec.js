describe('the AbsPosition (game) object', function () {
    //Create an easily-removed container for our tests to play in

    var mockPlayer = {
        setPosition: function () {
        },
        shoot: function(){
            
        }
    };
    var mockRpc = {
        exposeRpcMethod: function () {
        }
    };
    var controllerObj;

    beforeEach(function () {
        controllerObj = controller.loadedTypes.absPosition.getController(mockPlayer, mockRpc);

    });

    //Clean it up after each spec
    afterEach(function () {

    });

    //Specs
    describe('AbsPosition (game) tests', function () {

        it('resets player and calls exposeRpcMethod on reset', function () {

            spyOn(mockRpc, 'exposeRpcMethod');

            controllerObj.reset(mockPlayer, mockRpc);

            expect(mockRpc.exposeRpcMethod).toHaveBeenCalled();
            expect(mockRpc.exposeRpcMethod).toHaveBeenCalledWith('position', controllerObj, controllerObj.position);
            expect(mockRpc.exposeRpcMethod).toHaveBeenCalledWith('shoot', controllerObj, controllerObj.shoot);
            expect(controllerObj.player).toBe(mockPlayer);

        });

        it('calls the players setposition function on position call with correct arguments', function () {

            spyOn(mockPlayer, 'setPosition');

            controllerObj.position(5, 10);

            expect(mockPlayer.setPosition).toHaveBeenCalled();
            expect(mockPlayer.setPosition).toHaveBeenCalledWith(5, 10);
        });

        it('calls the players shoot function on shoot call with correct arguments', function () {

            spyOn(mockPlayer, 'shoot');

            controllerObj.shoot();

            expect(mockPlayer.shoot).toHaveBeenCalled();
        });

    });
});