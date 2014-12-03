var express = require("express"),
    app = express(),
    http    = require("http"), //m http module
    server  = http.createServer(app),
    port = process.env.PORT || 8000,
    mongoose = require("mongoose"),
    ip=process.env.IP,
    io = require("socket.io").listen(server),  //io listen on server where app s running
    nicknames = [];
    
    
app.configure(function () {
  app.use(express.bodyParser()); 
  app.use(express.methodOverride());
  app.use(app.router); 
});

//directing to other places of the site
app.use('/emergente/emergente', express.static(__dirname + '/emergente/emergente'));


var routes = require('./routes/tshirts')(app); 
var routes2 = require('./routes/doggies')(app); 
var routes3 = require('./routes/cars')(app); 

app.get('/', function(req, res) {
          //console.log(req.url);  actual direction
     
          res.sendfile(__dirname + '/index.html');  
          //res.end("hello world!");    
      
      });

//directing to another page now when page state in this position

app.get('/emergente/emergente/chat.html', function(req, res) {
          console.log(req.url);
     
        
          res.sendfile(__dirname + '/emergente/emergente/chat.html');      
      
      });      
      
         

console.log(ip+":"+port);
server.listen(port, function(err) {
  if(err){
      console.log("error !" + err);
      
  }else{
      
  
  console.log("Node server running on http://localhost:8000 or online port");
}
    
});

/*var handler = function(req,res){
    console.log(req.url);

    if (req.url==="/"){
         res.sendfile(__dirname + '/index.html'); 
    }
    else if (res.url === "/emergente/chat.html"){
        res.end("a pagina chat");
    }
    
}*/

/*app.get('/', function(req, res) {
      console.log(req.url);
      if(req.url === '/'){
          res.sendfile(__dirname + '/index.html');      
      }
      if(req.url === __dirname+'/emergente/emergente/chat.html') {
        res.sendfile(__dirname +'/emergente/emergente/chat.html');
      }

  
});*/



// Conexión


 



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
        if(data!=null){
       	socket.nickname=data;

       	nicknames.push(socket.nickname);
       	updatenicknames();
       }
       }

	});
    //"send-mesage" and "new message" are the functions on index and works everywhere
    socket.on("send-message" , function(data){
    	io.sockets.emit('new-message',{msg:data , nick:socket.nickname});
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
