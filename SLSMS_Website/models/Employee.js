var mongoose = require('mongoose');


var EmployeeSchema = new mongoose.Schema({
  employee_id:{
          type: mongoose.Schema.Types.ObjectId,
          index: true,
          required: true,
          auto: true,
        },
  firstname:{
	  type: String,
	  required: 'please fill first name',
        },
  lastname: String,
  dateofbirth:{ 
       type: String,
	   required: 'please select date of birth'
       },
  passportno: {
	  type: String,
	  required: 'please fill passport number'
       },
  country: {
	  type:String,
	  required: 'please select country'
      },
  nationality: String,
  maritalStatus: String,
  comment: String,
  fathername: String,
  mothername: String,
  wifename: String,
  noofkids: Number,
  bankname: {
        type: String,
		required:'please select bank name'
      },
  accountno: {
	  type: String,
	  required: 'please fill account number'
      },
  updated_at: { type: Date, default: Date.now }
  
});


module.exports = mongoose.model('Employee', EmployeeSchema);
