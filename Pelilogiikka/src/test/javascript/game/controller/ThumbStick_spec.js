describe('the ThumbStick (game) object', function () {
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
        controllerObj = controller.loadedTypes.ThumbStick.getController(mockPlayer, mockRpc);

    });

    //Clean it up after each spec
    afterEach(function () {

    });

    //Specs
    describe('ThumbStick (game) tests', function () {

        it('resets player and calls exposeRpcMethod on reset', function () {

            spyOn(mockRpc, 'exposeRpcMethod');

            controllerObj.reset(mockPlayer, mockRpc);

            expect(mockRpc.exposeRpcMethod).toHaveBeenCalled();
            expect(mockRpc.exposeRpcMethod).toHaveBeenCalledWith('thumbStickPosition', controllerObj, controllerObj.thumbStickPosition);
            

        });

    });
});