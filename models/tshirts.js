var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var Images = new Schema({
    nombre :{type : String},
    url: { type: String, required: true }
});
 
var Tshirt = new Schema({
  model:    { type: String, require: true },
  images:    [Images],
  name:     {type: String},
  style:    { type: String, 
              enum:  ['Casual', 'Vintage', 'Alternative'],
              require: true 
            },
  size:     { type: Number, 
              enum: [36, 38, 40, 42, 44, 46],
              require: true 
            },
  colour:   { type: String },
  price :   { type: Number, require: true },
  summary:  { type: String },
  modified: { type: Date, default: Date.now }    
});
 
Tshirt.path('model').validate(function (v) {
    return ((v !== "") && (v !== null));
});


module.exports = mongoose.model('Tshirt', Tshirt);
