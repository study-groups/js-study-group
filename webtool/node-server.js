const http = require("http");
const fs = require("fs");
const url = require("url");
const { spawn } = require("child_process"); // neither used
// https://nodejs.org/docs/latest/api/process.html#process_process_argv
const HTML_DIR = process.argv[2]
const JSON_DIR = process.argv[3]
const SERVER_IP = process.argv[4] || "127.0.0.1"; // localhost only
const PORT = process.argv[5]

const server = http.createServer( function(req, res) {
    // From https://nodejs.org/docs/guides/anatomy-of-an-http-transaction
    // The method here will always be a normal HTTP method/verb. The
    // url is the full URL without the server, protocol or port. For
    // a typical URL, this means everything after and including the
    // third forward slash.

    // The request object is an instance of IncomingMessage.
    const parsedUrl = url.parse(req.url, true);
    const queryObject = parsedUrl.query;
    const urlPathname = url.parse(req.url, true).pathname;
    console.log(queryObject)
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(`${HTML_DIR}/index.html`, function(err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    }
    // /json?min=0&max=20
    if (req.
        method === 'GET' && urlPathname === '/json') {
        const str = JSON.stringify(queryObject);

        res.writeHead(200, {"Content-Type": "application/json"});
        const pipeline = spawn(
            `./json-hook`,
            [
               str
            ],
            {
                cwd: JSON_DIR
            }
        );

        //pipeline.stdout.on("data", function(data) {
        //console.log("data to send to client: ", data.toString());
        //});

        pipeline.stderr.on("data",
             (err) => console.error("Pipeline error", Buffer.from(err).toString()));

        pipeline.stdout.pipe(res); // pipes stdout of process to client
    }
});

server.listen(PORT, SERVER_IP);
console.log(`Node application running on ${SERVER_IP}:${PORT}`);

// calling unix hostname which returns something like:
// 192.168.1.38 172.18.0.1 172.17.0.1 172.19.0.1
const hostnameProcess = spawn("hostname", ["-I"]);

hostnameProcess.stdout.on("data", function(data) {
    const { HTML_PORT } = process.env;
    console.log(
        `Hostname IP: ${data.toString().split(" ")[0]}:${PORT}/`
    );
    console.log(`${data.toString()}`)
});
