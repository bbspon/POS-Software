import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    orderNumber: "",
    customer: "",
    date: "",
    status: "Pending",
    totalAmount: "",
  });
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/orders`;

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE);
      setOrders(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or update order
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingOrderId) {
        await axios.put(`${API_BASE}/${editingOrderId}`, formData);
      } else {
        await axios.post(API_BASE, formData);
      }
      setFormData({
        orderNumber: "",
        customer: "",
        date: "",
        status: "Pending",
        totalAmount: "",
      });
      setEditingOrderId(null);
      fetchOrders();
    } catch (err) {
      console.error("Save Error:", err);
    }
  };

  // Edit
  const handleEdit = (order) => {
    setFormData(order);
    setEditingOrderId(order._id);
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${API_BASE}/${id}`);
        fetchOrders();
      } catch (err) {
        console.error("Delete Error:", err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Orders Management</h2>
      <p className="text-muted">
        View and manage orders placed in the store and online.
      </p>

      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Order Number"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Customer"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="number"
            step="0.01"
            className="form-control"
            placeholder="Amount"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">
            {editingOrderId ? "Update" : "Create"}
          </button>
        </div>
      </form>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Order Number</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.customer}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "Completed" ||
                        order.status === "Delivered"
                          ? "bg-success"
                          : order.status === "Pending"
                          ? "bg-warning"
                          : "bg-secondary"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(order)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(order._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;
