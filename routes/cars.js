// en route
module.exports = function(app) {
 
  var Car = require('../models/cars.js');
  var controller = require ('../controllers3.js');
  var modeloimagen = require ('../server.js');
 
  //GET - Return all tshirts in the DB
  var findAllCars = function(req, res) {
    console.log("GET - /cars");
      return Car.find(function(err, cars) {
          if(!err) {
              return res.send(cars);
          } else {
        res.statusCode = 500;
              console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
          }
      });
  };
 
  //GET - Return a Tshirt with specified ID
  var findById = function(req, res) {
    console.log("GET - /car/:id");
    return Car.findById(req.params.id, function(err, car) {
      if(!car) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        // Send { status:OK, tshirt { tshirt values }}
        return res.send({ status: 'OK', car:car });
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
 var addCar = function(req, res) {
    console.log('POST - /car');
    console.log(req.body);
 
    var car = new Car({
      model:    req.body.model,
      images :  req.body.colour, 
      style:    req.body.type,
      size :    req.body.features, 
      colour:   req.body.price, 
      price:    req.body.img
        
    });
 
    car.save(function(err) {
      if(!err) {
        console.log("Car created");
        return res.send({ status: 'OK', car:car });
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
 
    res.send(car);
  };
 
  //PUT - Update a register already exists
  var updateCar = function(req, res) {
    console.log("PUT - /car/:id");
    console.log(req.body);
    return Car.findById(req.params.id, function(err, car) {
      if(!car) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
 
      if (req.body.model !== null) car.model = req.body.model;
      if (req.body.price !== null) car.price = req.body.price;
      if (req.body.images !== null) car.images = req.body.images; 
      if (req.body.style !== null) car.style = req.body.style;
      if (req.body.size !== null) car.size  = req.body.size;
      if (req.body.colour !== null) car.colour = req.body.colour;
      if (req.body.summary !== null) car.summary = req.body.summary;
      if (req.body.name !== null) car.name = req.body.name;

 
      return car.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK',car:car });
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
 
        res.send(car);
      });
    });
  }
 
  //DELETE - Delete a Tshirt with specified ID
  var deleteCar = function(req, res) {
    console.log("DELETE - /car/:id");
    return Car.findById(req.params.id, function(err, car) {
      if(!car) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
 
      return car.remove(function(err) {
        if(!err) {
          console.log('Removed car');
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
  app.get('/cars', findAllCars);
  app.get('/cars', controller.getCar);
  app.get('/car/:id', findById);
  app.post('/car', addCar);
  app.put('/car/:id', updateCar);
  app.delete('/car/:id', deleteCar);
}

