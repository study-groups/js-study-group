/* jslint
    node
*/
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
//import authorizer from "../utils/auth.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Time-series data routes
import apiRouter from "./routes/api.js";

const app = express();

// Enable All CORS requests
app.use(cors());

app.use(logger("dev"));
app.use(express.json({limit: "25mb"}));
//app.use(express.urlencoded({limit: "25mb", extended: false}));
app.use(cookieParser());
console.log(__dirname)
//app.use( express.static(__dirname + '../public'))
app.use("/api", apiRouter);
app.use('/', express.static('public'))
const port=process.argv[2] || 6777;
const host=process.argv[3] || "0.0.0.0";

// This method is identical to Node’s http.Server.listen().
//const server = app.listen(process.env.PORT, process.env.HOST, function() {
const server = app.listen(port, host, function() {
    const actualHost = server.address().address;
    const actualPort= server.address().port;
    console.log({host, port});
    console.log(`Dashboard listening on http://${actualHost}:${actualPort}`);
});

//export default Object.freeze(app);
