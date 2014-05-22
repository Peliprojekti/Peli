/**
 * ControllerHub
 * @constructor
 * @param {function} onJoinPlyaer - onJoinPlayer(player)
 * @param {number} maxPlayers
 */
function ControllerHub(onJoinPlayer, maxPlayers) {
    var that = this;

    this.onJoinPlayer = onJoinPlayer;
    this.maxPlayers = (maxPlayers === undefined ? 100 : maxPlayers);
    this.controllerCount = 0;

    this.addNewController();
}

/**
 * Used to initially open the connections
 * @param {function} callback - will be called when connection opened
 */
ControllerHub.prototype.open = function(callback) {};

ControllerHub.prototype.addNewController = function() {
    var that = this;

    if (this.controllerCount < this.maxPlayers) {
        log.info("Trying to connect new Controller to server");
        this.controllerCount++;
        var controller = new Controller(function() {
            //onConnect
            log.info("Controller connected to server");
        }, function() {
            //onDisconnect
            log.info("Controller lost connection to server");
            that.controllerCount--;
            that.addNewController();
        }, function(newPlayer) {
            // onJoinPlayer
            log.info("Player joined game: " + newPlayer);
            that.onJoinPlayer(newPlayer);
            that.addNewController();
        });

        return true;
    } else {
        log.info("reached max players count: " + this.maxPlayers);
        return false;
    }
};

/**
 * close connection
 */
ControllerHub.prototype.close = function() {
    // disconnect controllers
};

/**
 * This will send messages directly to the server
 * @param {function} msg
 */
Controller.prototype.serverMsg = function(msg) {
    window.alert("serverMsg not implemented");
};
