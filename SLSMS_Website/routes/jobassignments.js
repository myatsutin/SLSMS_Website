var express = require('express');
var router = express.Router();
var jobassignment = require("../controllers/JobAssignmentController.js");

// Get all employees
router.get('/', function(req, res) {
  jobassignment.list(req, res);
});

// Get single employee by id
router.get('/show/:id', function(req, res) {
  jobassignment.show(req, res);
});

// Create employee
router.get('/create', function(req, res) {
  jobassignment.create(req, res);
    
});

// Save employee
router.post('/save', function(req, res) {
  jobassignment.save(req, res);
});

// Edit employee
router.get('/edit/:id', function(req, res) {
  jobassignment.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  jobassignment.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  jobassignment.delete(req, res);
});

module.exports = router;
