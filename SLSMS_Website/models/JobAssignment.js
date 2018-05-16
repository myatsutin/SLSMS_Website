var mongoose = require('mongoose');


var JobAssignmentSchema = new mongoose.Schema({
  employee_id: String,
  employeename: String,
  job_id: String,
  jobtype: String,
  vessel: String,
  company: String,
  assigneddate: String,
  traveldate: String,
  destfrom: String,
  destto: String
  
});


module.exports = mongoose.model('JobAssgnment', JobAssignmentSchema);
