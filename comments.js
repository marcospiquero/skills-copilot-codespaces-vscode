// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var comments = [];

var server = http.createServer(function(req, res) {
    var parseUrl = url.parse(req.url, true);
    var pathname = parseUrl.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else if (pathname === '/comments' && req.method === 'GET') {
        var data = JSON.stringify(comments);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
    } else if (pathname === '/comments' && req.method === 'POST') {
        var body = '';
        req.on('data', function(chunk) {
            body += chunk;
        });
        req.on('end', function() {
            var comment = qs.parse(body);
            comments.push(comment);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('success');
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(3000);

console.log('Server is running at http://localhost:3000/');