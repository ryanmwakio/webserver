/***************
Todos:
1) create a web server
2) allow the server to listen to a configurable port
3) serve a static or dynamic html
4) only headers accepted are Content-Type and Content-Length
**************/

//native imports
const fs = require("fs");
const path = require("path");
const https = require("https");

//node imports
const express = require("express");
const bodyParser = require("body-parser");

//SSL configuration
let options = {
  key: fs.readFileSync("mykey.pem"),
  cert: fs.readFileSync("my-cert.pem"),
  rejectUnauthorized: false,
};

//node configurations
require("dotenv").config();
const app = express();
let postHtml = path.join(__dirname, "post.html");
let getHtml = path.join(__dirname, "get.html");

app.use(bodyParser.urlencoded({ extended: false }));

//GET request
app.use("/", (req, res, next) => {
  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/html");
    return res.sendFile(getHtml);
  }
  next();
});

//POST request
app.use("/", (req, res, next) => {
  if (req.method === "POST") {
    let data = Array(req.body);
    res.set({
      "Content-Type": "text/html;charset=utf-8",
      "Content-Length": data.length,
    });

    return res.sendFile(postHtml);
  }
  next();
});

//catch all incase of error
app.use("*", (req, res, next) => {
  return res.status(400).json({ message: "sorry bad request" });
});

let PORT = process.env.PORT || 8000;

app.listen(PORT);

https.createServer(options, app).listen(8080, () => {
  console.log(`server running on ${PORT}`);
});
