var log = {
    enabled: true,
    level: 3,

    error: function(msg) {
        if(log.enabled) {
            console.log("ERROR: " + msg);
        }
    },

    warn: function(msg) {
        if(log.enabled && log.level > 0) {
            console.log("WARN:  " + msg);
        }
    },

    info: function(msg) {
        if(log.enabled && log.level > 1) {
            console.log("INFO:  " + msg);
        }
    },

    debug: function(msg) {
        if(log.enabled && log.level > 2) {
            console.log("DEBUG: " + msg);
        }
    },

    set_level: function(level) {
        log.level = level;
    }
};
