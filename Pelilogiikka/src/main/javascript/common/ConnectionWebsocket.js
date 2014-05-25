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

ConnectionWebsocket.prototype.connect = function(connectCallback, closeCallback, onMessage, onPlayerDisconnect) {
    var self = this;
    this.closeCallback = closeCallback;
    //this.onMessage = onMessage;

    var hoststr = "ws://" + this.host + ":" + this.port; // + "/" + this.protocol;

    console.info("ConnectionWebsocket::connect - connecting to: ", hoststr);

    this.connection = new WebSocket(hoststr);

    this.connection.onopen = function() {
        self.connected = true;
        log.info("ConnectionWebsocket::connect - connection opened " + hoststr);
        connectCallback(null, true);
    };

    this.connection.onclose = function() {
        self.connected = false;
        log.info("ConnectionWebsocket::connect - disconnected " + hoststr);
        if (typeof self.closCallback == "function") {
            self.closeCallback(true);
            self.closeCallback = null;
        }
    };

    this.connection.onerror = function(error) {
        self.connected = false;
        log.info("ConnectionWebsocket::connect - connection error " + hoststr);
        self.close();

        if (typeof self.connectionCallback == "function") {
            //callback({"code": E_NO_CONNECTION_CODE, "message": E_NO_CONNECTION + host + ":" + port + ", protocol: " +  protocol}, null);
            self.connectionCallback(error, null);
        }
    };

    this.connection.onmessage = function(e) {
        if (e.data == 'playerDisconnected') {
            log.info("Player has disconnected");
            onPlayerDisconnect();
        }
        else {
            onMessage(e.data);
        }

        if (!self.persistent) {
            self.socket.close();
        }
    };
};

ConnectionWebsocket.prototype.isOpen = function() {
    return this.connected;
};

ConnectionWebsocket.prototype.close = function() {
    log.info("ConnectionWebsocket::close - closing connection");
    this.closeEventCallback = null; // do this to disable redundant calls to this
    if (this.connected === true) {
        this.connected = false;
        this.connection.close();
    }
};

ConnectionWebsocket.prototype.sendMessage = function(message) {
    if (this.connected === true) {
        log.info("ConnectionWebsocket::sendMessage() " + this.hoststr + "." + JSON.stringify(message));
        this.connection.send(JSON.stringify(message));
    }
    else {
        log.info("ConnectionWebsocket::sendMessage() - trying to send on closed connection");
    }
};
