DEBUG = true;
CONTROLLER = "touchDrag";
SCREEN_PORT = 1234;
graphics2d = {};
message = function() {};
Audio = function() {};

eio = {
    Socket: function () {
        return new eio.SocketObject();
    },
    SocketObject: function () {
        this.readyState = 'closed'; // not from spec...
        this.lastSent = null;
        this.listeners = {};
    }
};

eio.SocketObject.prototype.send = function (msg) {
    this.lastSent = msg;
};

eio.SocketObject.prototype.on = function (event, listener) {
    this.listeners[event] = listener;
};

eio.SocketObject.prototype.close = function () {
    console.log("closing connection");
};

eio.SocketObject.prototype.launchEvent = function (event, args) {
    this.listeners[event](args);
};