var http = require('http');
http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	    res.end('Pelirojekti says: Hello World\n');
}).listen(1337, '10.42.0.1');
console.log('Server running at http://127.0.0.1:1337/');
