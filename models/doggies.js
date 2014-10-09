// en models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var Images = new Schema({
    nombre :{type : String},
    url: { type: String, required: true }
});
 
var Doggie = new Schema({
  breed:    { type: String, require: true },
  colour:     {type :String},
  size:     { type: String, 
              enum: [' vary small', 'small', 'medium', 'big','very big'],
              require: true 
            },
  features : {type: String ,require: true},            
  price :   { type: Number, require: true },
  img:   {type :String , require : true}
  
  
  });   
  
 
Doggie.path('model').validate(function (v) {
    return ((v !== "") && (v !== null));
});


module.exports = mongoose.model('Doggie', Doggie);