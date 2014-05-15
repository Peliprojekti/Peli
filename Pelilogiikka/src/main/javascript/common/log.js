var log = {
    enabled: true,

    info: function(msg) {
        if(enabled) {
            console.log("INFO: " + msg);
        }
    },

    error: function(msg) {
        if(enabled) {
            console.log("ERROR: " + msg);
        }
    }
};
