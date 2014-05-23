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
            serverDebugMessenger.send(message);
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
    }
};


