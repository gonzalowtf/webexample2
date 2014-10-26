 function log2(val){
     var con =0;
     var bandera= false;
     var posi =0;
     $.get("https://api.mongolab.com/api/1/databases/cars/collections/users?apiKey=_vLDq9lvUO9ci-RsLIyj5McCzMxnI2uO",function(data,status){

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
          bootbox.alert("Welcome back !     "+val);
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
