// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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


app.get('/api/', function (req, res) {
  res.json({"unix": new Date().getTime(),"utc": new Date().toUTCString()})
})

app.get('/api/:date', function (req, res) {
  if(new Date(req.params.date).toUTCString() == "Invalid Date" && new Date(parseInt(req.params.date)).toUTCString() == "Invalid Date" ){
    res.json({ error : "Invalid Date" })
  } else{
    if(isNaN(req.params.date))
      res.json({"unix": new Date(req.params.date).getTime(),"utc": new Date(req.params.date).toUTCString()})
    else
      res.json({"unix": new Date(parseInt(req.params.date)).getTime(),"utc": new Date(parseInt(req.params.date)).toUTCString()})
  }
})


// listen for requests :)
var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
