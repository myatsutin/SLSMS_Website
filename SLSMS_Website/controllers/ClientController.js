var mongoose = require("mongoose");
var Client = require("../models/Client");
var ClientEmployee = require("../models/ClientEmployee");

var clientController = {};

// Show list of clients
clientController.list= function(req, res){
	Client.find({}).exec(function (err, clients) {

		if(err){
			console.log("Error:", err);
		}
		else{
			res.render("../views/clients/index", { clients: clients });
		}
	});
};
// Show list of client's employee

clientController.list_clients_emp= function(req, res){

      ClientEmployee.find({}).exec(function (err,clientEmployee) {
        console.log(clientEmployee);

        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render("../views/clientsemployee/index", {clientEmployee: clientEmployee});
        }
      });

};

//Show client by id
clientController.show = function(req, res) {
	Client.findOne({_id: req.params.id}).exec(function (err, client) {
		if (err) {
			console.log("Error:", err);
		}
		else {
			res.render("../views/clients/show", {client: client});
		}
	});
};
//Create new client
clientController.create = function(req,res){

// var country = require('countries-cities').getCountries();
var country = require ('countries-cities').getCountries(); // Returns an array of country names.

	res.render("../views/clients/create",{country:country});
};

//Save new client

// Edit a client
clientController.edit = function (req, res) {
	Client.findOne({ _id: req.params.id }).exec(function (err, client) {
		if (err) {
			console.log("Error:", err);
		}
		else {
			res.render("../views/clients/edit", { client: client });
		}
	});
};

// Update a client


// Inactive a client
clientController.delete = function (req, res) {
	Client.remove({ _id: req.params.id }, function (err) {
		if (err) {
			console.log(err);
		}
		else {
			console.log("Client inactive!");
			Client.find({}).exec(function (err, clients) {
				if (err) {
					console.log("Error:", err);
				}
				else {
					res.render("../views/clients/index", { clients: clients });
				}
			});
		}
	});
};

module.exports = clientController;
