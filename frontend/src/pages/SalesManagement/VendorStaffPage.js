import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const VendorStaffPage = () => {
  const [staff, setStaff] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Manager", dutyDays: "Mon-Fri", mobile: "1234567890", address: "123 Main St", salary: "50000", pf: "12345", aadhaar: "123456789012", pan: "ABCDE1234F", image: "staff.png" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Cashier", dutyDays: "Sat-Sun", mobile: "0987654321", address: "456 Elm St", salary: "40000", pf: "67890", aadhaar: "987654321098", pan: "FGHIJ5678K", image: "" },
  ]);

  const [currentStaff, setCurrentStaff] = useState({ id: null, name: "", email: "", role: "Staff", dutyDays: "Mon-Fri", mobile: "", address: "", salary: "", pf: "", aadhaar: "", pan: "", image: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStaff({ ...currentStaff, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentStaff({ ...currentStaff, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleAddOrUpdateStaff = () => {
    if (!currentStaff.name || !currentStaff.email) {
      alert("Please enter name and email.");
      return;
    }

    if (currentStaff.id) {
      // Edit existing staff
      setStaff(staff.map((member) => (member.id === currentStaff.id ? currentStaff : member)));
    } else {
      // Add new staff
      setStaff([...staff, { ...currentStaff, id: Date.now() }]);
    }

    setCurrentStaff({ id: null, name: "", email: "", role: "Staff", dutyDays: "Mon-Fri", mobile: "", address: "", salary: "", pf: "", aadhaar: "", pan: "", image: "" });
  };

  const handleEditStaff = (staffMember) => {
    setCurrentStaff(staffMember);
  };

  const handleDeleteStaff = (id) => {
    setStaff(staff.filter((member) => member.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Vendor Staff Management</h2>

      {/* Staff Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Duty Days</th>
            <th>Mobile No</th>
            <th>Address</th>
            <th>Salary</th>
            <th>PF</th>
            <th>Aadhaar No</th>
            <th>Pan</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
              <td>{member.dutyDays}</td>
              <td>{member.mobile}</td>
              <td>{member.address}</td>
              <td>{member.salary}</td>
              <td>{member.pf}</td>
              <td>{member.aadhaar}</td>
              <td>{member.pan}</td>
              <td>
                {member.image && <img src={member.image} alt={member.name} style={{ width: "50px", height: "50px" }} />}
              </td>
              <td>
                {/* Edit Button */}
                <button
                  className="btn btn-warning btn-sm me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#staffModal"
                  onClick={() => handleEditStaff(member)}
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteStaff(member.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Staff Button */}
      <button
        className="btn btn-success my-3"
        data-bs-toggle="modal"
        data-bs-target="#staffModal"
        onClick={() => setCurrentStaff({ id: null, name: "", email: "", role: "Staff", dutyDays: "Mon-Fri", mobile: "", address: "", salary: "", pf: "", aadhaar: "", pan: "", image: "" })}
      >
        Add New Staff
      </button>

      {/* Bootstrap Modal for Add/Edit Staff */}
      <div className="modal fade" id="staffModal" tabIndex="-1" aria-labelledby="staffModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{currentStaff.id ? "Edit Staff" : "Add New Staff"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="form-group mb-2">
                <label>Name</label>
                <input type="text" name="name" className="form-control" value={currentStaff.name} onChange={handleInputChange} required />
              </div>

              <div className="form-group mb-2">
                <label>Email</label>
                <input type="email" name="email" className="form-control" value={currentStaff.email} onChange={handleInputChange} required />
              </div>

              <div className="form-group mb-2">
                <label>Mobile No</label>
                <input type="text" name="mobile" className="form-control" value={currentStaff.mobile} onChange={handleInputChange} />
              </div>

              <div className="form-group mb-2">
                <label>Address</label>
                <input type="text" name="address" className="form-control" value={currentStaff.address} onChange={handleInputChange} />
              </div>

              <div className="form-group mb-2">
                <label>Salary</label>
                <input type="text" name="salary" className="form-control" value={currentStaff.salary} onChange={handleInputChange} />
              </div>

              <div className="form-group mb-2">
                <label>PF</label>
                <input type="text" name="pf" className="form-control" value={currentStaff.pf} onChange={handleInputChange} />
              </div>

              <div className="form-group mb-2">
                <label>Aadhaar No</label>
                <input type="text" name="aadhaar" className="form-control" value={currentStaff.aadhaar} onChange={handleInputChange} />
              </div>

              <div className="form-group mb-2">
                <label>Pan</label>
                <input type="text" name="pan" className="form-control" value={currentStaff.pan} onChange={handleInputChange} />
              </div>

              <div className="form-group mb-2">
                <label>Image Upload</label>
                <input type="file" name="image" className="form-control" onChange={handleImageChange} />
              </div>

              <div className="form-group mb-2">
                <label>Role</label>
                <select name="role" className="form-control" value={currentStaff.role} onChange={handleInputChange}>
                  <option value="Staff">Staff</option>
                  <option value="Manager">Manager</option>
                  <option value="Cashier">Cashier</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="House Keeping">House Keeping</option>
                  <option value="Loader">Loader</option>
                </select>
              </div>

              <div className="form-group mb-2">
                <label>Duty Days</label>
                <select name="dutyDays" className="form-control" value={currentStaff.dutyDays} onChange={handleInputChange}>
                  <option value="Mon-Fri">Mon-Fri</option>
                  <option value="Fri-Sat">Fri-Sat</option>
                  <option value="Sat-Mon">Sat-Mon</option>
                  <option value="Sat-Sun">Sat-Sun</option>
                  <option value="All Days">All Days</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAddOrUpdateStaff}>
                {currentStaff.id ? "Update Staff" : "Add Staff"}
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
   
<style>
    {`
    
h2 {
  color: #333;
  font-weight: bold;
}

.table th, .table td {
  text-align: center;
}

.btn-sm {
  font-size: 14px;
}

.modal-content {
  border-radius: 8px;
}

.modal-header {
  background: #343a40;
  color: white;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}
`}
</style>
    </div>
  );
};

export default VendorStaffPage;
