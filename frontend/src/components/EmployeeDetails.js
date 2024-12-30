import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null); // To store employee details
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetch employee details from the backend
    axios.get(`/api/employees/${id}`)
      .then((response) => {
        setEmployee(response.data); // Set employee details
        setLoading(false); // Disable loading
      })
      .catch((err) => {
        setError(err.message); // Set error message
        setLoading(false); // Disable loading
      });
  }, [id]);

  if (loading) return <p>Loading...</p>; // Show loading spinner or message
  if (error) return <p>Error: {error}</p>; // Show error message if any

  // Render employee details
  return (
    <div className="container">
      <h2>Employee Details</h2>
      {employee ? (
        <div className="card shadow-sm p-4">
          <h5 className="card-title">Name: {employee.name}</h5>
          <p className="card-text">Email: {employee.email}</p>
          <p className="card-text">Phone: {employee.phone}</p>
          <p className="card-text">Salary: ${employee.salary}</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Back to List
          </button>
        </div>
      ) : (
        <p>No employee details found!</p>
      )}
    </div>
  );
};

export default EmployeeDetails;
