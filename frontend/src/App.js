import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetails from './components/EmployeeDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Employee Management System</h1>
        <Routes>
          {/* Home route to list employees */}
          <Route path="/" element={<EmployeeList />} />

          {/* Route to create or edit an employee */}
          <Route path="/employee-form/:id?" element={<EmployeeForm />} />

          {/* Route to view employee details */}
          <Route path="/employee-details/:id" element={<EmployeeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
