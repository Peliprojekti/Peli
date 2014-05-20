var log = {
    enabled: DEBUG,
    level: 3,
    rows: new Array(),
    
    logMessage: function(type, msg) {
        var message = type + msg;
            console.log(message);
            log.rows.push(message);
    },

    error: function(msg) {
        if(log.enabled) {
            log.logMessage("Error: ", msg)
        }
    },

    warn: function(msg) {
        if(log.enabled && log.level > 0) {
            log.logMessage("WARN: ", msg);
        }
    },

    info: function(msg) {
        if(log.enabled && log.level > 1) {
            log.logMessage("INFO: ", msg)
        }
    },

    debug: function(msg) {
        if(log.enabled && log.level > 2) {
            log.logMessage("DEBUG: ", msg)
        }
    },

    set_level: function(level) {
        log.level = level;
    }
};


