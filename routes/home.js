const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const urls = [
        { origin: "www.google.com", shortUrl: "fafas" },
        { origin: "www.netfix.com", shortUrl: "fafadadws" },
        { origin: "www.wineglass.com", shortUrl: "dawdadwa" },
    ];
    res.render("home", {
        urls: urls,
    });
});

module.exports = router;
