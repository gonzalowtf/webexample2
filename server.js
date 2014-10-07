var express = require("express"),
    app     = express(),
    http    = require("http"),
    server  = http.createServer(app),
    port = process.env.PORT || 3000,
    mongoose = require("mongoose"),
    ip=process.env.IP;
    
    
app.configure(function () {
  app.use(express.bodyParser()); 
  app.use(express.methodOverride());
  app.use(app.router); 
});
//app.use('/emergente', express.static(__dirname + '/emergente/emergente'));


var routes = require('./routes/tshirts')(app); 

console.log(ip+":"+port);



mongoose.connect("mongodb://gonzalowtf:aereomodelismo12@ds035750.mongolab.com:35750/tshirts", function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});


app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});


 server.listen(port, function() {
  console.log("Node server running on http://localhost:3000 or online port");
});
// Conexión


