/* jslint
    node
*/
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
//import authorizer from "../utils/auth.js";

// Time-series data routes
import apiRouter from "./routes/api.js";

const app = express();

// Enable All CORS requests
app.use(cors());

app.use(logger("dev"));
app.use(express.json({limit: "25mb"}));
//app.use(express.urlencoded({limit: "25mb", extended: false}));
app.use(cookieParser());
app.use("/", express.static('public')) 
app.use("/api", apiRouter);

// This method is identical to Node’s http.Server.listen().
const server = app.listen(process.env.PORT, process.env.HOST, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log({host, port});  
    console.log(`Dashboard listening on http://${host}:${port}`);
})

//export default Object.freeze(app);