/*jslint browser: true */
/*global WebSocket: true */
/*global console: true */

/**
 * This takes care of communication through Engine.io
 * @constructor
 * @param {string} host -
 * @param {number} port -
 * @param {string} protocol -
 * @param {boolean} persistent - connection stays open if set to true
 * @returns {ConnectionWebsocket}
 */
function ConnectionWebsocket(host, port, protocol, persistent) {
    "use strict";

    this.host = host;
    this.port = port;
    this.protocol = protocol;
    this.persistent = persistent;
    this.connected = false;
    this.socket = null;
    this.closeCallback = null;
}

/**
 * 
 * @param {type} connectCallback
 * @param {type} closeCallback
 * @param {type} onMessage
 * @returns {undefined}
 */
ConnectionWebsocket.prototype.connect = function (connectCallback, closeCallback, onMessage) {
    "use strict";
    var self = this,
        hoststr = "ws://" + this.host + ":" + this.port; // + "/" + this.protocol;

    if (onMessage === null || onMessage === undefined) {
        console.error("no onMessage supplied");
        throw new Error("no onMessage supplied");
    }

    this.closeCallback = closeCallback;

    this.socket = new WebSocket(hoststr);

    this.socket.onopen = function () {
        self.connected = true;
        connectCallback(null, true);
    };

    this.socket.onclose = function () {
        if (typeof closeCallback === "function") {
            closeCallback(true);
            closeCallback = null;
            self.close();
        }
    };

    this.socket.onerror = function (error) {
        console.error("ConnectionWebsocket::connect - connection error ", hoststr);
        if (typeof connectCallback === "function") {
            connectCallback(error, null);
            connectCallback = null;
        }
        self.close();
    };

    this.socket.onmessage = function (e) {
        if (e.data === '-1') {
            /* This is a server message notifying of client disconnect */
            console.log("ConnectionWebsocket::onMessage - recieved player disconnect");
            closeCallback(true);
            closeCallback = null;
            self.close();
        } else {
            //console.debug("ConnectionWebsocket::connect - onmessage", e.data);
            onMessage(e.data);
        }
    };
};

/**
 * 
 * @returns {Boolean}
 */
ConnectionWebsocket.prototype.isOpen = function () {
    "use strict";
    return this.connected;
};

/**
 * Closes conneciton and clears object
 * 
 * @returns {undefined}
 */
ConnectionWebsocket.prototype.close = function () {
    "use strict";
    console.info("ConnectionWebsocket::close - closing connection");
    if (this.conneciton !== null) {
        if (this.closeCallback !== null) {
            this.closeCallback(true);
            this.closeCallback = null;
        }

        this.socket.onopen = null;
        this.socket.onclose = null;
        this.socket.onerror = null;
        this.socket.onmessage = null;
        this.socket = null;
    }
    this.connected = false;
};

/**
 * Send message as JSON.stingified
 * 
 * @param {type} message
 * @returns {Boolean} - true if send okay
 */
ConnectionWebsocket.prototype.sendMessage = function (message) {
    "use strict";
    if (this.connected === true) {
        //console.info("ConnectionWebsocket::sendMessage() " + this.hoststr + "." + JSON.stringify(message));
        this.socket.send(message);
        return true;
    }
    console.warn("ConnectionWebsocket::sendMessage() - trying to send on closed connection");
    return false;
};

ConnectionWebsocket.prototype.getSocket = function () {
    "use strict";
    return this.socket;
};