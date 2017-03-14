require("http").createServer(function handleRequest(req, res) {
	res.writeHead(200, {
		"content-type": "text/plain"
	});
	res.end("nodejs Hello World!");
}).listen(3000);