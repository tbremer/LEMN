"use strict";

//
// MODULES
//
var path = require("path");
var express = require("express");
var app = express();
var winston = require("winston");
var mysql = require("mysql");

//
// SERVER VARS
//
var port = 3000;
var assetsDir = {root: path.join(__dirname, 'app/assets')};
var pubDir = {root: path.join(__dirname, 'public/')};
var logsDir = path.join(__dirname, 'logs/');

//
// MYSQL VARS
//
var connectionInfo = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'database'
};

//
// LOGGING
//
var logger = new (winston.Logger)({
  transports: [
  new (winston.transports.Console)({ level: 'error', colors: true }),
  new (winston.transports.File)({ filename: logsDir + 'server.log', level: 'debug' })
  ]
});

//
// STATIC FILES ROUTE
//
app.use('/assets', express.static(__dirname + '/app/assets'));


/***
 *
 *                 _
 *     ___ ___ _ _| |_ ___ ___
 *    |  _| . | | |  _| -_|  _|
 *    |_| |___|___|_| |___|_|
 *
 ***/
app.get("/", function(req, res) {
  logger.debug('debug', "%s %s %s", req.method, req.url, req.path);
  res.sendFile("index.html", pubDir);
});

app.get("/mysql/test", function (req, res) {
  res.set('Content-Type', 'application/json');

  var connection = mysql.createConnection(connectionInfo);

  connection.connect(function(err) {
    if (err) {
      logger.error('error connecting: ' + err.stack);
      res.send({success: false});
      return;
    }

    logger.debug('connected as id ' + connection.threadId);
    res.send({success: true});
  });

  connection.end();
});

app.get("/log/query", function (req, res) {
  res.set('Content-Type', '*/json');
  var options = {
    from: new Date - 24 * 60 * 60 * 1000,
    until: new Date,
    limit: 100,
    start: 0,
    order: 'desc',
    fields: ['message', 'timestamp']
  };

      // Find items logged between today and yesterday.
      logger.query(options, function (err, results) {
        if (err) throw err;

        res.send(results);
      });
    });


app.listen(port, function() {
  console.log("Listening on " + port);
});
