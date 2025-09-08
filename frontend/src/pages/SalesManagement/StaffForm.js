import React, { useState } from 'react';

const StaffForm = ({ setStaffData, staffData }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [duties, setDuties] = useState([]);
  const [dutyDays, setDutyDays] = useState('');
  
  const roles = ['Manager', 'Cashier', 'Salesperson'];
  const allDuties = ['Sales', 'Inventory', 'Customer Service'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStaff = {
      id: staffData.length + 1,
      name,
      role,
      duties,
      dutyDays,
    };
    setStaffData([...staffData, newStaff]);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setRole('');
    setDuties([]);
    setDutyDays('');
  };

  const handleDutyChange = (e) => {
    const { value, checked } = e.target;
    setDuties((prevDuties) =>
      checked ? [...prevDuties, value] : prevDuties.filter((duty) => duty !== value)
    );
  };

  return (
    <div className="staff-form">
      <h2>Add New Staff</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select Role</option>
          {roles.map((roleOption, index) => (
            <option key={index} value={roleOption}>
              {roleOption}
            </option>
          ))}
        </select>
        
        <div>
          {allDuties.map((duty, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={duty}
                onChange={handleDutyChange}
                checked={duties.includes(duty)}
              />
              {duty}
            </label>
          ))}
        </div>
        
        <input
          type="text"
          placeholder="Duty Days (e.g., Mon, Tue)"
          value={dutyDays}
          onChange={(e) => setDutyDays(e.target.value)}
          required
        />
        
        <button type="submit">Add Staff</button>
      </form>
      <style>
        {`
        /* General styles for the Vendor Dashboard */
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  color: #2c3e50;
}

h2 {
  color: #34495e;
  margin-bottom: 20px;
}

/* Staff Form Styles */
.staff-form form {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.staff-form input,
.staff-form select {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.staff-form button {
  padding: 10px;
  background-color: #2980b9;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.staff-form button:hover {
  background-color: #3498db;
}

/* Staff List Styles */
.staff-list {
  margin-top: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.staff-list table {
  width: 100%;
  border-collapse: collapse;
}

.staff-list th, .staff-list td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.staff-list th {
  background-color: #2980b9;
  color: white;
}

.staff-list button {
  padding: 5px 10px;
  background-color: #f39c12;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
}

.staff-list button:hover {
  background-color: #e67e22;
}

.staff-list button:last-child {
  background-color: #e74c3c;
}

.staff-list button:last-child:hover {
  background-color: #c0392b;
}
`}
      </style>
    </div>
  );
};

export default StaffForm;
