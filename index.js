const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8090;
const gis = require('async-g-i-s');

app.set("json spaces", 2);
app.set("trust proxy", "0.0.0.0");

app.get("/", (req, res) => res.redirect("https://github.com/caliph91/google-image-api"));

app.get("/search", async (req, res, next) => {
let { nsfw, q } = req.query;
if (!q) return res.json({ status: 400, message: "Missing param 'q'" });
safe = nsfw == "true" ? null : "on";
let result = await gis(q, { query: { safe }});
return res.json({ status: 200, count: result.length, result: result.map(a => {
return { url: unescape(JSON.parse('"' + a.url + '"')), width: a.width, height: a.height }
})
})
})

app.listen(PORT, () => console.log("App running on port", PORT));