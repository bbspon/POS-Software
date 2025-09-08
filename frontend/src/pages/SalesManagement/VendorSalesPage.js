import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const VendorSalesPage = () => {
  const [sales, setSales] = useState([
    { id: 1, customer: 'John Doe', amount: 250, date: '2024-02-17', status: 'Completed' },
    { id: 2, customer: 'Jane Smith', amount: 120, date: '2024-02-16', status: 'Pending' },
  ]);

  const [newSale, setNewSale] = useState({ customer: '', amount: '', date: '', status: 'Pending' });
  const [editSale, setEditSale] = useState(null);
  const modalRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSale({ ...newSale, [name]: value });
  };

  const handleAddSale = () => {
    if (!newSale.customer || !newSale.amount || !newSale.date) {
      alert('Please fill in all fields.');
      return;
    }
    setSales([...sales, { ...newSale, id: Date.now() }]);
    setNewSale({ customer: '', amount: '', date: '', status: 'Pending' });
    closeModal();
  };

  const handleEditSale = (sale) => {
    setEditSale(sale);
    showModal();
  };

  const handleUpdateSale = () => {
    setSales(sales.map(sale => (sale.id === editSale.id ? editSale : sale)));
    setEditSale(null);
    closeModal();
  };

  const showModal = () => {
    if (modalRef.current) {
      const modalInstance = new window.bootstrap.Modal(modalRef.current);
      modalInstance.show();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      const modalInstance = new window.bootstrap.Modal(modalRef.current);
      modalInstance.hide();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Vendor Sales Management</h2>

      {/* Sales Table */}
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Amount ($)</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.customer}</td>
              <td>${sale.amount}</td>
              <td>{sale.date}</td>
              <td>{sale.status}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditSale(sale)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => setSales(sales.filter(s => s.id !== sale.id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Sale Button */}
      <button className="btn btn-success my-3" onClick={showModal}>Add New Sale</button>

      {/* Modal for Add/Edit Sale */}
      <div className="modal fade" id="saleModal" ref={modalRef} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{editSale ? 'Edit Sale' : 'Add New Sale'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Customer Name</label>
                <input type="text" name="customer" className="form-control" value={editSale ? editSale.customer : newSale.customer} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>Amount ($)</label>
                <input type="number" name="amount" className="form-control" value={editSale ? editSale.amount : newSale.amount} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input type="date" name="date" className="form-control" value={editSale ? editSale.date : newSale.date} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" className="form-control" value={editSale ? editSale.status : newSale.status} onChange={handleInputChange}>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              {editSale ? (
                <button className="btn btn-primary" onClick={handleUpdateSale}>Update Sale</button>
              ) : (
                <button className="btn btn-primary" onClick={handleAddSale}>Add Sale</button>
              )}
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default VendorSalesPage;
