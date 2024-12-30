import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('/api/employees')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center mb-4">Employee List</h2>
      <div className="row">
        {employees.map((employee) => (
          <div className="col-md-4 mb-4" key={employee._id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{employee.name}</h5>
                <p className="card-text">Salary: ${employee.salary}</p>
                <p className="card-text">Phone: {employee.phone}</p>
                <div className="d-flex justify-content-between">
                  <Link to={`/employee-details/${employee._id}`} className="btn btn-primary btn-sm">
                    Details
                  </Link>
                  <Link to={`/employee-form/${employee._id}`} className="btn btn-warning btn-sm">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      axios.delete(`/api/employees/${employee._id}`)
                        .then(() => {
                          setEmployees(employees.filter(emp => emp._id !== employee._id));
                        })
                        .catch(error => console.error('Error deleting employee:', error));
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
