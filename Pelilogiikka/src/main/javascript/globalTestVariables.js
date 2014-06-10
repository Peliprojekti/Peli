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

eio.SocketObject.prototype = {
    send: function (msg) {
        this.lastSent = msg;
    },
    on: function (event, listener) {
        this.listeners[event] = listener;
    },
    close: function () {
        console.log("closing connection");
    },
    launchEvent: function (event, args) {
        this.listeners[event](args);
    }
};

function WebSocket(hoststr) {
    this.hoststr = hoststr;
    this.lastSent = null;
};

WebSocket.prototype = { 
    onopen: null,
    onclose: null,
    onerror: null,
    onmessage: null,
    send: function (msg) {
        this.lastSent = msg;
    },
    launchEvent: function (event, args) {
        switch (event) {
            case 'open':
                this.onopen(args);
                break;
            case 'close':
                this.onclose(args);
                break;
            case 'error':
                this.onerror(args);
                break;
            case 'message': 
                this.onmessage({
                    data: args
                });
                break;
            default:
                throw new Error("Unknown event: " + event);
        }
    }
};