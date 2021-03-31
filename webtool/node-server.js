const http = require("http");
const fs = require("fs");
const { spawn } = require("child_process"); // neither used

// https://nodejs.org/docs/latest/api/process.html#process_process_argv
const PORT = process.argv[2] 
const HTML_PATH = process.argv[3]
const JSON_DIR = process.argv[4]
const SERVER_IP = "0.0.0.0"; // catch all network interface

const server = http.createServer( function(req, res) {
    // From https://nodejs.org/docs/guides/anatomy-of-an-http-transaction
    // The method here will always be a normal HTTP method/verb. The
    // url is the full URL without the server, protocol or port. For
    // a typical URL, this means everything after and including the
    // third forward slash. 

    // The request object is an instance of IncomingMessage.

    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(HTML_PATH, function(err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        }); 
    }

    if (req.method === 'GET' && req.url === '/json') {
        res.writeHead(200, {"Content-Type": "application/json"});
        // in future call spawn and get stdio from webtool-json-hook 
        
        const pipeline = spawn(`${JSON_DIR}/json-hook`);
        //pipeline.stdout.on("data", function(data) {
            //console.log("data to send to client: ", data.toString());
        //});
        
        // pipes stdout of process to client
        pipeline.stdout.pipe(res);
    }

    if (req.method === 'GET' && req.url === '/json-file') {
        res.writeHead(200, {"Content-Type": "application/json"});
        fs.readFile(JSON_PATH, function(err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        }); 
    }
});

server.listen(PORT, SERVER_IP);
console.log(`Node application running on ${SERVER_IP}:${PORT}`);
const hostname = spawn("hostname", ["-I"]);
hostname.stdout.on("data", function(data) {
    const { HTML_PORT } = process.env;
    console.log(
        `Dashboard on IP: ${data.toString().split(" ")[0]}:${HTML_PORT}/`
    );
});
