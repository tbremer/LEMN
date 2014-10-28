"use strict";
var express = require("express");
var path = require("path");
var app = express();
var winston = require("winston");
var mysql = require("mysql");
var port = 3000;
var pubDir = {root: path.join(__dirname, 'public/')};
var logsDir = path.join(__dirname, 'logs/');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'error', colors: true }),
      new (winston.transports.File)({ filename: logsDir + 'server.log', level: 'debug' })
    ]
});

app.get("/", function(req, res) {
    console.log(logsDir);
    logger.error('fac of face');
    logger.debug('debug', "%s %s %s", req.method, req.url, req.path);
    res.sendFile("index.html", pubDir);
});

app.get("/log/query", function (req, res) {
    res.set('Content-Type', 'application/json');
    var options = {
        from: new Date - 24 * 60 * 60 * 1000,
        until: new Date,
        limit: 100,
        start: 0,
        order: 'desc',
        fields: ['message', 'timestamp']
      };

      // logger.debug(JSON.stringify(options));

      //
      // Find items logged between today and yesterday.
      //
      logger.query(options, function (err, results) {
        if (err) {
          throw err;
        }

        res.send(results);
      });
});

/* serves all the static files */
// app.get(/^(.+)$/, function(req, res){
//     console.log("static file request : " + req.params);
//     res.sendfile( __dirname + req.params[0]);
// });


app.listen(port, function() {
    console.log("Listening on " + port);
});
