var initServer = require("./initServer");
var fs = require('fs');
var nconf = require('nconf');
var fork = require('child_process').fork;

/*
 * SETUP
 *
 * All of the setup stuff can be passed on the comman line.
 *
 * In case of booleans no parameters need to be passed, like so:
 * > node main.js --debug
 *
 * Other values need to be passed after the arg, e.g. like this:
 * > node -main.js --controller mouseMove
 *
 *
 * The config file thingy should also maybe work, but I've had no
 * success with it... -hasse
 */

nconf.argv().env().file({
    file: 'peli_config.json'
});

nconf.defaults({
    game_name: 'Peliprojektin Peli',
    http_port: 8080, // this is the port where the clients need to connect initially
    client_port: 1338, // client and screen port is for coms, and not directly exposed to users
    screen_port: 1339,
    log_level: 'error', // debug switch overrides this to debug

    jsonrpc_protocol: 'peliprojekti-controller', // does nothing?

    debug: false,
    html_pretty: true,

    com_benchmark: false,
    com_benchmark_timeout: 5000,
    com_benchmark_file: __dirname + '/log/benchmark.log',

    static_javascript: __dirname + '/../javascript',
    static_data: __dirname + "/../javascript/renderind/data",

    jade_views: __dirname + '/views',
    client_jade: 'controller.jade',
    screen_jade: 'dummy/dummy.jade',

    controller: 'touchDrag'
});

/*
 * START THE THINGS...
 */

function startComServer() {
    require('util').log("main.js - starting comServer");

    var comServer = fork('comServer.js');
    comServer.on('error', function(data) {
        require('util').error("comServer - exit on error");
        require('util').error(data);
        process.exit(-1);

    });

    comServer.on('close', function(code, signal) {
        require('util').log("main.js - comServer closed " + code + ", " + signal);
        process.exit(code);
    });

    comServer.send({ // disable/enable debugging mode on comServer
        type: 'config',
        value: {
            debug: nconf.get('debug'),
            client_port: nconf.get('client_port'),
            screen_port: nconf.get('screen_port'),
            benchmark: nconf.get('com_benchmark'),
            benchmark_timeout: nconf.get('com_benchmark_timeout'),
            benchmark_filename: nconf.get('com_benchmark_filename')
        }
    });

    comServer.send({
        type: 'startServer'
    });
    return comServer;
}

var comServer = startComServer();
require('util').log("main.js - starting http server");
initServer.start(nconf, comServer);

/*
 * Properly handle shutdown to ensure nothing remains listening on restarts
 */
process.on('SIGINT', function() {
    console.log("shutting down from SIGINT (Ctrl-C)");
    comServer.send({
        type: 'shutdown'
    });
    initServer.shutdown();
    setTimeout(process.exit(0), 100);
});
