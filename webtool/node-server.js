const http = require("http");
const fs = require("fs");
const url = require("url");
const { URL, URLSearchParams } = url;
const { spawn } = require("child_process"); // neither used
// https://nodejs.org/docs/latest/api/process.html#process_process_argv
const PORT = process.argv[2]
const HTML_PATH = process.argv[3]
const JSON_DIR = process.argv[4]
//const SERVER_IP = "0.0.0.0"; // catch all network interface
const SERVER_IP = process.argv[5] || "127.0.0.1"; // localhost only

const server = http.createServer( function(req, res) {
    // From https://nodejs.org/docs/guides/anatomy-of-an-http-transaction
    // The method here will always be a normal HTTP method/verb. The
    // url is the full URL without the server, protocol or port. For
    // a typical URL, this means everything after and including the
    // third forward slash.

    // The request object is an instance of IncomingMessage.

    // IP:PORT/json?min=20&max=40
    const baseUrl = `http://${SERVER_IP}:${PORT}`;
    const parsedUrl = new URL(req.url, baseUrl);
    const queryString = parsedUrl.search;
    //console.log("query string:", queryString)

    // path
    const path = parsedUrl.pathname;
    //const trimmedPath = path.replace(/^\/+|\/+$/g, "");

    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(HTML_PATH, function(err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    }
    // /json?min=0&max=20
    if (req.method === 'GET' && path === '/json') {
        res.writeHead(200, {"Content-Type": "application/json"});

        // in future call spawn and get stdio from webtool-json-hook
        // figure out how to specify which hook to use where
        // "/json-hook" is currently located manually
        // req vars passed to json-hook file

        // random number generated between 1 and max
        //const defaultMin = query.min || 0;
        //const defaultMax = query.max || 20;
        //const defaultMin = searchParams.get("min") || 0;
        //const defaultMax = searchParams.get("max") || 20;
        //const action = searchParams.get("action");

        //console.log("parsedUrl.search: ", parsedUrl.search);
        // works
        //const pipeline = spawn(`${JSON_DIR}/json-hook`);
        //console.log({parsedUrl}, {path}, {defaultMin}, {defaultMax});
        const pipeline = spawn(
            `${JSON_DIR}/json-hook`,
            [
                queryString
            ]
        );

        //pipeline.stdout.on("data", function(data) {
        //console.log("data to send to client: ", data.toString());
        //});

        pipeline.stderr.on("data",
             (err) => console.error(Buffer.from(err).toString()));

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
