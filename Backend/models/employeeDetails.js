const mongoose = require('mongoose');

const employeeDetailsSchema = new mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
});

module.exports = mongoose.model('EmployeeDetails', employeeDetailsSchema);
