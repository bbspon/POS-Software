import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const VendorCustomerPage = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: '123-456-7890', address: '123 Elm St', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', phone: '987-654-3210', address: '456 Oak St', status: 'Inactive' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditCustomer = () => {
    if (editMode) {
      setCustomers(customers.map(cust => (cust.id === selectedCustomer.id ? selectedCustomer : cust)));
      alert('Customer updated successfully!');
    } else {
      setCustomers([...customers, { ...selectedCustomer, id: Date.now() }]);
      alert('Customer added successfully!');
    }
    setIsModalOpen(false);
    setSelectedCustomer(null);
    setEditMode(false);
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
      alert('Customer deleted successfully!');
    }
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Customer Management</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control mb-3"
      />
        {/* Add Customer Button */}
        <button onClick={() => { setIsModalOpen(true); setEditMode(false); setSelectedCustomer({ id: '', name: '', email: '', phone: '', address: '', status: 'Active' }); }} className="btn btn-primary">
        Add New Customer
      </button>
      
      {/* Customer Table */}
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>
                <span className={`badge ${customer.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                  {customer.status}
                </span>
              </td>
              <td>
                <button onClick={() => handleEditCustomer(customer)} className="btn btn-warning btn-sm mx-1">Edit</button>
                <button onClick={() => handleDeleteCustomer(customer.id)} className="btn btn-danger btn-sm mx-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      

      {/* Modal for Adding/Editing Customers */}
      {isModalOpen && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editMode ? 'Edit Customer' : 'Add New Customer'}</h5>
                <button onClick={() => setIsModalOpen(false)} className="close">&times;</button>
              </div>
              <div className="modal-body">
                <label>Name</label>
                <input type="text" name="name" value={selectedCustomer.name} onChange={handleInputChange} className="form-control" required />

                <label>Mobile</label>
                <input type="text" name="phone" value={selectedCustomer.phone} onChange={handleInputChange} className="form-control" required />

                <label>Email</label>
                <input type="email" name="email" value={selectedCustomer.email} onChange={handleInputChange} className="form-control" required />

                <label>Address</label>
                <input type="text" name="address" value={selectedCustomer.address} onChange={handleInputChange} className="form-control" required />

                <label>Status</label>
                <select name="status" value={selectedCustomer.status} onChange={handleInputChange} className="form-control">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-footer">
                <button onClick={handleAddOrEditCustomer} className="btn btn-success">{editMode ? 'Save Changes' : 'Add Customer'}</button>
                <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
        .customer-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.customer-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.customer-table th, .customer-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.active {
  background-color: #d4edda;
  color: #155724;
}

.inactive {
  background-color: #f8d7da;
  color: #721c24;
}

.add-customer-button {
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-customer-button:hover {
  background-color: #218838;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  margin-bottom: 20px;
}

.modal-content label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.modal-content input, .modal-content select {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.save-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #0056b3;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #c82333;
}
  .badge-success {
            background-color: #28a745;
          }
          .badge-danger {
            background-color: #dc3545;
          }
          .modal {
            background-color: rgba(0, 0, 0, 0.5);
          }
          .modal-content {
            padding: 20px;
            border-radius: 8px;
          }
          .close {
            background: none;
            border: none;
            font-size: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default VendorCustomerPage;
