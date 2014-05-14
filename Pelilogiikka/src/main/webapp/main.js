var clientServer = require("./clientServer");
var screenServer = require("./screenServer");
var coms = require("./comServer");

var CLIENT_PORT = '8080';
var SCREEN_PORT = '1337';

var client = clientServer.create();
client.listen(CLIENT_PORT);

var screen = screenServer.create();
screen.listen(SCREEN_PORT);

coms.startComs();

