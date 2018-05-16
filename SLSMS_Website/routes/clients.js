var express = require('express');
var mongoose = require('mongoose');
var client = require("../controllers/ClientController.js");
var clientemployee = require("../controllers/ClientController.js");

var path = require('path');
var multer  = require('multer');
var app = express();
var router = express.Router();

var Client = require("../models/Client");
var ClientEmployee = require("../models/ClientEmployee");


// file upload destination folder
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/clientUploads');
  },
  // file upload extension
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
// file upload variable
var upload = multer({
  storage: storage
});


// Get all clients
router.get('/', function(req, res) {
  client.list(req, res);
});

// Get all clients
router.get('/clientsemployee', function(req, res) {
  clientemployee.list_clients_emp(req, res);
});



// Get single client by id
router.get('/show/:id', function(req, res) {
  client.show(req, res);
});

// Create client
router.get('/create', function(req, res) {
  client.create(req, res);
});

// Save client
router.post('/save',upload.any(),function(req, res,next) {

  // router.post('/save',upload.any(''),function(req, res,next) {

  console.log(req.body);

  var client = new Client({

    company:req.body.company,
    address:req.body.address,
    country:req.body.country,
    city:req.body.city,
    postalcode:req.body.postalcode,
    officeno:req.body.officeno,
    website:req.body.website,
    //documents: req.file.filename,
    status:req.body.status

  });

  client.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/clients/create");
    } else {
      console.log("Successfully created a client.");
      Client.find({}).exec(function (err,clients) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render("../views/clients/index", {clients: clients});
        }
      });
    }
  });
  //});
});

//save client's employee
router.post('/client_emp_save',upload.any(),function(req, res,next) {

  console.log("client emp save");

  var clientEmployee = new ClientEmployee({

    firstname:req.body.firstname,
    lastname:req.body.lastname,
    designation:req.body.designation,
    dateofbirth:req.body.dateofbirth,
    email:req.body.email,
    officeno:req.body.officeno,
    mobileno:req.body.mobileno,
    passportno:req.body.passportno
  });

  clientEmployee.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/clients/index");
    } else {
      console.log("Successfully created a client's employee.");

      ClientEmployee.find({}).exec(function (err,clientEmployee) {
        console.log(clientEmployee);

        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render("../views/clientsemployee/index", {clientEmployee: clientEmployee});
        }
      });
    }
  });

});

// Edit client
router.get('/edit/:id', function(req, res) {
  client.edit(req, res);
});

// Edit update
// router.post('/update/:id',upload.single('photo'), function(req,res,next) {

router.post('/update/:id', function(req,res,next) {
  console.log(req.file);

  Client.findById(req.params.id, function(err, data) {

    data.company = req.body.company;
    data.address = req.body.address;
    data.country = req.body.country;
    data.city = req.body.city;
    data.website = req.body.website;
    data.officeno = req.body.officeno;

    if (req.file) {
      data.photo = req.file.filename;
    }

    data.save(function(err, data) {
      if (err) {
        return next(err);
      }
      Client.find({}).exec(function (err, clients) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render("../views/clients/index", {clients: clients});
        }
      });
    });
  });
});

  // Countries-cities
    router.get('/returncity', function(req, res, next) {
       var country_name = req.query.country_name;

       var cities = require ('countries-cities').getCities(country_name);

       res.send(cities);

    });

//Delete client
router.post('/delete/:id', function(req, res, next) {
  client.delete(req, res);
});

module.exports = router;
