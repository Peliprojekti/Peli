/*jslint browser: true */
/*global console: true */
/*global eio: true */

/**
 * 
 * @param {type} host
 * @param {type} port
 * @param {type} protocol
 * @returns {ConnectionEngineIO}
 */
function ConnectionEngineIO(host, port, protocol) {
    "use strict";
    this.host = host;
    this.port = port;
    this.portocol = protocol;
    this.connected = false;
    this.socket = null;
}

//ConnectionEngineIO.eio = eio;

/**
 * 
 * @param {type} connectCallback
 * @param {type} closeCallback
 * @param {type} onMessage
 * @returns {undefined}
 */
ConnectionEngineIO.prototype.connect = function (connectCallback, closeCallback, onMessage) {
    "use strict";
    var self = this,
        hoststr = this.host + ":" + this.port; // + "/" + protocol;

    if (onMessage === null || onMessage === undefined) {
        console.error("no onMessage supplied");
        throw new Error("no onMessage supplied");
    }
    console.info("ConnectionEngineIO connecting to ", hoststr);

    this.socket = eio.Socket(
        {host: this.host, port: this.port},
        {transports: ['websocket', 'polling']}
    );

    this.socket.on('open', function () {
        self.connected = true;
        console.info("ConnectionEngineIO connection opened");
        connectCallback(null, true);
    });

    this.socket.on('close', function () {
        console.info("ConnectionEngineIO disconnected from " + hoststr);
        self.connected = false;

        if (typeof closeCallback === 'function') {
            closeCallback();
            closeCallback = null;
        }
    });

    this.socket.on('error', function (error) {
        console.warn("ConnectionEngineIO::connect - error connecting ", error);
        self.connected = false;

        if (typeof connectCallback === "function") {
            connectCallback(error, null);
            connectCallback = null;
        }
        self.close();
    });

    this.socket.on('message', function (message) {
        onMessage(message);
    });
};

/**
 * 
 * @returns {Boolean}
 */
ConnectionEngineIO.prototype.isOpen = function () {
    "use strict";
    return this.connected;
};

/**
 * 
 * @returns {undefined}
 */
ConnectionEngineIO.prototype.close = function () {
    "use strict";
    this.socket.close();
    this.socket.on('close', null);
    this.socket.on('error', null);
    this.socket.on('connect', null);
    this.socket.on('message', null);
    this.socket = null;
    this.connected = false;
};

/**
 * 
 * @param {type} message
 * @returns {undefined}
 */
ConnectionEngineIO.prototype.sendMessage = function (message) {
    "use strict";
    if (this.connected === true) {
        //console.debug("ConnectionEngine::sendMessage - sending", message);
        this.socket.send(message);
    }
};

ConnectionEngineIO.prototype.getSocket = function () {
    "use strict";
    return this.socket;
};