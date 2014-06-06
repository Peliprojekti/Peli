/*global peliRPC: true */
/*global describe: true */
/*global expect: true */
/*global it: true */
/*global spyOn: true */

describe('the PeliRPC object', function () {
    "use strict";

    function getConnection() {
        return {
            connected: false,
            send: "noChange",
            connect: function () {
                this.connected = true;
            },
            sendMessage: function (msg) {
                this.send = msg;
            },
            getSentJSON: function() {
                return JSON.parse(this.send);
            }
        };
    }

    function emptyFunc(x) {
        return x + 2;
    }

    describe('constructor', function () {
        it('works correctly', function () {
            var testRPC = peliRPC.create(getConnection());
            expect(testRPC).not.toBe(null);
        });
    });

    describe('factory', function () {
        it('creates and frees new objects', function () {
            /* make sure we have at least one recycled */
            peliRPC.free(peliRPC.create());
            var count = peliRPC.freeRPCs.length,
                testRPC = peliRPC.create();

            expect(testRPC).not.toBe(null);
            expect(peliRPC.freeRPCs.length).toBe(count - 1);

            peliRPC.free(testRPC);
            expect(peliRPC.freeRPCs.length).toBe(count);
        });
    });


    describe('exposeRpcMethod', function () {
        //var rpc = peliRPC.create(getConnection());

        it('throws errors on incorrect calls', function () {
            var rpc = peliRPC.create(getConnection()),
                funcNoMethod = function () {
                    rpc.exposeRpcMethod('no function supplied', null, null);
                };

            expect(funcNoMethod).toThrow();
            try {
                funcNoMethod();
            } catch (e) {
                expect(e.message).toBe("rpcMethod method undefined");
            }
        });

        it('throws error on exposing same method name twice', function () {
            var rpc = peliRPC.create(getConnection()),
                oopsIDidItAgain = function () {
                    rpc.exposeRpcMethod('myname', null, emptyFunc);
                };

            oopsIDidItAgain();
            expect(oopsIDidItAgain).toThrow();
            try {
                oopsIDidItAgain();
            } catch (e) {
                expect(e.message).toBe('rpcMethod name already exposed');
            }

            peliRPC.free(rpc);
        });

        it('accepts proper calls', function () {
            var rpc = peliRPC.create(getConnection());

            expect(function () {
                rpc.exposeRpcMethod('function, no context', null, emptyFunc);
            }).not.toThrow();
            expect(function () {
                rpc.exposeRpcMethod('function, with context', {}, emptyFunc);
            }).not.toThrow();

            peliRPC.free(rpc);
        });
    });

    describe('onMessage', function () {

        it('throws error on recieving mallformed remote json', function () {
            var rpc = peliRPC.create(getConnection()),
                badMsg = function () {
                    rpc.onMessage("bad JSON");
                };

            expect(badMsg).toThrow();
            try {
                badMsg();
            } catch (e) {
                expect(e.message).toBe("Unable to parse JSON string");
            }

            peliRPC.free(rpc);
        });

        it('throw error on recieving unrecognized, but correct JSON', function () {
            var connection = getConnection(),
                rpc = peliRPC.create(connection),
                msg = JSON.stringify({
                    "notRecognized": "x"
                }),
                unrecMsg = function () {
                    rpc.onMessage(msg);
                },
                retval;


            unrecMsg();
            retval = connection.getSentJSON();
            expect(retval.error.code).toBe(-32600);
            expect(retval.error.message).toBe("Invalid Request");

            peliRPC.free(rpc);
        });

        it('sends back error on incorrect rpc version', function () {
            var connection = getConnection(),
                rpc = peliRPC.create(connection);

            rpc.onMessage(JSON.stringify({
                jsonrpc: "1.0",
                method: 'yay'
            }));

            expect(connection.getSentJSON().error.message).toBe("Invalid Request");

            peliRPC.free(rpc);
        });

        it('probperly handles unrecognized remote rpc calls', function () {
            var connection = getConnection(),
                rpc = peliRPC.create(connection),
                retval;

            rpc.onMessage(JSON.stringify({
                jsonrpc: "2.0",
                method: 'testFunction',
                params: [],
                id: 1
            }));

            retval = connection.getSentJSON();

            expect(retval.jsonrpc).toBe('2.0');
            expect(retval.id).toBe(1);
            expect(retval.error.code).toBe(-32601);
            expect(retval.error.message).toBe('Method not found');

            peliRPC.free(rpc);
        });

        it('correctly calls callbakcs on remote rpc calls', function () {
            var connection = getConnection(),
                rpc = peliRPC.create(connection),
                testObject = {
                    testVariable: false,
                    testFunction: function () {
                        this.testVariable = true;
                    },
                    testMethod: function () {
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

            peliRPC.free(rpc);
        });

        it('correctly handles methods throwing errors on remote rpc calls', function () {
            var connection = getConnection(),
                rpc = peliRPC.create(connection);

            rpc.exposeRpcMethod('failFunction', null, function (x, y) {
                throw new Error("OMG", x + y);
            });

            expect(function () {
                rpc.onMessage(JSON.stringify({
                    jsonrpc: "2.0",
                    method: 'failFunction',
                    params: [1, 0],
                    id: null
                }));
            }).not.toThrow();

            expect(connection.lastMessage === 'howdyho');

            expect(function () {
                rpc.onMessage(JSON.stringify({
                    jsonrpc: "2.0",
                    method: 'failFunction',
                    params: [1, 0],
                    id: 1
                }));
            }).not.toThrow();

            expect(connection.lastMessage.jsonrpc).toBe('2.0');
            expect(connection.lastMessage.error).not.toBe(null);
            expect(connection.lastMessage.id).toBe(1);

            peliRPC.free(rpc);
        });

        it('correctly returns values on remote rpc calls', function () {
            var connection = getConnection(),
                rpc = peliRPC.create(connection);

            rpc.exposeRpcMethod('adder', null, function (x, y) {
                return x + y;
            });

            rpc.onMessage(JSON.stringify({
                jsonrpc: "2.0",
                method: 'adder',
                params: [1, 3],
                id: null
            }));

            expect(connection.lastMessage).toBe('howdyho');

            rpc.onMessage(JSON.stringify({
                jsonrpc: "2.0",
                method: 'adder',
                params: [1, 3],
                id: 11
            }));

            expect(connection.lastMessage.jsonrpc).toBe('2.0');
            expect(connection.lastMessage.result).toBe(4);
            expect(connection.lastMessage.id).toBe(11);

            peliRPC.free(rpc);
        });

        it('correctly handles return values from rpc calls', function () {
            var connection = getConnection(),
                rpc = peliRPC.create(connection),
                retval = null,
                id;

            id = rpc.callRpc('tester', [1,2], null, function (id, error, value) {
                retval = value;
            });

            rpc.onMessage(JSON.stringify({
                "jsonrpc": "2.0",
                "result": 'yay',
                "id": id
            }));

            expect(retval).toBe('yay');

            var testObj = {
                id: null,
                error: "some error",
                result: "some result",
                func: function(id, error, result) {
                    this.id = id;
                    this.error = error;
                    this.result = result;
                }
            };

            spyOn(testObj, 'func').andCallThrough();

            id = rpc.callRpc('tester', null, testObj, testObj.func);

            rpc.onMessage(JSON.stringify({
                "jsonrpc": "2.0",
                "id": id
            }));

            expect(testObj.func).toHaveBeenCalled();
            expect(testObj.id).toBe(id);
            expect(testObj.error).toBe(null);
            expect(testObj.result).toBe(null);


            id = rpc.callRpc('tester', null, testObj, testObj.func);
            rpc.onMessage(JSON.stringify({
                "jsonrpc": "2.0",
                "id": id,
                "result": "testerResult"
            }));
            expect(testObj.id).toBe(id);
            expect(testObj.result).toBe("testerResult");
            peliRPC.free(rpc);
        });

        it('correctly handles returned errors after remote calls', function() {
            var rpc = peliRPC.create(connection);
            var retval = null;

            var testObj = {
                id: null,
                error: "some error",
                result: "some result",
                func: function(id, error, result) { 
                    this.id = id;
                    this.error = error;
                    this.result = result;
                }
            };

            id = rpc.callRpc('tester', null, testObj, testObj.func);
            rpc.onMessage(JSON.stringify({
                "jsonrpc": "2.0",
                "id": id,
                "error": "failfailfail"
            }));

            expect(testObj.id).toBe(id);
            expect(testObj.error).toBe("failfailfail");
            peliRPC.free(rpc);
        });

        it('throws errors on too late callbacks', function() {
            var rpc = peliRPC.create(connection);
            var count = peliRPC.maxCallbacks + 10;

            var testObj = {
                id: null,
                error: "some error",
                result: "some result",
                func: function(id, error, result) { 
                    this.id = id;
                    this.error = error;
                    this.result = result;
                }
            };

            while (count > 0) {
                id = rpc.callRpc('tester', null, testObj, testObj.func);
                count--;
            }

            expect(function() {
                rpc.onMessage(JSON.stringify({
                    "id": id-1,
                    "result": "something",
                    "jsonrpc": "2.0"
            }));
            }).toThrow();

            try {
                rpc.onMessage(JSON.stringify({
                    "id": id,
                    "result": "something",
                    "jsonrpc": "2.0"
                }));
            }
            catch(e) {
                expect(e.message).toBe("Callback too old.");
            }
        });
    });
});