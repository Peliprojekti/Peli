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
        this.connected = true;
        log.info("connection ok to " + hoststr);
        connectCallback(null, true);
    };

    this.connection.onclose = function() {
        this.connected = false;
        log.info("Disconnected from " + hoststr);
        if (typeof that.closCallback == "function") {
            that.closeCallback(true);
            that.closeCallback = null;
        }
    };

    this.connection.onerror = function(error) {
        this.connected = false;
        log.error("websocket connection error");
        that.close();

        if (typeof connectionCallback == "function") {
            //callback({"code": E_NO_CONNECTION_CODE, "message": E_NO_CONNECTION + host + ":" + port + ", protocol: " +  protocol}, null);
            that.connectionCallback(error, null);
        }
    };

    this.connection.onmessage = function(e) {
        log.debug("recieved msg on websocket");
        onMessage(e.data);

        if (!that.persistent) {
            that.socket.close();
        }
    };
};

ConnectionWebsocket.prototype.isOpen = function() {
    return this.connected;
};

ConnectionWebsocket.prototype.close = function() {
    this.closeEventCallback = null; // do this to disable redundant calls to this
    if (this.connected === true) {
        this.connected = false;
        this.connection.close();
    }
};

ConnectionWebsocket.prototype.sendMessage = function(message) {
    if (this.connected === true) {
        this.connection.send(JSON.stringify(message));
    }
};
