describe('the PeliRPC object', function() {
    var connection;

    beforeEach(function() {
        connection = {
            lastMessage: "howdyho",
            connect: function() {},
            sendMessage: function(msg) {
                this.lastMessage = msg;
            }
        };
    });

    afterEach(function() {
    });

    describe('constructor test', function() {
        it('works correctly', function() {
            var testPRPC = peliRPC.create(connection);
        });
    });

    describe('exposeRpcMethod tests', function() {
        var rpc = peliRPC.create(connection);

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
                rpc.exposeRpcMethod('function, with context', new Object(), function() {})
                ).toBe(true);
        });

        it('throws error on exposing same method name twice', function() {
            rpc.exposeRpcMethod('myname', null, function() {});
            expect(function() {
                rpc.exposeRpcMethod('myname', null, function() {});
            }).toThrow();
        });
    });

    describe('onMessage tests', function() {
        var rpc = peliRPC.create(connection);

        it('throws error on mallformed rpc message', function() {
            expect(function() {
                rpc.onMessage("jaadajaadajaa");
            }).toThrow();
        });

        it('probperly handles unrecognized rpc mehtods', function() {
            connection = {
                lastMessage: "howdyho",
                connect: function() {},
                sendMessage: function(msg) {
                    this.lastMessage = msg;
                }
            };

            rpc = peliRPC.create(connection);

            rpc.onMessage(JSON.stringify({
                jsonrpc: "2.0",
                method: 'testFunction',
                params: [],
                id: 1
            }));

            expect(connection.lastMessage.jsonrpc).toBe('2.0');
            expect(connection.lastMessage.error.code).toBe(-32601);
            expect(connection.lastMessage.error.message).toBe('Method testFunction not found.');
            expect(connection.lastMessage.id).toBe(1);
        });

        it('correctly calls method callbakcs', function() {
            var testObject = {
                testVariable: false,
                testFunction: function() { 
                    this.testVariable = true;
                },
                testMethod: function() {
                    this.testVariable = true;
                }
            };

            spyOn(testObject, 'testFunction');

            rpc.exposeRpcMethod('testFunction', null, testObject.testFunction);
            rpc.onMessage(JSON.stringify({
                jsonrpc: "2.0",
                method: 'testFunction',
                params: [],
                id: null
            }));

            expect(testObject.testFunction).toHaveBeenCalled();
            expect(testObject.testVariable).toBe(false); 

            rpc.exposeRpcMethod('testMethod', testObject, testObject.testMethod);
            rpc.onMessage(JSON.stringify({
                jsonrpc: "2.0",
                method: 'testMethod',
                params: [],
                id: null
            }));

            expect(testObject.testVariable).toBe(true);
        });
    });

});