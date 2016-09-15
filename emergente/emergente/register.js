function returnValue(user,email,password){
    
    var sta;
    var con = 0;
    var val;
    $.get("https://api.mlab.com/api/1/databases/cars/collections/users?apiKey=lYx2og5q7eaGd9iKMQt3QEZzTyV8Ue2v",function(data,status){
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
      val=user;
      console.log(seedData);
/*
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.mongolab.com/api/1/databases/doggies/collections/users?apiKey=_vLDq9lvUO9ci-RsLIyj5McCzMxnI2uO", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(seedData);
      
    
  */    
     
    $.ajax( { url: "https://api.mlab.com/api/1/databases/cars/collections/users?apiKey=lYx2og5q7eaGd9iKMQt3QEZzTyV8Ue2v",
		  data: JSON.stringify( seedData ),
		  type: "POST",
		  contentType: "application/json" } ).success(setTimeout(redireccionar(user,password,email,val), 3000)); 
      
     
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

function redireccionar(user,password,email,val) { 
    var status = user;
    var an = "que";
    console.log(user);

pasarVariables("https://webexample2-gonzalowtf77.c9users.io/index.html",'user,status,password,email,val',status,user,password,email,val);

   
}
function pasarVariables(pagina,nombres,user,status,password,email,val) {
pagina +="?";
  var nomVec = nombres.split(",");
  var valores = [status,user,password,email,val];
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
    bootbox.alert("the passwords don't match! or username is empty");
  }
  
  }
  
  
