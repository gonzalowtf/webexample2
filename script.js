 function log2(val){
     if(val ===null){
       bootbox.alert("Username is empty");
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
        callback: function(){
          bootbox.alert("Welcome back !     "+val);
        }
    });
     }
    
}
function log(){
  bootbox.prompt("Username:",function(val){
    log2(val);
  });
}
