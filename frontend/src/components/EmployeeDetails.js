import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams(); // Get employee ID from the URL
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Fetch employee details
    axios.get(`/api/employees/${id}`)
      .then(response => {
        setEmployee(response.data.employee);
      })
      .catch(error => {
        console.error('Error fetching employee details:', error);
      });
  }, [id]);

  const handleIncrementSalary = () => {
    axios.patch(`/api/employees/${id}/increment`)
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.error('Error incrementing salary:', error);
      });
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div>
      <h2>Employee Details</h2>
      <p>Name: {employee.name}</p>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Salary: ${employee.salary}</p>
      <button onClick={handleIncrementSalary}>Increment Salary</button>
    </div>
  );
};

export default EmployeeDetails;
