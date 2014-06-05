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

        it('throws error on mallformed remote rpc calls', function() {
            expect(function() {
                rpc.onMessage("jaadajaadajaa");
            }).toThrow();
        });

        it('probperly handles unrecognized remote rpc calls', function() {
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

        it('correctly calls callbakcs on remote rpc calls', function() {
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

        it('correctly handles methods throwing errors on remote rpc calls', function() {
            connection = {
                lastMessage: "howdyho",
                connect: function() {},
                sendMessage: function(msg) {
                    this.lastMessage = msg;
                }
            };

            rpc = peliRPC.create(connection);

            rpc.exposeRpcMethod('failFunction', null, function(x,y) {
                throw new Error("OMG");
                return x/y;
            });

            expect(function () {
                rpc.onMessage(JSON.stringify({
                    jsonrpc: "2.0",
                    method: 'failFunction',
                    params: [1,0],
                    id: null
                }));
            }).not.toThrow();

            expect(connection.lastMessage === 'howdyho');

            expect(function () {
                rpc.onMessage(JSON.stringify({
                    jsonrpc: "2.0",
                    method: 'failFunction',
                    params: [1,0],
                    id: 1
                }));
            }).not.toThrow();

            expect(connection.lastMessage.jsonrpc).toBe('2.0');
            expect(connection.lastMessage.error).not.toBe(null);
            expect(connection.lastMessage.id).toBe(1);
        });

        it('correctly returns values on remote rpc calls', function() {
            connection = {
                lastMessage: "howdyho",
                connect: function() {},
                sendMessage: function(msg) {
                    this.lastMessage = msg;
                }
            };

            rpc = peliRPC.create(connection);

            rpc.exposeRpcMethod('adder', null, function(x,y) {
                return x + y;
            });

            rpc.onMessage(JSON.stringify({
                jsonrpc: "2.0",
                method: 'adder',
                params: [1,3],
                id: null
            }));

            expect(connection.lastMessage).toBe('howdyho');

            rpc.onMessage(JSON.stringify({
                jsonrpc: "2.0",
                method: 'adder',
                params: [1,3],
                id: 11
            }));

            expect(connection.lastMessage.jsonrpc).toBe('2.0');
            expect(connection.lastMessage.result).toBe(4);
            expect(connection.lastMessage.id).toBe(11);
        });

        it('correctly handles return values from rpc calls', function() {
            var retval = null;

            rpc = peliRPC.create(connection);

            var id = rpc.callRpc('tester', [1,2], null, function(id, error, value) {
                retval = value;
            });

            rpc.onMessage(JSON.stringify({
                "jsonrpc": "2.0",
                "result": 'yay',
                "id": id
            }));

            expect(retval).toBe('yay');
        });
    });
});