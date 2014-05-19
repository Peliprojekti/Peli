var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var SCREEN_HTML = '/screen/renderer.html';
var CLIENT_HTML = '/phone.html';

var server = null;
var logger = null;
var nconf = null;

module.exports = new function() {
	this.start = function() {
		server.listen(nconf.get('http_port'));
	}

    this.create = function(nconf_, logger_) {
		nconf = nconf_;
		logger = logger_;
		
        server = http.createServer(function(request, response) {
            console.log(request.url);
            if (request.method !== ("GET")) {
				logger.info("Got something else than GET");
                return response.end("Simple File Server, only does GET");
            }

            var filename = nconf.get('client_html');
            var url = request.url;

            if (url.indexOf('/javascript') == 0) {
                filename = __dirname + "/.." + url;
            }
//
//            if (url.indexOf('/screen/javascript') == 0) {
//                filename = __dirname + "/../" + url;
//            }

            if (url.indexOf('/data') == 0) {
                filename = __dirname + "/../javascript/rendering" + url;
            }

            if (request.url == "/screen/screen.html") {
                filename = nconf.get('screen_html');
            }

            if (request.url == "/socket.io/socket.io.js") {
				console.log("serving socket.io");
				filename = __dirname + '/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js';
			}

            if (request.url == "/jquery.js") {
				console.log("serving jquery");
				filename = __dirname + '/lib/jquery/jquery-1.11.1.js';
			}

            //console.log("requested: " + url + ",serving: " + filename);

            fs.createReadStream(filename).pipe(response);
        });

        return server;
    }

}
