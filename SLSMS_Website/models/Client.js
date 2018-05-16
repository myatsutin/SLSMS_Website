// // var mongoose = require('mongoose'),
// //     Schema = mongoose.Schema,
// //     soft_delete = require('mongoose-softdelete');
//
// var mongoose = require('mongoose');
//
// var ClientScheme = new mongoose.Schema({
//   client_id: String,
//   company: String,
//   address: String,
//   country: String,
//   city: String,
//   officeno: String,
//   website: String,
//   status: String,
//   photo:String,
//   updated_at: { type: Date, default: Date.now }
//
// });
//
// // ClientScheme.plugin(soft_delete);
// module.exports = mongoose.model('Client', ClientScheme, 'clients');
var mongoose = require('mongoose');


var ClientScheme = new mongoose.Schema({
  client_id: String,
  company: String,
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
