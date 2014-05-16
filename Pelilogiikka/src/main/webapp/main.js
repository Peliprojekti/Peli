var initServer = require("./initServer");
var fs = require('fs');
var nconf = require('nconf');
var logger = require('winston');
var fork = require('child_process').fork;

/*
 * SETUP
 */

nconf.argv().env().file({ file: 'peli_config.json'});
nconf.defaults({
    http_port: 8080,
    client_port: 1338,
    screen_port: 1339,
    debug: false,
    client_html: __dirname + '/phone.html',
    screen_html: __dirname + '/screen/renderer.html',
    //client_html: __dirname + '/client/dummy_client.html',
    //screen_html: __dirname + '/screen/dummy_screen.html',
    dummy: false
});

/*
 * START THE THINGS...
 */

logger.info("starting http server");
initServer.create(nconf, logger);
initServer.start();

logger.info("forking comServer");
comServer = fork('comServer.js');

comServer.send({ // disable/enable debugging mode on comServer
    type: 'config',
    value: {
        debug:  nconf.get('debug'),
        client_port: nconf.get('client_port'),
        screen_port: nconf.get('screen_port')
    }
});

comServer.send({ type: 'startServer' });
