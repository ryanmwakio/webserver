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

//node imports
const express = require("express");
const bodyParser = require("body-parser");

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

let PORT = process.env.PORT || 8080; //server listens to the configured port else listen at port 8080
app.listen(PORT, () => {
  console.log(
    `server listening on ${process.env.SERVER_URL || "http://127.0.0.1" + PORT}`
  );
});
