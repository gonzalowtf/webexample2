
  
  function register(){
    
    
    var user = document.getElementById('username').value;
    var password = document.getElementById('pas').value;
    var password2 = document.getElementById('pas2').value;

    var email = document.getElementById('theemail').value;

    console.log(user+password+password2+email);
    
    if (password == password2){
      
      
      var seedData = [
     {
          username: user,
          password: password,
          email: email
          
  }
];
      

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.mongolab.com/api/1/databases/doggies/collections/users?apiKey=_vLDq9lvUO9ci-RsLIyj5McCzMxnI2uO", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(seedData);
      
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
    bootbox.alert("the passwords don't match!");
  }
  }
  
  
