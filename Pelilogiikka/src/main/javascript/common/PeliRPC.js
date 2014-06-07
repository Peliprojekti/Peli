/*jslint browser: true*/
/*global console: true*/


/**
 * This encapsulate all the comunications stuff
 * @constructor
 * @param {object} connection
 */
var peliRPC = {
    totalMessagesProcessed: 0,
    maxCallbacks: 50, /* should be more than enough on reasonable response times and load */
    freeRPCs: [],
    create: function (connection) {
        "use strict";
        return (peliRPC.freeRPCs.length > 0 ?
                this.freeRPCs.pop().attachConnection(connection) :
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

peliRPC.PeliRPC.prototype.returnError = function (code, message, data, rpcid) {
    "use strict";
    var msg = {
        "jsonrpc": "2.0",
        "error": {
            "code": code,
            "message": message
        },
        "id": "woohoo"
    };

    if (data !== 'undefined' && data !== null) {
        msg.data = data;
    }
    if (rpcid !== 'undefined' || rpcid !== null) {
        msg.id = rpcid;
    }

    console.warn("PreliRPC::returnError - ", msg);
    this.connection.sendMessage(JSON.stringify(msg));
};

peliRPC.PeliRPC.prototype.onMessage = function (message) {
    "use strict";
    peliRPC.totalMessagesProcessed += 1;

    var rpc = JSON.parse(message);
    /*
    try { // skip unlikely error handling for performance?
        rpc = JSON.parse(message);
    } catch(e) {
        this.returnError(-32600, "Parse error", message);
    }
    */

    if (!rpc.jsonrpc || rpc.jsonrpc !== "2.0") {
        console.error("PeliRPC::onMessage() - received invalid JSON-RPC message: " + message);
        this.returnError(-32600, "Invalid Request", message); // JSON-RPC spec error code & message
    } else {
        if (rpc.method !== undefined) {
            this.onMessageMethodCall(rpc);
        } else if (rpc.id !== undefined && (this.callbacks[rpc.id] !== undefined)) {
            this.onMessageReturnValue(rpc);
        } else {
            console.error("PeliRPC::onMessage - recieved invalid JSON-RPC message: ", message);
            this.returnError(-32600, "Invalid Request", message); // JSON-RPC spec error code & message
        }
    }
};

peliRPC.PeliRPC.prototype.onMessageMethodCall = function (rpc) {
    "use strict";
    var rpcMethod, result;

    if (!this.rpcMethods.hasOwnProperty(rpc.method)) {
        console.error("PeliRPC::onMessage() . Received a call to an unknown JSON-RPC method: " + rpc.method);
        if (rpc.id !== null) {
            this.returnError(-32601, "Method not found", rpc.method, rpc.id);
        }
        return;
    }

    try { // keeping this try/catch since this is kinda nice to know....
        rpcMethod = this.rpcMethods[rpc.method];
        result = rpcMethod.method.apply(rpcMethod.object, rpc.params);
        if (rpc.id !== null) {
            this.connection.sendMessage(JSON.stringify({
                "jsonrpc": "2.0",
                "result": result,
                "id": rpc.id
            }));
        }
    } catch (err) {
        console.error("An exeption got raised when executing a RPC method", err);
        if (rpc.id !== null) {
            this.returnError(-32001, "error executing rpcMethod", err, rpc.id);
        }
    }
};

peliRPC.PeliRPC.prototype.onMessageReturnValue = function (rpc) {
    "use strict";

    if (rpc.id > (this.callSequence - peliRPC.maxCallbacks)) {
        rpc.id = (rpc.id % peliRPC.maxCallbacks);

        if (this.callbacks[rpc.id] === undefined) {
            throw new Error("callback missing for rpc result with id: " + rpc.id);
        }

        if (rpc.result !== undefined) {
            //console.debug("PeliRPC::onMessage() - returning value to callback: " + rpc.result);
            this.callbacks[rpc.id].listener.apply(this.callbacks[rpc.id].object, [rpc.id, null, rpc.result]);
        } else if (rpc.error !== undefined) {
            console.error("PeliRPC::onMessage() - returning an error to callback: ", rpc.error);
            this.callbacks[rpc.id].listener.apply(
                this.callbacks[rpc.id].object,
                [rpc.id, rpc.error, null]
            );
        } else {
            //console.debug("PeliRPC::onMessage() - calling callbac with no return value");
            this.callbacks[rpc.id].listener.apply(
                this.callbacks[rpc.id].object,
                [rpc.id, null, null]
            );
        }

        delete this.callbacks[rpc.id];
    } else {
        throw new Error("Callback too old id:" + rpc.id + ", sequence: " + this.callSequence + ", maxCallbacks: " + peliRPC.maxCallbacks);
    }
};

peliRPC.PeliRPC.prototype.callRpc = function (method, params, object, listener) {
    "use strict";
    this.callObject.method = method;
    this.callObject.params = params;
    if (typeof listener === 'function') {
        var modSeq = this.callSequence % peliRPC.maxCallbacks;
        //console.debug("PeliRPC::callRpc - stroring callback for id ", this.callSequence, peliRPC.maxCallbacks, realSeq);
        this.callbacks[modSeq] = {
            "object": object,
            "listener": listener
        };
        this.callObject.id = this.callSequence;
        this.callSequence += 1;
    } else {
        this.callObject.id = null;
    }

    this.connection.sendMessage(JSON.stringify(this.callObject));
    return this.callObject.id;
};

peliRPC.PeliRPC.prototype.exposeRpcMethod = function (name, object, method) {
    "use strict";

    if (method === undefined || method === null) {
        throw new Error("rpcMethod method undefined");
    }
    if (this.rpcMethods[name]) {
        throw new Error("rpcMethod name already exposed");
    }

    this.rpcMethods[name] = {
        object: object,
        method: method
    };
};
