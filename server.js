// server.js
// where your node app starts

// init project
const port = process.env.PORT || 9090;
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// filled timestamp
app.get("/api/timestamp/:date_string", function (req, res) {
  const date_generated = isNaN(req.params.date_string) ? new Date(req.params.date_string) : new Date(+req.params.date_string);
  if(isNaN(date_generated.getTime())) {
    // invalid date
    res.json({"error" : "Invalid Date"});
  } else {
    // valid date
    res.json({"unix": date_generated.getTime(), "utc": date_generated.toUTCString()});
  }
});
// empty timestamp endpoint
app.get("/api/timestamp", function (req, res) {
  const date_generated = new Date();
  res.json({"unix": date_generated.getTime(), "utc": date_generated.toUTCString()});
});


// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});