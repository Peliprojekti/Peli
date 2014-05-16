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
            if (request.method !== ("GET")) {
				logger.warn("Got something else than GET");
                return response.end("Simple File Server, only does GET");
            }
            logger.info("recieved request for: " + request.url);

            var filename = nconf.get('client_html');

            if (request.url.indexOf('/javascript') == 0) {
                response.setHeader('content-type', 'text/javascript');
                filename = __dirname + "/.." + request.url;
            }
            else if (request.url.indexOf('/data') == 0) {
                filename = __dirname + "/../javascript/rendering" + request.url;
            }
            else if (request.url == "/screen/screen.html") {
                filename = nconf.get('screen_html');
            }
            else if (request.url == '/socket.io/socket.io.js') {
                logger.info("trying to provide socket.io.js");
                response.setHeader('content-type', 'text/javascript');
                filename = __dirname + "/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js";
            }

            fs.createReadStream(filename).pipe(response);
        });

        return server;
    }

}
