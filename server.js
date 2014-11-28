var express = require("express"),
    app     = express(),
    http    = require("http"),
    server  = http.createServer(app),
    port = process.env.PORT || 8000,
    mongoose = require("mongoose"),
    ip=process.env.IP;
    
    
    
app.configure(function () {
  app.use(express.bodyParser()); 
  app.use(express.methodOverride());
  app.use(app.router); 
});
//app.use('/emergente', express.static(__dirname + '/emergente/emergente'));


var routes = require('./routes/tshirts')(app); 
var routes2 = require('./routes/doggies')(app); 
var routes3 = require('./routes/cars')(app); 


console.log(ip+":"+port);


app.get('/', function(req, res) {
      console.log(req.url);
      if(req.url === '/'){
          res.sendfile(__dirname + '/index.html');      
      }
      if(req.url === '/emergente/emergente/chat.html') {
        res.sendfile(__dirname +'/emergente/emergente/chat.html');
      }

  
});



// Conexión


 server.listen(port, function() {
  console.log("Node server running on http://localhost:3000 or online port");
});



mongoose.connect("mongodb://gonzalowtf:aereomodelismo12@ds035750.mongolab.com:35750/tshirts", function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

//--------------------------------------------------------------------------------------- socket
//for get data into server

// when the connection is ready everywhere here appears this
io.sockets.on("connection",function(socket){

// for the online users ta the moment od connection
	socket.on("new-user",function(data, callback){

       if(nicknames.indexOf(data) != -1){
       	callback(false);
       }
       else{
       	callback(true);
       	socket.nickname=data;
       	nicknames.push(socket.nickname);
       	updatenicknames();
       }

	});
    //"send-mesage" and "new message" are the functions on index and works everywhere
    socket.on("send-message" , function(data){
    	io.sockets.emit('new-message',{msg:data , nick : socket.nickname});
    });

function updatenicknames(){
	       	io.sockets.emit("usernames",nicknames);


}

  socket.on("disconnect" , function(data){

  			if(!socket.nickname) return;
  			nicknames.splice(nicknames.indexOf(socket.nickname),1);
  			updatenicknames();
  });
});