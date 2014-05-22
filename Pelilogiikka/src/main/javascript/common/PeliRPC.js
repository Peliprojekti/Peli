/**
* This encapsulate all the comunications stuff
* @constructor
* @param {object} connection 
*/
function PeliRPC(connection) {
	this.connection = connection;
	this.callbacks = new Object();;
	this.rpcMethods = new Object();
	this.callSequence = 0;

    this.benchmarking = false;
    this.benchmarkLog = [];
}

PeliRPC.prototype.resetBenchmarking = function(isOn) {
    if (isOn) {
        this.benchmarLog = [];
    }   
    this.benchmarking = isOn;
}

PeliRPC.prototype.connect = function(callback) {
	var that = this;
	var closeCallback = function() {
		that.callbacks = new Object();
		that.rpcMethods = new Object();
	};

	var onMessage = null;

	this.connection.connect(callback, closeCallback, onMessage);
}

PeliRPC.prototype.close = function() {
	//this.closeEventCallback = null;
	this.connection.close();
}

PeliRPC.prototype.callRpc = function(method, params, object, listener) {
	if(this.connection.isOpen()) {
		var callObject;

        /*
            not like this...
            Instead use this.callSequence to keep track of these.... 
        j
        if (this.benchmarking) {
            var sendTime = Date.now();
            var origListener = listener;
            var bm = this.benchmarkLog;

            listener = function() {
                bm.push([sendTime, params[0], method, Date.now() - sendTime]);
                typeof origListener == "function" && origListener;
            }
        }
        */

		if(typeof listener == "function") {
			callObject = {
				"jsonrpc": "2.0", 
				"method": method, 
				"params": params, 
				"id": this.callSequence
			};

			callbacks[this.callSequence] = {
				"object": object, 
				"listener": listener
			};
			this.callSequence++;
		}
		else {
			// notification: doesn't expect response object
			callObject = {
				"jsonrpc": "2.0", 
				"method": method, 
				"params": params, 
				"id": null
			};
		}

		this.connection.sendMessage(callObject);
		return callObject.id;
	}
}

PeliRPC.prototype.exposeRpcMethod = function(name, object_, method_) {
	this.rpcMethods[name] = {
		object: object_, 
		method: method_
	};
}

PeliRPC.prototype.setCloseEventListener = function(callback) {
	closeEventCallback = (typeof callback == "function" ? callback : null);
}

PeliRPC.prototype.onMessage = function(message) {
	log.info("RPC::onMessage() " + this.hoststr + ". Received message: " + message);
	var rpc = JSON.parse(message);

	if(rpc.method)  {
	   	if (!rpc.jsonrpc || rpc.jsonrpc != "2.0" || !rpc.method) {
			// Invalid JSON-RPC
			log.error("RPC::onMessage() " + hoststr + ". Received invalid JSON-RPC message: " + message);
			this.sendMessage({"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid JSON-RPC."}, "id": null});
			return;
		}

		if(!rpcMethods.hasOwnProperty(rpc.method)) {
			// Unknown function
			log.error("RPC::onMessage() " + hoststr + ". Received a call to an unknown JSON-RPC method: " + rpc.method);
			if(rpc.id != null) {
				sendMessage({"jsonrpc": "2.0", "error": {"code": -32601, "message": "Method " + rpc.method + " not found."}, "id": rpc.id});
			}
			return;
		}

		try	{
			var rpcMethod = this.rpcMethods[rpc.method];
			var result = this.rpcMethod.method.apply(rpcMethod.object, rpc.params);
			if(rpc.id != null) {
				sendMessage({"jsonrpc": "2.0", "result": result, "id": rpc.id});
			}
		}
		catch(err)
		{
			var code = (err.code ? err.code : "");
			var message = (err.message ? err.message : "");
			log.error("An exeption got raised when executing a RPC method " + hoststr + ". Code: " + code + ", message: " + message);
			if(rpc.id != null) {
				this.sendMessage({"jsonrpc": "2.0", "error": {"code": code, "message": message}, "id": rpc.id});
			}
		}
	}
	else  {
		if(rpc.id && typeof callbacks[rpc.id] != "undefined") {
			if (!callbacks[rpc.id]) {
				return;
			}

			if(typeof rpc.result != "undefined") {
				callbacks[rpc.id].listener.apply(
						callbacks[rpc.id].object, [rpc.id, null, rpc.result]);
			}
			else if (typeof rpc.error != "undefined") {
				callbacks[rpc.id].listener.apply(
						callbacks[rpc.id].object, [rpc.id, rpc.error, null]);
			}
			else {
				callbacks[rpc.id].listener.apply(
						callbacks[rpc.id].object, [rpc.id, null, null]);
			}

			delete callbacks[rpc.id];
		}
	}
}
