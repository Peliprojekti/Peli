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
            send: null,
            connect: function () {
                this.connected = true;
            },
            sendMessage: function (msg) {
                this.send = msg;
            },
            getSentJSON: function() {
                return (this.send ? JSON.parse(this.send) : null);
            }
        };
    }

    function getTestObj () {
        return {
            id: null,
            error: null,
            result: null,
            func: function(r_id, r_error, r_result) {
                this.id = r_id;
                this.error = r_error;
                this.result = r_result;
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

    describe('callRPC', function () {
        it('works without callbacks', function () {
            var connection = getConnection(),
                rpc = peliRPC.create(connection);

            expect(function () {
                rpc.callRPC('someMethod', null, null, null);
            });

            expect(connection.getSentJSON().method).toBe('someMethod');
        });

        it('properly registers callbacks', function () {
            var connection = getConnection(),
                rpc = peliRPC.create(connection);
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
                throw new Error("OMG" + (x + y));
            });

            expect(function () {
                rpc.onMessage(JSON.stringify({
                    jsonrpc: "2.0",
                    method: 'failFunction',
                    params: [1, 0],
                    id: null
                }));
            }).not.toThrow();
            
            expect(connection.getSentJSON()).toBe(null);

            expect(function () {
                rpc.onMessage(JSON.stringify({
                    jsonrpc: "2.0",
                    method: 'failFunction',
                    params: [1, 0],
                    id: 1
                }));
            }).not.toThrow();

            //expect(connection.lastMessage.jsonrpc).toBe('2.0');
            expect(connection.getSentJSON().error.message).not.toBe("OMG1");
            expect(connection.getSentJSON().id).toBe(1);

            peliRPC.free(rpc);
        });

        it('correctly returns values on remote rpc calls', function () {
            var connection = getConnection(),
                rpc = peliRPC.create(connection),
                sentJSON;

            rpc.exposeRpcMethod('adder', null, function (x, y) {
                return x + y;
            });

            rpc.onMessage(JSON.stringify({
                jsonrpc: "2.0",
                method: 'adder',
                params: [1, 3],
                id: null
            }));

            expect(connection.getSentJSON()).toBe(null);

            rpc.onMessage(JSON.stringify({
                jsonrpc: "2.0",
                method: 'adder',
                params: [1, 3],
                id: 11
            }));

            sentJSON = connection.getSentJSON();

            expect(sentJSON.jsonrpc).toBe('2.0');
            expect(sentJSON.result).toBe(4);
            expect(sentJSON.id).toBe(11);

            peliRPC.free(rpc);
        });

        it('correctly handles return values from rpc calls', function () {
            var connection = getConnection(),
                rpc = peliRPC.create(connection),
                retval = null,
                testObj = getTestObj(),
                id, first_id;

            // Test function callback with return value
            first_id = rpc.callRpc('tester', [1,2], null, function (id, error, value) {
                retval = value;
            });

            expect(function() {
                rpc.onMessage(JSON.stringify({
                    "jsonrpc": "2.0",
                    "result": 'yay',
                    "id": first_id
                }));
            }).not.toThrow();

            expect(retval).toBe('yay');

            // Test method callback with no return value
            id = rpc.callRpc('tester', null, testObj, testObj.func);
            expect(id).toBe(first_id + 1);

            expect(function() {
                rpc.onMessage(JSON.stringify({
                    "jsonrpc": "2.0",
                    "id": id
                }));
            }).not.toThrow();

            expect(testObj.id).toBe(id);
            expect(testObj.error).toBe(null);
            expect(testObj.result).toBe(null);

            // Test method callback with return value
            id = rpc.callRpc('tester', null, testObj, testObj.func);
            expect(id).toBe(first_id + 2);
            expect(function() {
                rpc.onMessage(JSON.stringify({
                    "jsonrpc": "2.0",
                    "result": "testerResult",
                    "id": id
                }));
            }).not.toThrow();

            expect(testObj.id).toBe(id);
            expect(testObj.error).toBe(null);
            expect(testObj.result).toBe("testerResult");

            peliRPC.free(rpc);
        });

        it('correctly handles returned errors after remote calls', function () {
            var connection = getConnection(),
                rpc = peliRPC.create(connection),
                testObj = getTestObj(),
                id;

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

        it('throws errors on too late callbacks', function () {
            var connection = getConnection(),
                rpc = peliRPC.create(connection),
                testObj = getTestObj(),
                count = peliRPC.maxCallbacks,
                first_id;

            first_id = rpc.callRpc('tester', null, testObj, testObj.func);
            while (count > 0) {
                rpc.callRpc('tester', null, testObj, testObj.func);
                count -= 1;
            }

            expect(function () {
                rpc.onMessage(JSON.stringify({
                    "id": first_id,
                    "result": "something",
                    "jsonrpc": "2.0"
                }));
            }).toThrow();

            try {
                rpc.onMessage(JSON.stringify({
                    "id": first_id,
                    "result": "something",
                    "jsonrpc": "2.0"
                }));
            } catch (e) {
                expect(e.message).toBe("Callback too old, unable to return value form remote RPC call");
            }
        });
    });

});