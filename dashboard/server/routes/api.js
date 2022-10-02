import express from "express";
const router = express.Router();
import path from "path";

// http://IP:PORT/api
router.get("/", function(req, res, next) {
    res.sendFile("tsd.html", {root: path.join(__dirname, "./public")})    
});

router.get("/a", function (req, res) {
    res.json({"cmd": "a working"});
});

export default router;
