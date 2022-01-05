# web server (with optional secure communication)

```bash
git clone https://github.com/ryanmwakio/webserver.git
```

Navigate into the project:<br/>
\*NB: make sure you have node installed if you haven't [node installation](https://nodejs.org/en/download/ "installation instructions")

```bash
npm install
```

Everything is now set to run the server:

```bash
npm start
```

what the above does, is run an instance of the server. The server is running at the configured port in the case of hosting provider or if it's on a local machine the server is running on port :8080<br/><br/>
The server is constantly listening to incoming requests and figures out if the request is a GET or POST and responds with a html page. The html can be static or dynamic.<br/><br/>

---

<span>The folder structure</span><br>

```
WEBSERVER
+----   node_modules
│----   README.md
│----   index.js
│----   .env
│----   get.html
│----   post.html
│----   package.json
│----   package-lock.json
```

<img src="https://img.icons8.com/fluency/48/000000/file.png" alt="drawing" width="15"/>[main.js](https://github.com/ryanmwakio/webserver/blob/master/index.js) <span style="color:grey">&nbsp;//This is where the server is running</span><br/>
<img src="https://img.icons8.com/fluency/48/000000/file.png" alt="drawing" width="15"/>.env <span style="color:grey">&nbsp;//some environment variables e.g SERVER_URL="http://127.0.0.1:8080"</span><br><br>

---

The `code`

```javascript
//GET request
app.use("/", (req, res, next) => {
  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/html");
    return res.sendFile(getHtml);
  }
  next();
});
//1) We are listening for a get request at the root "/" e.g http://127.0.0.1:8080/
//2) We set the Content-Type
//3) We return a response, a html file
//4) next()...Incase this is not the GET request e.g if the request is a POST, then we funnel it to the next request middleware
```

```javascript
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
//1) We are listening for a post request at the root "/" e.g http://127.0.0.1:8080/
//2) We set the Content-Type and Content-Length
//3) We return a response, a html file
//4) next()...Incase this is not the GET request e.g if the request is a POST, then we funnel it to the next request middleware
```
