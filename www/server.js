"use strict";
var express = require("express");
var path = require("path");
var app = express();
var port = 3000;
var pubDir = {root: path.join(__dirname, 'public/')}

app.get("/", function(req, res) {
    console.log("%s %s %s", req.method, req.url, req.path);
    res.sendFile("index.html", pubDir);
    // res.end('cheese');
});

/* serves all the static files */
// app.get(/^(.+)$/, function(req, res){
//     console.log("static file request : " + req.params);
//     res.sendfile( __dirname + req.params[0]);
// });


app.listen(port, function() {
    console.log("Listening on " + port);
});
