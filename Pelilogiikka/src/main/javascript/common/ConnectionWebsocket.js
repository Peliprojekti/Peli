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
    var that = this;
    this.closeCallback = closeCallback;
    //this.onMessage = onMessage;

    var hoststr = "ws://" + this.host + ":" + this.port; // + "/" + this.protocol;

    log.info("Connecting to " + hoststr);

    this.connection = new WebSocket(hoststr);

    this.connection.onopen = function() {
        that.connected = true;
        log.info("ConnectionWebsocket::connect - connection opened " + hoststr);
        connectCallback(null, true);
    };

    this.connection.onclose = function() {
        that.connected = false;
        log.info("ConnectionWebsocket::connect - disconnected " + hoststr);
        if (typeof that.closCallback == "function") {
            that.closeCallback(true);
            that.closeCallback = null;
        }
    };

    this.connection.onerror = function(error) {
        that.connected = false;
        log.info("ConnectionWebsocket::connect - connection error " + hoststr);
        that.close();

        if (typeof connectionCallback == "function") {
            //callback({"code": E_NO_CONNECTION_CODE, "message": E_NO_CONNECTION + host + ":" + port + ", protocol: " +  protocol}, null);
            that.connectionCallback(error, null);
        }
    };

    this.connection.onmessage = function(e) {
        if (e.data == 'playerDisconnected') {
            log.info("Player has disconnected");
        }
        else {
            onMessage(e.data);
        }

        if (!that.persistent) {
            that.socket.close();
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
