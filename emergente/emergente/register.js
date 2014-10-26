function returnValue(user,email,password){
    
    var sta;
    var con = 0;
    $.get("https://api.mongolab.com/api/1/databases/cars/collections/users?apiKey=_vLDq9lvUO9ci-RsLIyj5McCzMxnI2uO",function(data,status){
    console.log(data + status+ data.length);
    for(var i =0;i<data.length;i++){
      console.log(data[i].username + user);
      if(user==data[i].username || email == data[i].email){
         sta= false;
         break;
               
       }
       else{
         sta=true;
         console.log("llego");
         con=con+1;
  
       }
       
       }
        console.log(sta);
         if(sta===true){    
      var seedData = [
     {
          username: user,
          password: password,
          email: email
          
  }
];
      
      console.log(seedData);
/*
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.mongolab.com/api/1/databases/doggies/collections/users?apiKey=_vLDq9lvUO9ci-RsLIyj5McCzMxnI2uO", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(seedData);
      
    
  */    
     
    $.ajax( { url: "https://api.mongolab.com/api/1/databases/cars/collections/users?apiKey=_vLDq9lvUO9ci-RsLIyj5McCzMxnI2uO",
		  data: JSON.stringify( seedData ),
		  type: "POST",
		  contentType: "application/json" } ).success(setTimeout(redireccionar(user,password,email), 3000)); 
      
     
     console.log("llego");  
     
        


    }
    //Components.utils.import("../mongodb.js");
    
    /*var mongodb = require('mongoose');
    
    

    var uri = "mongodb://gonzalowtf:aereomodelismo12@ds035750.mongolab.com:35750/doggies";
    
    mongodb.MongoClient.connect(uri, function(err, db) {
    
    if(err) throw err;
    
   var users = db.collection('users');
   
   
   users.insert(seedData);
      
      
    });
      
  }*/
    
  else{
      bootbox.alert("Username or Email already exist!!");
  }
        
  });
   
}

function redireccionar(user,password,email) { 
    var status = user;
    var an = "que";
    console.log(user);

pasarVariables("https://webexample-c9-gonzalowtf77.c9.io/webexample2/index.html",'user,status,password,email',status,user,password,email);

   
}
function pasarVariables(pagina,nombres,user,status,password,email) {
pagina +="?";
  var nomVec = nombres.split(",");
  var valores = [status,user,password,email];
  console.log(user + status);
  for (var i=0; i<nomVec.length; i++)
    pagina += nomVec[i] + "=" + valores[i]+"&";
    console.log(pagina);
    location.href=pagina;
}
  
  function reg(){
    
    
    var user = document.getElementById('username').value;
    var password = document.getElementById('pas').value;
    var password2 = document.getElementById('pas2').value;

    var email = document.getElementById('theemail').value;

    console.log(user+password+password2+email);
    
    if (password == password2){
      var ret =returnValue(user,email,password);
      console.log(ret);
 
    }
  else{
    bootbox.alert("the passwords don't match!");
  }
  
  }
  
  
