const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  salary: { type: Number, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);
