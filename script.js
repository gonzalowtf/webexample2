var al = getVar();


change(al.val);


 function log2(val){
     var con =0;
     var bandera= false;
     var posi =0;
     $.get("https://api.mlab.com/api/1/databases/cars/collections/users?apiKey=lYx2og5q7eaGd9iKMQt3QEZzTyV8Ue2v",function(data,status){

         for(var i =0 ; i < data.length;i++){
             if(val == data[i].username){
                 console.log("username confirmed !");
                 con=0;
                 posi=i;
                 break;
             }
             else{
                 con = con + 1;
             }
         }
         if(con == data.length){
             bandera=true;
         }
     
     if(val ===null || val==="" || val.length < 2 || bandera === true){
       bootbox.alert("Username does not exist!");
     }
     else{
      bootbox.prompt({
        title: 'Enter Your Password',
        inputType: 'password',
        buttons: {
            confirm: {
                label: 'Submit'
            }
        },
       callback: function(value){
           if(value==data[posi].password){
         document.getElementById("id").innerHTML = val;
         document.getElementById("loged").setAttribute("onClick", "logeado('"+val+"')");
         change(val);
         
          bootbox.alert("Welcome back !     "+val);
          
        }
        else{

                      bootbox.alert("Wrong password for "+val+" please try it again or register");


        }
          
        }
    });
     }
    
});
}
function log(){
  bootbox.prompt("Username:",function(val){
    log2(val);
  });
}

function logeado(val){
    
    
    bootbox.alert("You are already logged in ! !------>"+val+"\n For log out just leave the site");
    
    
    
    
    
    
    
    
}
function change(val){
    
    if(typeof(val)== "string" ){

         document.getElementById("conta").setAttribute("href", "emergente/emergente/contact.html?y=nothing&val="+val+"&");
         document.getElementById("id").innerHTML = val;
         document.getElementById("reg").setAttribute("href", "emergente/emergente/register.html?y=nothing&val="+val+"&");
         document.getElementById("stor").setAttribute("href", "emergente/emergente/store.html?y=nothing&val="+val+"&");
         document.getElementById("chat").setAttribute("href", "emergente/emergente/chat.html?y=nothing&val="+val+"&");
         document.getElementById("home").setAttribute("href", "https://webexample2-gonzalowtf77.c9users.io/?y=nothing&val="+val+"&");
         document.getElementById("loged").setAttribute("onClick", "logeado('"+val+"')");



}
    
    
    
    
    
}
 function getVar(){
      
      var url = location.search.replace("?",",");
      var arr=url.split("&");
      var obj = {};
      for (var i =0; i<arr.length;i++){
        var x = arr[i].split("=");
        obj[x[0]]=x[1];
      }
      return obj;
      
    }
      

