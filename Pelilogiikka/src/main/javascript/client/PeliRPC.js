function PeliRPC(host, port, protocol, persistent) {
	this.host = host;
	this.port = port;
	this portocol = protocol;
	this.persistent = persistent;
	this.hoststr = host + ":" + port + "/" + protocol;
	this.socket = null;
	this.callbacks;
	this.rpcMethods;
	this.callSequence = 0;

	this.onMessage;
}

PeliRPC.prototype.connect = function(callback) {
	var that = this;
	log.info("Connecting to " + hoststr);

	this.socket = eio.Socket(
			{ host: host, port: port },
			{ transports: ['websocket','polling'] });

	socket.on('open', function()						{
		callback(null, true);
	});

	socket.on('close', function() {
		log.info("Disconnected from " + hoststr);

		if(typeof self.closeEventCallback == "function") {
			that.closeEventCallback(true);
			that.closeEventCallback = null;
		}

		that.callbacks = new Object();
		that.rpcMethods = new Object();
	});

	socket.on('error', function() {
		that.close();

		if(typeof callback == "function") {
			callback({"code": E_NO_CONNECTION_CODE, "message": E_NO_CONNECTION + host + ":" + port + ", protocol: " +  protocol}, null);
		}
	});

	socket.on('message', function(message)		{
		self.onMessage(message);
	});
}

PeliRPC.prototype.close = function() {
	this.closeEventCallback = null;

	if(this.socket.readyState == "open") {
		socket.close();
	}
}

PeliRPC.prototype.callRpc = function(method, params, object, listener) {
	if(this.socket.readyState == "open") {
		var callObject;

		if(typeof listener == "function") {
			callObject = {
				"jsonrpc": "2.0", 
				"method": method, 
				"params": params, 
				"id": this.CallSequence
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

		this.sendMessage(callObject);
		return callObject.id;
	}
}

PeliRPC.prototype.exposedRpcMethod = function(name, object_, method_) {
	rpcMethods[name] = {
		object: object_, 
		method: method_
	};
}

PeliRPC.prototype.setCloseEventListener = function(callback) {
	closeEventCallback = (typeof callback == "function" ? callback : null);
}

PeliRPC.prototype.sendMessage = function(message) {
	log.info("RPC::sendMessage() " + hoststr + "." + JSON.stringify(message));
	if (this.socket.readyState == "open") {
		this.socket.send(JSON.stringify(message));	
	}
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

		if(!persistent) {
			socket.close();
		}
	}
}
