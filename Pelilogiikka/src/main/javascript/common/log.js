var log = {
    enabled: DEBUG,
    level: 3,
    serverMsgr: null,
    
    logMessage: function(type, msg, send) {
        var message = type + msg;
        console.log(message);
        
        if (send) {
            sendServerMessage(message);
        }
    },

    error: function(msg, send) {
        if(log.enabled) {
            log.logMessage("ERROR: ", msg, send );
        }
    },

    warn: function(msg, send) {
        if(log.enabled && log.level > 0) {
            log.logMessage("WARN: ", msg, send);
        }
    },

    info: function(msg, send) {
        if(log.enabled && log.level > 1) {
            log.logMessage("INFO: ", msg, send);
        }
    },

    debug: function(msg, send) {
        if(log.enabled && log.level > 2) {
            log.logMessage("DEBUG: ", msg, send);
        }
    },

    setLevel: function(level) {
        log.level = level;
    },

    getLevel: function() {
        return log.level;
    },

    throwToServer: function(error) {
        sendServerMessage(error);
    },

    resetDebug: function(debug) {
        if (!debug) {
            console.info("disabling all console log/info/debug messages");
            log.enbaled = false;
            log.consInfo = console.info;
            log.consLog = console.log;
            log.consDebug = console.debug;
            console.info = function() {};
            console.log = function() {};
            console.debug = function() {};
        } else {
            log.level = 3;
            log.enabled = true;
            if (log.consInfo !== undefined) {
                console.info = log.consInfo;
                console.log = log.consLog;
                console.debug = log.consDebug;
            }
        }
    }
};

log.resetDebug(DEBUG);