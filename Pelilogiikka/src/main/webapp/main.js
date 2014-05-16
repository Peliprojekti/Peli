var initServer = require("./initServer");
var comServer = require("./comServer");
var fs = require('fs');
var nconf = require('nconf');
var logger = require('winston');

nconf.argv().env().file({ file: 'peli_config.json'});

nconf.defaults({
	http_port: 8080,
	client_port: 1338,
	screen_port: 1339,
	client_html: __dirname + '/phone.html',
	//client_html: __dirname + '/client/dummy_client.html',
	screen_html: __dirname + '/screen/dummy_screen.html',
	//screen_html: __dirname + '/screen/renderer.html',
	dummy: false
});
	

logger.info("starting http server");
initServer.create(nconf, logger);
initServer.start();

logger.info("starting com server");
comServer.create(nconf, logger);
comServer.start();

