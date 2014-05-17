var initServer = require("./initServer");
var fs = require('fs');
var nconf = require('nconf');
var winston = require('winston');
var fork = require('child_process').fork;

/*
 * SETUP
 */

nconf.argv().env().file({ file: 'peli_config.json'});
nconf.defaults({
    game_name: 'Peliprojektin Peli',
    http_port: 8080,
    client_port: 1338,
    screen_port: 1339,
    log_level: 'error', // debug overrides this...
    debug: false,
    client_html: __dirname + '/phone.html',
    screen_html: __dirname + '/screen/renderer.html',

    static_javascript: __dirname + '/../javascript',
    static_data: __dirname + "/../javascript/renderind/data",

    jade_views: __dirname + '/views',
    client_jade: 'phone.jade',
    screen_jade: 'game.jade',
    //client_html: __dirname + '/client/dummy_client.html',
    //screen_html: __dirname + '/screen/dummy_screen.html',
    dummy: false
});

var logger = new (winston.Logger)({
      transports: [
        //new (winston.transports.File)({ filename: 'somefile.log', level: 'error' }),
        new (winston.transports.Console)({ level: (nconf.get('debug') ? 'debug' : nconf.get('log_level')) })
      ]
});

/*
 * START THE THINGS...
 */

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

logger.info("starting http server");
initServer.start(nconf, logger, comServer);

/*
 * Properly handle shutdown to ensure nothing remains listening on restarts
 */
process.on( 'SIGINT', function() {
      console.log("shutting down from SIGINT (Ctrl-C)");
      comServer.send({ type: 'shutdown' });
      initServer.shutdown();
      setTimeout(process.exit(0), 100);
});
