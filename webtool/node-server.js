const http = require("http");
const fs = require("fs");
// https://nodejs.org/docs/latest/api/process.html#process_process_argv
const PORT = process.argv[2] || 3000;
const DATA_PATH = process.argv[3] || "./data/index.json";
const IP = process.env.IP;

const server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    fs.readFile(DATA_PATH, function(err, data) {
        if (err) {
            throw err;
        }
        res.end(data);
    }); 
});

server.listen(PORT, IP);
console.log(`Node application running on port ${PORT}`);
