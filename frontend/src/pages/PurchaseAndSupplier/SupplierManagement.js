// SupplierManagementPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const SupplierManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    description: "",
    orderedBy: "",
    status: "Pending",
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token"); // assuming token is saved after login
  const headers = { Authorization: `Bearer ${token}` };
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/supplier-orders`, {
        headers,
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Fetch failed:", err.message);
    }
  };

  const addOrder = async () => {
    try {
      await axios.post(`${API_URL}/api/supplier-orders`, newOrder, {
        headers,
      });
      fetchOrders();
      setNewOrder({ description: "", orderedBy: "", status: "Pending" });
    } catch (err) {
      console.error("Add failed:", err.message);
    }
  };

  const updateOrder = async () => {
    try {
      await axios.put(`${API_URL}/api/supplier-orders/${editingId}`, newOrder, {
        headers,
      });
      fetchOrders();
      setEditingId(null);
      setNewOrder({ description: "", orderedBy: "", status: "Pending" });
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/supplier-orders/${id}`, {
        headers,
      });
      fetchOrders();
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  const handleEdit = (order) => {
    setNewOrder(order);
    setEditingId(order._id);
  };

  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Supplier Orders</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Description</th>
            <th>Ordered By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o.description}</td>
              <td>{o.orderedBy}</td>
              <td>{o.status}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(o)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteOrder(o._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-5">{editingId ? "Update Order" : "Add New Order"}</h4>
      <div className="mb-3">
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="form-control mb-2"
          value={newOrder.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="orderedBy"
          placeholder="Ordered By"
          className="form-control mb-2"
          value={newOrder.orderedBy}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          className="form-select mb-2"
          value={newOrder.status}
          onChange={handleChange}
          required
        >
          <option>Pending</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <button
          className="btn btn-primary"
          onClick={editingId ? updateOrder : addOrder}
        >
          {editingId ? "Update Order" : "Add Order"}
        </button>
      </div>
    </div>
  );
};

export default SupplierManagementPage;
