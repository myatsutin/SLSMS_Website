var mongoose = require("mongoose");
var Job = require("../models/Job");

var jobController = {};

// Show list of jobs
jobController.list = function(req, res) {
  Job.find({}).exec(function (err, jobs) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/jobs/index", {jobs: jobs});
    }
  });
};

// Show job by id
jobController.show = function(req, res) {
  Job.findOne({_id: req.params.id}).exec(function (err, job) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/jobs/show", {job: job});
    }
  });
};

// Create new job
jobController.create = function(req, res) {
  res.render("../views/jobs/create");
};

// Save new job
jobController.save = function(req, res) {
  var job = new Job(req.body);

  job.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/jobs/create");
    } else {
      console.log("Successfully created a job.");
      res.redirect("/jobs/show/"+job._id);
    }
  });
};

// Edit an job
jobController.edit = function(req, res) {
  Job.findOne({_id: req.params.id}).exec(function (err, job) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/jobs/edit", {job: job});
    }
  });
};

// Update a job
jobController.update = function(req, res) {
  Job.findByIdAndUpdate(req.params.id, { $set: { jobtype: req.body.jobtype, jobcategory: req.body.jobcategory, 
                                                      jobdescription: req.body.jobdescription}}, { new: true }, function (err, job) {
    if (err) {
      console.log(err);
      res.render("../views/jobs/edit", {job: req.body});
    }
    res.redirect("/jobs/show/"+job._id);
  });
};

// Delete a job
jobController.delete = function(req, res) {
  Job.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Job deleted!");
      res.redirect("/jobs");
    }
  });
};

module.exports = jobController;
