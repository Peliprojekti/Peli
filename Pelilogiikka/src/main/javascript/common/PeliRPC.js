/*jslint browser: true*/
/*global console: true*/


/**
 * This encapsulate all the comunications stuff
 * @constructor
 * @param {object} connection
 */
var peliRPC = {
    totalMessagesProcessed: 0,
    freeRPCs: [],
    create: function (connection) {
        "use strict";
        return (peliRPC.freeRPCs.length > 0 ?
                peliRPC.freeRPCs.pop().attachConnection(connection) :
                new peliRPC.PeliRPC(connection));
    },
    free: function (rpc) {
        "use strict";
        rpc.clear();
        this.freeRPCs.push(rpc);
    },
    PeliRPC: function (connection) {
        "use strict";
        this.callObject = {};
           this.clear();
           this.connection = connection;
    }
};

peliRPC.PeliRPC.prototype.clear = function () {
    "use strict";
    this.connection = null;
    this.callSequence = 0;
    this.callbacks = {};
    this.rpcMethods = {};
    this.callObject.jsonrpc = "2.0";
    this.callObject.method = null;
    this.callObject.params = null;
    this.callObject.id = null;
};

peliRPC.PeliRPC.prototype.attachConnection = function (connection) {
    "use strict";
    this.connection = connection;
    return this;
};

peliRPC.PeliRPC.prototype.getOnMessage = function () {
    "use strict";
    var that = this,
        onMessage = function (message) {
            peliRPC.totalMessagesProcessed += 1;
            //console.debug("PeliRPC::onMessage() . Received message: ", message);
            var rpc = JSON.parse(message);

            if (rpc.method) {
                if (!rpc.jsonrpc || rpc.jsonrpc !== "2.0" || !rpc.method) {
                    // Invalid JSON-RPC
                    console.error("PeliRPC::onMessage() . Received invalid JSON-RPC message: " + message);
                    that.connection.sendMessage({
                        "jsonrpc": "2.0",
                        "error": {
                            "code": -32600,
                            "message": "Invalid JSON-RPC."
                        },
                        "id": null
                    });
                    return;
                }

                if (!that.rpcMethods.hasOwnProperty(rpc.method)) {
                    // Unknown function
                    console.error("PeliRPC::onMessage() . Received a call to an unknown JSON-RPC method: " + rpc.method);
                    if (rpc.id !== null) {
                        that.connection.sendMessage({
                            "jsonrpc": "2.0",
                            "error": {
                                "code": -32601,
                                "message": "Method " + rpc.method + " not found."
                            },
                            "id": rpc.id
                        });
                    }
                    return;
                }

                try {
                    var rpcMethod = that.rpcMethods[rpc.method];
                    var result = rpcMethod.method.apply(rpcMethod.object, rpc.params);
                    if (rpc.id !== null) {
                        that.connection.sendMessage({
                            "jsonrpc": "2.0",
                            "result": result,
                            "id": rpc.id
                        });
                    } else {
                    }
                } catch (err) {
                    var code = (err.code ? err.code : "");
                    var message = (err.message ? err.message : "");
                    console.error("An exeption got raised when executing a RPC method . Code: " + code + ", message: " + message);
                    if (rpc.id !== null) {
                        that.connection.sendMessage({
                            "jsonrpc": "2.0",
                            "error": {
                                "code": code,
                                "message": message
                            },
                            "id": rpc.id
                        });
                    }
                }
            } else {
                //console.debug("PeliRPC::onMessage() - maybe a return value, for id ", rpc.id);
                if (rpc.id !== undefined && (typeof that.callbacks[rpc.id] !== "undefined")) {
                    if (that.callbacks[rpc.id] === 'undefined') {
                        //console.debug("PeliRPC::onMessage() - nope, no callback for id ", id);
                        return;
                    }

                    if (typeof rpc.result !== "undefined") {
                        //console.debug("PeliRPC::onMessage() - returning value to callback: " + rpc.result);
                        that.callbacks[rpc.id].listener.apply(that.callbacks[rpc.id].object, [rpc.id, null, rpc.result]);
                    } else if (typeof rpc.error !== "undefined") {
                        console.warn("PeliRPC::onMessage() - returning an error to callback: ", rpc.error);
                        that.callbacks[rpc.id].listener.apply(
                            that.callbacks[rpc.id].object, [rpc.id, rpc.error, null]);
                    } else {
                        //console.debug("PeliRPC::onMessage() - calling callbac with no return value");
                        that.callbacks[rpc.id].listener.apply(
                            that.callbacks[rpc.id].object, [rpc.id, null, null]);
                    }

                    delete that.callbacks[rpc.id];
                } else {
                    //console.debug("PeliRPC::onMessage() - oh, whatever, no callbacks for id ", rpc.id);
                }
            }
        };

    return onMessage;
};

peliRPC.PeliRPC.prototype.callRpc = function (method, params, object, listener) {
    "use strict";
    this.callObject['method'] = method;
    this.callObject['params'] = params;
    if (typeof listener === 'function') {
        //console.debug("PeliRPC::callRpc - stroring callback for id ", this.callSequence);
        this.callbacks[this.callSequence] = {
            "object": object,
            "listener": listener
        };
        this.callObject['id'] = this.callSequence;
        this.callSequence += 1;
    }
    else {
        this.callObject['id'] = null;
    }

    this.connection.sendMessage(this.callObject);
    return this.callObject.id;
};

peliRPC.PeliRPC.prototype.exposeRpcMethod = function (name, object_, method_) {
    "use strict";

    if (method_ === undefined || method_ === null)
        throw new Error("Trying to expose undefined method");
    if (this.rpcMethods[name])
        throw new Error("Trying to expose rpcMethods with the same name: " + name);

    this.rpcMethods[name] = {
        object: object_,
        method: method_
    };

    return true;
};
