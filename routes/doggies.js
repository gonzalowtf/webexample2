// en route
module.exports = function(app) {
 
  var Doggie = require('../models/doggies.js');
  var controller = require ('../controllers2.js');
  var modeloimagen = require ('../server.js');
 
  //GET - Return all tshirts in the DB
  var findAllDoggies = function(req, res) {
    console.log("GET - /doggies");
      return Doggie.find(function(err, doggies) {
          if(!err) {
              return res.send(doggies);
          } else {
        res.statusCode = 500;
              console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
          }
      });
  };
 
  //GET - Return a Tshirt with specified ID
  var findById = function(req, res) {
    console.log("GET - /doggie/:id");
    return Doggie.findById(req.params.id, function(err, doggie) {
      if(!doggie) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        // Send { status:OK, tshirt { tshirt values }}
        return res.send({ status: 'OK', doggie:doggie });
        // Send {tshirt values}
        // return res.send(tshirt);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };
 
  //POST - Insert a new Tshirt in the DB
 var addDoggie = function(req, res) {
    console.log('POST - /doggie');
    console.log(req.body);
 
    var doggie = new Doggie({
      model:    req.body.breed,
      images :  req.body.colour, 
      style:    req.body.size,
      size :    req.body.features, 
      colour:   req.body.price, 
      price:    req.body.img
        
    });
 
    doggie.save(function(err) {
      if(!err) {
        console.log("Tshirt created");
        return res.send({ status: 'OK', doggie:doggie });
      } else {
        console.log(err);
        if(err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
        console.log('Internal error(%d): %s',res.statusCode,err.message);
      }
    });
 
    res.send(doggie);
  };
 
  //PUT - Update a register already exists
  var updateDoggie = function(req, res) {
    console.log("PUT - /doggie/:id");
    console.log(req.body);
    return Doggie.findById(req.params.id, function(err, doggie) {
      if(!doggie) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
 
      if (req.body.model !== null) doggie.model = req.body.model;
      if (req.body.price !== null) doggie.price = req.body.price;
      if (req.body.images !== null) doggie.images = req.body.images; 
      if (req.body.style !== null) doggie.style = req.body.style;
      if (req.body.size !== null) doggie.size  = req.body.size;
      if (req.body.colour !== null) doggie.colour = req.body.colour;
      if (req.body.summary !== null) doggie.summary = req.body.summary;
      if (req.body.name !== null) doggie.name = req.body.name;

 
      return doggie.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', doggie:doggie });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }
 
        res.send(doggie);
      });
    });
  }
 
  //DELETE - Delete a Tshirt with specified ID
  var deleteDoggie = function(req, res) {
    console.log("DELETE - /doggie/:id");
    return Doggie.findById(req.params.id, function(err, doggie) {
      if(!doggie) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
 
      return doggie.remove(function(err) {
        if(!err) {
          console.log('Removed doggie');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }
 
  //Link routes and functions
  app.get('/doggies', findAllDoggies);
  app.get('/doggies', controller.getDoggie);
  app.get('/doggie/:id', findById);
  app.post('/doggie', addDoggie);
  app.put('/doggie/:id', updateDoggie);
  app.delete('/doggie/:id', deleteDoggie);
}

