var express = require("express"),
    app     = express(),
    http    = require("http"),
    server  = http.createServer(app),
    port = process.env.PORT || 3000,
    mongoose = require("mongoose");
    
    
app.configure(function () {
  app.use(express.bodyParser()); 
  app.use(express.methodOverride());
  app.use(app.router); 
});


app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

server.listen(port, function() {
  console.log("Node server running on http://localhost:3000 or online port");
});