var http = require('http');
var fs = require('fs');

var MAIN_HTML = '/dummy_screen.html'

module.exports = new function() {
	this.create = function() {
		var server = http.createServer(function(request, response) {
			if (request.method !== ("GET")) {
				return response.end("Simple File Server, only does GET");
			}

			var filename = __dirname + MAIN_HTML;
			if (request.url == "/javascript/screenComs.js") {
				console.log("Sending javascript");
				filename = __dirname + "/.." + request.url;
			}

			fs.createReadStream(filename).pipe(response);
		});
		return server;
	}
}

