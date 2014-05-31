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
        var rpc = new PeliRPC(connection);

        it('throws errors on incorrect calls', function() {
            expect(function() {
                rpc.exposeRpcMethod("just a string");
            }).toThrow();
            expect(function() {
                rpc.exposeRpcMethod('no function supplied', null, null);
            }).toThrow();
        });

        it('accepts proper calls', function() {
            expect(
                rpc.exposeRpcMethod('function, no context', null, function() {})
                ).toBe(true);
            expect(
                rpc.exposeRpcMethod('function, with context', null, function() {})
                ).toBe(true);
        });

        it('throws error on exposing same method name twice', function() {
            rpc.exposeRpcMethod('myname', null, function() {});
            expect(function() {
                rpc.exposeRpcMethod('myname', null, function() {});
            }).toThrow();
        });
    });
});