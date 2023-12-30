import express from "express";
const router = express.Router();
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// http://IP:PORT/api
router.get("/", function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify( {data:"testing"} ));
});


router.get("/json-hook", function (req, res) {
    res.json({"json-hook": "a working"});
});

export default router;
