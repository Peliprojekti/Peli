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

/*
ControllerHub.prototype.moveSwipe = function(data) {
    var userID = data[0];
    var swipeData = data[1];
    var position = [swipeData[0], swipeData[1]];
    var sincePrevious = swipeData[2];
    
    log.debug(userID + "swipe position: (" + position[0] + ", " + position[1] + "), Time since previous: " + sincePrevious + "ms");
    
    this.players[userID].pushSwipe(position, sincePrevious);
};
*/

ControllerHub.prototype.setOnMessage = function(callback) {
    this.onMessage = callback;
};

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
    // TODO disconnect controllers
};

/**
 * This will send messages directly to the server
 * @param {function} msg
 */
Controller.prototype.serverMsg = function(msg) {
    window.alert("serverMsg not implemented");
};
