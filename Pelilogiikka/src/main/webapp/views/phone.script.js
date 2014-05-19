
var COM_PORT = 1338;
var clientComs = null;

function addOnload(func) {
    window.onload = func;
}

window.onload = function() {
    var startGameCallback = function(gameStarted, sessionToken) {

    };

    var connectionOkCallback = function(something, isOK) {
        clientComs.startGame(startGameCallback);
        startGameCallback(true, 1);
    };

    clientComs.initConnection(location.hostname, COM_PORT, null, true, connectionOkCallback);
};
