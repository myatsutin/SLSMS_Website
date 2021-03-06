var mongoose = require('mongoose');


var JobSchema = new mongoose.Schema({
  job_id:{
          type: mongoose.Schema.Types.ObjectId,
          index: true,
          required: true,
          auto: true,
        },
  jobtype: String,
  jobcategory: String,
  jobdescription: String,
  updated_at: { type: Date, default: Date.now }
  
});


module.exports = mongoose.model('Job', JobSchema);
