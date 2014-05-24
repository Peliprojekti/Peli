var log = {
    enabled: DEBUG,
    level: 3,
    rows: [],
    //coms: null,
    serverMsgr: null,
    
    logMessage: function(type, caller, msg, send, benchmark) {
        var message = type + caller + " " + msg;
        console.log(message);
        
        if (benchmark) {
            log.rows.push(message);
        }
        
        if (send) {
            io.sendServerMessage(message);
        }
    },

    error: function(msg, send, benchmark) {
        if(log.enabled) {
            log.logMessage("ERROR: ", this.caller, msg, send, benchmark);
        }
    },

    warn: function(msg, send, benchmark) {
        if(log.enabled && log.level > 0) {
            log.logMessage("WARN: ", this.caller, msg, send, benchmark);
        }
    },

    info: function(msg, send, benchmark) {
        if(log.enabled && log.level > 1) {
            log.logMessage("INFO: ", this.caller, msg, send, benchmark);
        }
    },

    debug: function(msg, send, benchmark) {
        if(log.enabled && log.level > 2) {
            log.logMessage("DEBUG: ", this.caller, msg, send, benchmark);
        }
    },

    set_level: function(level) {
        log.level = level;
    },

    throwToServer: function(error) {
        io.sendServerMessage(error);
    },
};
