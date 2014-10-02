var Tshirt = require('./models/tshirts');

// obtiene las camisetas de la base de datos


exports.getTshirt = function (req, res){
	Tshirt.find(
		function(err, tshirt) {
			if (err){
			        res.send(err);
				
			}
			else
					res.json(tshirt); // devuelve todas las remeras  en JSON
					console.log(tshirt);
				}
			);
} ;
/*exports.getImage = function (req, res){
	image.find(
		function(err, images) {
			if (err)
				res.send(err)
					res.json(images); // devuelve todas las remeras  en JSON
				}
			);
} 



	//db.tshirts.update({ _id : "5401cb0452468d2c11000005" } , { $set: {img: “\img\batman.jpg” }})





//bob espeonja : 5401ffbf4ce57f0409000004


//elmo : 5401ffde4ce57f0409000005
// spiderman : 540200104ce57f0409000006 
// star wars : 5402003c4ce57f0409000007
// spiderman : 540200564ce57f0409000008
// bart simpson : 540200dd4ce57f0409000009 
// u2 540201414ce57f040900000a negra
// u2 blanca : 540201804ce57f040900000b */