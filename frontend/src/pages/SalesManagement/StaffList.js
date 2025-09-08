import React from 'react';

const StaffList = ({ staffData, setStaffData }) => {
  const handleDelete = (id) => {
    const updatedStaffData = staffData.filter((staff) => staff.id !== id);
    setStaffData(updatedStaffData);
  };

  return (
    <div className="staff-list">
      <h2>Staff Members</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Duties</th>
            <th>Duty Days</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.name}</td>
              <td>{staff.role}</td>
              <td>{staff.duties.join(', ')}</td>
              <td>{staff.dutyDays}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(staff.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
   

      <style>
        {`
        /* staff-form.css */
.staff-form-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
}

.staff-form-container h3 {
  text-align: center;
  margin-bottom: 20px;
}

.staff-form-container .form-group {
  margin-bottom: 15px;
}

.staff-form-container .form-group label {
  display: block;
  font-weight: bold;
}

.staff-form-container .form-group input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.staff-form-container button {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
}

.staff-list-container {
  padding: 20px;
}

.staff-list-container table {
  width: 100%;
  border-collapse: collapse;
}

.staff-list-container table th, .staff-list-container table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.staff-list-container button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.staff-list-container button:hover {
  background-color: #c0392b;
}
`}
      </style>
    </div>
  );
};

export default StaffList;
