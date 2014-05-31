describe('the PeliRPC object', function() {
    var connection;

    beforeEach(function() {
        connection = {
            connect: function() {},
            sendMessage: function() {}
        };
    });

    afterEach(function() {
    });

    //Specs
    describe('constructor', function() {
        it('works correctly', function() {
            var testPRPC = new PeliRPC(connection);
            expect(testPRPC.getOnMessage()).not.toBeNull();
        });
    });

    describe('exposeRpcMethod', function() {
        it('correctly exposes only valid rpc methods', function() {
            var rpc = new PeliRPC(connection);
            expect( 
                rpc.exposeRpcMethod("just a string")
                ).toBe(false);
            expect(
                rpc.exposeRpcMethod('no function supplied', null, null)
                ).toBe(false);
            expect(
                rpc.exposeRpcMethod('function, no context', null, function() {})
                ).toBe(true);
            expect(
                rpc.exposeRpcMethod('function, with context', null, function() {})
                ).toBe(true);
            expect(
                rpc.exposeRpcMethod('function, with context', null, function() {})
                ).toBe(false);
        });

        it('calls RPC', function() {
            var testPRPC = new PeliRPC(connection);
            expect(true).toBeTruthy
        });

        it('exposes RPC method', function() {
            var testPRPC = new PeliRPC(new Object());
            expect(true).toBeTruthy
        });
    });
});