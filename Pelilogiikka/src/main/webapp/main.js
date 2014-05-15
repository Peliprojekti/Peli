var initServer = require("./initServer");
var coms = require("./comServer");

var SERVER_PORT = '8080';

var initServer = initServer.create();
initServer.listen(SERVER_PORT);

//var screen = screenServer.create();
//screen.listen(SCREEN_PORT);

coms.startComs();

