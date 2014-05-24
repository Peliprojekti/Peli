var log = {
    enabled: DEBUG,
    level: 3,
    rows: [],
    //coms: null,
    serverMsgr: null,
    
    logMessage: function(type, msg, send, benchmark) {
        var message = type + msg;
        console.log(message);
        
        if (benchmark) {
            log.rows.push(message);
        }
        
        if (send) {
            peli.common.sendServerMessage(message);
        }
    },

    error: function(msg, send, benchmark) {
        if(log.enabled) {
            log.logMessage("Error: ", msg, send, benchmark);
        }
    },

    warn: function(msg, send, benchmark) {
        if(log.enabled && log.level > 0) {
            log.logMessage("WARN: ", msg, send, benchmark);
        }
    },

    info: function(msg, send, benchmark) {
        if(log.enabled && log.level > 1) {
            log.logMessage("INFO: ", msg, send, benchmark);
        }
    },

    debug: function(msg, send, benchmark) {
        if(log.enabled && log.level > 2) {
            log.logMessage("DEBUG: ", msg, send, benchmark);
        }
    },

    set_level: function(level) {
        log.level = level;
    },

    socket: null,

    sendServerMessage:  function(msg) {
        if (this.socket === undefined) {
            var socket = eio.Socket(
                    { host: location.hostname, port: 1340 }, // TODO hardcoded port here!
                    { transports: ['websocket','polling'] });

            socket.on('close', function() {
                log.warn("sendServerMessage disconnected");
                this.socket = null;
            });

            socket.on('error', function() {
                log.errorr("sendServerMessage connection error");
                this.socket = null;
            });

            this.socket = socket;
        }

        this.socket.send(msg);
    }
};
