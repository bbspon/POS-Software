import React, { useEffect, useState } from "react";
import axios from "axios";

const BatchAndExpiryPage = () => {
  const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/batch`;

  const [batches, setBatches] = useState([]);
  const [form, setForm] = useState({
    productName: "",
    batchNumber: "",
    manufacturingDate: "",
    expiryDate: "",
    quantity: "",
    location: "",
  });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token"); // Assuming JWT is stored here

  const fetchBatches = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: token },
      });
      setBatches(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, form, {
          headers: { Authorization: token },
        });
      } else {
        await axios.post(API_URL, form, {
          headers: { Authorization: token },
        });
      }
      setForm({
        productName: "",
        batchNumber: "",
        manufacturingDate: "",
        expiryDate: "",
        quantity: "",
        location: "",
      });
      setEditId(null);
      fetchBatches();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (batch) => {
    setForm(batch);
    setEditId(batch._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: token },
      });
      fetchBatches();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  return (
    <div className="container">
      <h2 className="my-3">Batch & Expiry Management</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="productName"
            className="form-control"
            value={form.productName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Batch Number</label>
          <input
            type="text"
            name="batchNumber"
            className="form-control"
            value={form.batchNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Manufacturing Date</label>
          <input
            type="date"
            name="manufacturingDate"
            className="form-control"
            value={form.manufacturingDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            className="form-control"
            value={form.expiryDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={form.quantity}
            onChange={handleInputChange}
            required
            min="0"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={form.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary">
            {editId ? "Update Batch" : "Add Batch"}
          </button>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Batch #</th>
            <th>Manufactured</th>
            <th>Expires</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch._id}>
              <td>{batch.productName}</td>
              <td>{batch.batchNumber}</td>
              <td>{new Date(batch.manufacturingDate).toLocaleDateString()}</td>
              <td>{new Date(batch.expiryDate).toLocaleDateString()}</td>
              <td>{batch.quantity}</td>
              <td>{batch.status}</td>
              <td>{batch.location}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(batch)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(batch._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BatchAndExpiryPage;
