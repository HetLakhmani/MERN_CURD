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
      axios.put(`/api/employees/${id}`, formData)
        .then(() => navigate('/'))
        .catch((error) => console.error('Error updating employee:', error));
    } else {
      axios.post('/api/employees', formData)
        .then(() => navigate('/'))
        .catch((error) => console.error('Error creating employee:', error));
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">{id ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="number"
            className="form-control"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          {id ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
