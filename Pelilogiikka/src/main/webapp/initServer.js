var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var SCREEN_HTML = '/screen/dummy_screen.html';
var CLIENT_HTML = '/client/dummy_client.html';

//var MAIN_HTML = '/dummy_screen.html';

module.exports = new function() {
	this.create = function() {
		var server = http.createServer(function(request, response) {
			if (request.method !== ("GET")) {
				return response.end("Simple File Server, only does GET");
			}

			var filename = __dirname + CLIENT_HTML;
            var url = request.url;

            if (url.indexOf('/javascript') == 0) {
                filename = __dirname + "/.." + url;
            }

            if (request.url == "/screen/screen.html") {
                filename = __dirname + SCREEN_HTML;
            }

            //console.log("requested: " + url + ",serving: " + filename);

			fs.createReadStream(filename).pipe(response);
		});
		return server;
	}
}
