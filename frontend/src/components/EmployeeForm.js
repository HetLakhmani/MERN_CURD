import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    salary: '',
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/employees/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching employee data:', error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Update an employee
      axios.put(`/api/employees/${id}`, formData)
        .then(() => {
          navigate('/'); // Redirect to the employee list
        })
        .catch((error) => {
          console.error('Error updating employee:', error);
        });
    } else {
      // Create a new employee
      axios.post('/api/employees', formData)
        .then(() => {
          navigate('/'); // Redirect to the employee list
        })
        .catch((error) => {
          console.error('Error creating employee:', error);
        });
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Employee' : 'Create Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Salary:
          <input
            type="number"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            required
          />
        </label>
        <br />
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
