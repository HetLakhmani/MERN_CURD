import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    axios.get('/api/employees')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  };

  useEffect(() => {
    // Fetch employees when the component mounts
    fetchEmployees();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/employees/${id}`)
      .then(() => {
        // Refetch the list after deletion
        fetchEmployees();
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  };

  return (
    <div>
      <h2>Employee List</h2>
      <Link to="/employee-form">
        <button>Create New Employee</button>
      </Link>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} - ${employee.salary}
            <Link to={`/employee-details/${employee._id}`}>
              <button>Details</button>
            </Link>
            <Link to={`/employee-form/${employee._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
