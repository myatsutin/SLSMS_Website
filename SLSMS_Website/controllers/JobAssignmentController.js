var mongoose = require("mongoose");
var JobAssignment = require("../models/JobAssignment");
var Job = require("../models/Job");
var Employee = require("../models/Employee");

var jobAssignmentController = {};

// Show list of jobAssignments
jobAssignmentController.list = function(req, res) {
  JobAssignment.find({}).exec(function (err, jobassignments) {
    if (err) {
      console.log("Error:", err);
    }
    else {
	   Employee.find({}).exec(function (err, employees) {
		   if (err) {
                  console.log("Error:", err);
               }
	   		   
	   
	   console.log("emp::",employees);
      res.render("../views/jobAssignments/index", {jobassignments: jobassignments});
	  });
    }
  });
};

// Show jobAssignments by id
jobAssignmentController.show = function(req, res) {
  JobAssignment.findOne({_id: req.params.id}).exec(function (err, jobAssignment) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/jobAssignments/show", {jobAssignment: jobAssignment});
    }
  });
};

// Create new jobAssignments
jobAssignmentController.create = function(req, res) {
  res.render("../views/jobAssignments/create");
};

// Save new jobAssignments
jobAssignmentController.save = function(req, res) {
  var jobAssignment = new JobAssignment(req.body);

  jobAssignment.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/jobAssignments/create");
    } else {
      console.log("Successfully created a jobAssignment.");
      res.redirect("/jobAssignments/show/"+jobAssignment._id);
    }
  });
};

// Edit an jobAssignments
jobAssignmentController.edit = function(req, res) {
  JobAssignment.findOne({_id: req.params.id}).exec(function (err, jobAssignment) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/jobAssignments/edit", {jobAssignment: jobAssignment});
    }
  });
};

// Update a job
jobAssignmentController.update = function(req, res) {
  JobAssignment.findByIdAndUpdate(req.params.id, { $set: { employee_id: req.body.employee_id, employeename: req.body.employeename, 
                                                      jobtype: req.body.jobtype,vessel: req.body.vessel,
													  company: req.body.company,assigneddate: req.body.assigneddate,
													  destfrom: req.body.destfrom,destto: req.body.destto}}, { new: true }, function (err, job) {
    if (err) {
      console.log(err);
      res.render("../views/jobAssignments/edit", {jobAssignment: req.body});
    }
    res.redirect("/jobAssignments/show/"+jobAssignment._id);
  });
};

// Delete a job
jobAssignmentController.delete = function(req, res) {
  JobAssignment.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("JobAssignment deleted!");
      res.redirect("/jobAssignments");
    }
  });
};

module.exports = jobAssignmentController;
