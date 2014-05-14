var http = require('http');
var fs = require('fs');

var MAIN_HTML = '/dummy_screen.html'

module.exports = new function() {
	this.create = function() {
		var server = http.createServer(function(request, response) {
			if (request.method !== ("GET")) {
				return response.end("Simple File Server, only does GET");
			}
			fs.createReadStream(__dirname + MAIN_HTML).pipe(response);
		});
		return server;
	}
}

