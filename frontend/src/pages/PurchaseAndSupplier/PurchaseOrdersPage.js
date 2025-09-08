// PurchaseOrdersPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const PurchaseOrdersPage = () => {
  const [form, setForm] = useState({
    companyName: "",
    companyAddress: "",
    orderNumber: "",
    orderDate: "",
    vendorName: "",
    vendorAddress: "",
    items: [{ itemCode: "", description: "", quantity: 1, unitCost: 0.0 }],
  });

  const [orders, setOrders] = useState([]);
  const [editId, setEditId] = useState(null);

  const calculateSubtotal = () => {
    return form.items.reduce((sum, item) => {
      return sum + item.quantity * item.unitCost;
    }, 0);
  };

  const calculateTax = (subtotal) => {
    return +(subtotal * 0.18).toFixed(2);
  };

  const calculateTotal = (subtotal, tax) => {
    return +(subtotal + tax).toFixed(2);
  };
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/purchase-orders`);
      setOrders(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...form.items];
    updatedItems[index][field] =
      field === "quantity" || field === "unitCost" ? parseFloat(value) : value;
    setForm({ ...form, items: updatedItems });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [
        ...form.items,
        { itemCode: "", description: "", quantity: 1, unitCost: 0 },
      ],
    });
  };

  const removeItem = (index) => {
    const updatedItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: updatedItems });
  };

  const handleSubmit = async () => {
    const subtotal = calculateSubtotal();
    const taxes = calculateTax(subtotal);
    const total = calculateTotal(subtotal, taxes);

    const payload = {
      ...form,
      subtotal,
      taxes,
      total,
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}/api/purchase-orders/${editId}`, payload);
      } else {
        await axios.post(`${API_URL}/api/purchase-orders`, payload);
      }
      fetchOrders();
      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const resetForm = () => {
    setForm({
      companyName: "",
      companyAddress: "",
      orderNumber: "",
      orderDate: "",
      vendorName: "",
      vendorAddress: "",
      items: [{ itemCode: "", description: "", quantity: 1, unitCost: 0 }],
    });
    setEditId(null);
  };

  const handleEdit = (order) => {
    setForm(order);
    setEditId(order._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/purchase-orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Purchase Orders</h2>

      <div className="row g-3">
        <div className="col-md-6">
          <input
            name="companyName"
            className="form-control"
            placeholder="Company Name"
            value={form.companyName}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <input
            name="companyAddress"
            className="form-control"
            placeholder="Company Address"
            value={form.companyAddress}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <input
            name="orderNumber"
            className="form-control"
            placeholder="Order Number"
            value={form.orderNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <input
            name="orderDate"
            type="date"
            className="form-control"
            value={form.orderDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <input
            name="vendorName"
            className="form-control"
            placeholder="Vendor Name"
            value={form.vendorName}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <input
            name="vendorAddress"
            className="form-control"
            placeholder="Vendor Address"
            value={form.vendorAddress}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <hr />

      <h5>Items</h5>
      {form.items.map((item, index) => (
        <div key={index} className="row g-2 mb-2">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Item Code"
              value={item.itemCode}
              onChange={(e) =>
                handleItemChange(index, "itemCode", e.target.value)
              }
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value)
              }
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              type="number"
              placeholder="Unit Cost"
              value={item.unitCost}
              onChange={(e) =>
                handleItemChange(index, "unitCost", e.target.value)
              }
            />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-danger"
              onClick={() => removeItem(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary mb-3" onClick={addItem}>
        + Add Item
      </button>

      <h6>Subtotal: ₹{calculateSubtotal()}</h6>
      <h6>Taxes (18%): ₹{calculateTax(calculateSubtotal())}</h6>
      <h5>
        Total: ₹
        {calculateTotal(calculateSubtotal(), calculateTax(calculateSubtotal()))}
      </h5>

      <button className="btn btn-primary mt-2" onClick={handleSubmit}>
        {editId ? "Update Order" : "Save Order"}
      </button>

      <hr />

      <h4>Saved Purchase Orders</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Date</th>
            <th>Vendor</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5">No orders found</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderNumber}</td>
                <td>{order.orderDate}</td>
                <td>{order.vendorName}</td>
                <td>₹{order.total}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(order)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrdersPage;
