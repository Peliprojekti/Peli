/**
 * This takes care of communication through Engine.io
 * @constructor
 * @param {string} host -
 * @param {number} port -
 * @param {string} protocol -
 * @param {boolean} persistent - connection stays open if set to true
 */
function ConnectionWebsocket(host, port, protocol, persistent) {
    /*
     * TODO check websocket support
     */

    this.host = host;
    this.port = port;
    this.protocol = protocol;
    this.persistent = persistent;
    this.connected = false;
    this.connection = null;
    this.closeCallback = null;
    //this.onMessage = null;
}

ConnectionWebsocket.prototype.connect = function(connectCallback, closeCallback, onMessage) {
    var self = this;
    this.closeCallback = closeCallback;
    //this.onMessage = onMessage;

    var hoststr = "ws://" + this.host + ":" + this.port; // + "/" + this.protocol;

    //console.info("ConnectionWebsocket::connect - connecting to: ", hoststr);

    this.connection = new WebSocket(hoststr);

    this.connection.onopen = function() {
        self.connected = true;
        //console.info("ConnectionWebsocket::connect - connection opened ", hoststr);
        connectCallback(null, true);
    };

    this.connection.onclose = function() {
        self.connected = false;
        //console.info("ConnectionWebsocket::connect - disconnected ",  hoststr);
        if (typeof self.closeCallback == "function") {
            self.closeCallback(true);
            self.clear();
            //self.closeCallback = null;
        }
    };

    this.connection.onerror = function(error) {
        self.connected = false;
        console.info("ConnectionWebsocket::connect - connection error ", hoststr);
        self.clear();

        if (typeof self.connectionCallback == "function") {
            //callback({"code": E_NO_CONNECTION_CODE, "message": E_NO_CONNECTION + host + ":" + port + ", protocol: " +  protocol}, null);
            self.connectionCallback(error, null);
        }
    };

    this.connection.onmessage = function(e) {
        //console.debug("ConnectionWebsocket::connect - Recieved data---------", e);
        if (e.data == '-1') {
            //console.debug("Client disconnected!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            self.closeCallback(true);
            //self.clear();
        }
        else {
            onMessage(e.data);
        }
    };
};

ConnectionWebsocket.prototype.isOpen = function() {
    return this.connected;
};

ConnectionWebsocket.prototype.close = function() {
    console.info("ConnectionWebsocket::close - closing connection");
    if (self.connection !== null) self.connection.close();
    self.clear();
};

ConnectionWebsocket.prototype.clear = function() {
    this.closeEventCallback = null; // do this to disable redundant calls to this
    this.connected = false;
    this.connection = null;
};

ConnectionWebsocket.prototype.sendMessage = function(message) {
    if (this.connected === true) {
        //console.info("ConnectionWebsocket::sendMessage() " + this.hoststr + "." + JSON.stringify(message));
        this.connection.send(JSON.stringify(message));
    } else {
        console.warn("ConnectionWebsocket::sendMessage() - trying to send on closed connection");
    }
};
