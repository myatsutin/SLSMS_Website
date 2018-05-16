var mongoose = require('mongoose');

var clientEmployeeScheme = new mongoose.Schema({
  client_id: String,
  firstname: String,
  lastname: String,
  designation: String,
  dateofbirth:String,
  email: String,
  mobileno: String,
  officeno: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClientEmployee', clientEmployeeScheme,'clientemployee');
