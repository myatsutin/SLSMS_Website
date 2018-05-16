var mongoose = require("mongoose");
var Employee = require("../models/Employee");
var Country=require("../models/Country");

var Jobs = require("../models/Job");
var employeeController = {};


// Show list of employees

employeeController.list = function(req, res) {
  Employee.find({}).exec(function (err, employees) {
    if (err) {
      console.log("Error:", err);
    }
    else {
		console.log("abcdhhhhh");
  Country.find({}).exec(function (err, countrys) {
               if (err) {
                  console.log("Error:", err);
               }
               
         
      res.render("../views/employees/index", {employees: employees,countrys:countrys});
	  });
    }
  });
};

// Show employee by id
employeeController.show = function(req, res) {
  Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employees/show", {employee: employee});
    }
  });
};

// Create new employee
employeeController.create = function(req, res) {
       res.render("../views/employees/create");
};

// Save new employee
employeeController.save = function(req, res) {
  var employee = new Employee(req.body);

  employee.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/employees/create");
    } else {
      console.log("Successfully created an employee.");
      res.redirect("/employees/show/"+employee._id);
    }
  });
};

// Edit an employee
employeeController.edit = function(req, res) {
  Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employees/edit", {employee: employee});
    }
  });
};

// Update an employee
employeeController.update = function(req, res) {
  Employee.findByIdAndUpdate(req.params.id, { $set: { firstname: req.body.firstname, lastname: req.body.lastname, 
                                                      dateofbirth: req.body.dateofbirth, passportno: req.body.passportno,
													  country: req.body.country, nationality: req.body.nationality,
													  maritalStatus: req.body.maritalStatus, comment: req.body.comment,
													  fathername: req.body.fathername, mothername: req.body.mothername,
													  wifename: req.body.wifename, nationality: req.body.noofkids,
													  bankname: req.body.bankname, accountno: req.body.accountno,}}, { new: true }, function (err, employee) {
    if (err) {
      console.log(err);
      res.render("../views/employees/edit", {employee: req.body});
    }
    res.redirect("/employees/show/"+employee._id);
  });
};

// Delete an employee
employeeController.delete = function(req, res) {
  Employee.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Employee deleted!");
      res.redirect("/employees");
    }
  });
};

module.exports = employeeController;
