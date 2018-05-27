var mongoose = require('mongoose');


var ClientScheme = new mongoose.Schema({
  client_id: String,
  companyname: String,
  address: String,
  country: String,
  city: String,
  postalcode: String,
  officeno: String,
  website: String,
  documents: String,
  status: String,
  updated_at: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Client', ClientScheme, 'clients');
