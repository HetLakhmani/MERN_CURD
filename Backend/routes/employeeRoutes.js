const express = require('express');
const Employee = require('../models/employee');
const EmployeeDetails = require('../models/employeeDetails');
const router = express.Router();

// Create Employee
router.post('/employees', async (req, res) => {
  try {
    const { name, email, phone, salary } = req.body;
    const newEmployee = new Employee({ name, email, phone, salary });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// // Get Employee with Details
// router.get('/employees/:id', async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
//     const details = await EmployeeDetails.findOne({ employeeId: req.params.id });
//     res.status(200).json({ employee, details });
//   } catch (err) {
//     res.status(404).json({ error: err.message });
//   }
// });

router.get('/employees', async (req, res) => {
    try {
      const employees = await Employee.find(); // Fetch all employees
      res.status(200).json(employees);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// Increment Salary
router.patch('/employees/:id/increment', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) throw new Error('Employee not found');
    employee.salary += 5000;
    await employee.save();
    res.status(200).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/employees/:id', async (req, res) => {
    try {
      const { name, email, phone, salary } = req.body;
      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        { name, email, phone, salary },
        { new: true } // Return the updated document
      );
  
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      res.status(200).json(employee);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  router.delete('/employees/:id', async (req, res) => {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
  
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
    

module.exports = router;
