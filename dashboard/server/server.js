/* jslint
    node
*/
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
//import authorizer from "../utils/auth.js";

// Time-series data routes
import tsdRouter from "./routes/tsd.js";

const app = express();

// Enable All CORS requests
app.use(cors());

app.use(logger("dev"));
app.use(express.json({limit: "25mb"}));
//app.use(express.urlencoded({limit: "25mb", extended: false}));
app.use(cookieParser());

app.use("/tsdRouter", tsdRouter);
app.get("/", function (req, res) {
    console.log("Server log.")
    res.json({test: "got root route"});
});

const server = app.listen(process.env.PORT, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log({host, port});  
    console.log(`Dashboard listening on http://${host}:${port}`);
})

//export default Object.freeze(app);