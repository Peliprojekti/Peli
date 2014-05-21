var log = {
    enabled: DEBUG,
    level: 3,
    rows: new Array(),
    coms: null,
    
    logMessage: function(type, msg, send) {
        var message = type + msg;
        console.log(message);
        log.rows.push(message);
        if (send && coms != null) {
            
        }
    },

    error: function(msg, send) {
        if(log.enabled) {
            log.logMessage("Error: ", msg, send)
        }
    },

    warn: function(msg, send) {
        if(log.enabled && log.level > 0) {
            log.logMessage("WARN: ", msg, send);
        }
    },

    info: function(msg, send) {
        if(log.enabled && log.level > 1) {
            log.logMessage("INFO: ", msg, send)
        }
    },

    debug: function(msg, send) {
        if(log.enabled && log.level > 2) {
            log.logMessage("DEBUG: ", msg, send)
        }
    },
    
    setComs: function(comsObject) {
        log.coms = comsObject;
    },

    set_level: function(level) {
        log.level = level;
    }
};


