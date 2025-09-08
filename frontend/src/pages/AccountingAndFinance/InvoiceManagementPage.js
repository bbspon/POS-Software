import React, { useEffect, useState } from "react";
import axios from "axios";

const InvoiceManagementPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    customerName: "",
    date: "",
    dueDate: "",
    amount: "",
    status: "Unpaid",
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token"); // JWT Token

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const fetchInvoices = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/invoices`, headers);
      setInvoices(res.data);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // No PUT yet — only POST and DELETE supported in backend
        alert("Edit is not yet enabled.");
        return;
      }
      await axios.post(`${API_URL}/api/invoices`, formData, headers);
      setFormData({
        invoiceNumber: "",
        customerName: "",
        date: "",
        dueDate: "",
        amount: "",
        status: "Unpaid",
      });
      setEditingId(null);
      fetchInvoices();
    } catch (err) {
      console.error("Error saving invoice:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/invoices/${id}`, headers);
      fetchInvoices();
    } catch (err) {
      console.error("Error deleting invoice:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Invoice Management</h2>

      <form onSubmit={handleSubmit} className="mb-4 row g-3">
        <div className="col-md-4">
          <input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number"
            className="form-control"
            value={formData.invoiceNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            className="form-control"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            name="dueDate"
            className="form-control"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="form-control"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            {editingId ? "Update" : "Save"}
          </button>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Invoice #</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.customerName}</td>
              <td>{invoice.date?.slice(0, 10)}</td>
              <td>{invoice.dueDate?.slice(0, 10)}</td>
              <td>${invoice.amount}</td>
              <td>{invoice.status}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(invoice._id)}
                >
                  Delete
                </button>
                {/* Edit button disabled for now */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceManagementPage;
