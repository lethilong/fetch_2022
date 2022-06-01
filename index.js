const http = require('http');

const server = http.createServer( (req, res) => {
    if (req.url === '/') {
        res.write('Hello world');
        res.end();
    }
});

server.listen(8080);