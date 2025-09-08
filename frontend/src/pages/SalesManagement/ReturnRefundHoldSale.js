import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Toast } from "bootstrap";

const HoldSale = () => {
  const [holdOrders, setHoldOrders] = useState([
    { id: "#HS102", date: "Feb 5, 2024", total: "£200.50", channel: "POS", status: "On Hold" },
    { id: "#HS101", date: "Feb 4, 2024", total: "£145.75", channel: "POS", status: "On Hold" },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(""); // ✅ Store updated status
  const [toastMessage, setToastMessage] = useState("");
  const [toastInstance, setToastInstance] = useState(null);

  useEffect(() => {
    const toastEl = document.getElementById("liveToast");
    if (toastEl) {
      setToastInstance(new Toast(toastEl));
    }
  }, []);

  const showToastMessage = (message) => {
    setToastMessage(message);
    if (toastInstance) {
      toastInstance.show();
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setUpdatedStatus(order.status); // ✅ Set initial status from order
    setShowForm(true);
  };

  const handleStatusChange = (event) => {
    setUpdatedStatus(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!selectedOrder) return;

    // ✅ Update the order status in the state
    setHoldOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: updatedStatus } : order
      )
    );

    showToastMessage(`✅ Order ${selectedOrder.id} updated to ${updatedStatus}!`);
    setShowForm(false); // Close the form after updating
  };

  return (
    <div className="container">
      {/* ✅ Toast Notification */}
      <div className="toast-container position-fixed top-0 end-0 p-3">
        <div id="liveToast" className="toast align-items-center text-white bg-primary border-0" role="alert">
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      </div>

      {/* 📌 Navigation Tabs */}
      <div className="nav-tabs">
        <Link to="/ReturnsAndRefunds" className="tab">Sale History</Link>
        <Link to="/ReturnRefundHoldSale" className="tab active">Hold Sale</Link>
        <Link to="/ReturnRefundOfflineOrders" className="tab">Offline Sale/Orders</Link>
      </div>

      {/* 📌 Order Table */}
      <div className="order-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Order Total</th>
              <th>Channel</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {holdOrders.map((order) => (
              <tr key={order.id} onClick={() => handleOrderClick(order)}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.total}</td>
                <td>{order.channel}</td>
                <td className={`status ${order.status.toLowerCase().replace(" ", "-")}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📌 Order Form (Shows when clicking "On Hold") */}
      {showForm && selectedOrder && (
        <div className="form-popup">
          <div className="form-container">
            <h3>Update Hold Sale - {selectedOrder.id}</h3>
            <form onSubmit={handleFormSubmit}>
              <label>Order ID</label>
              <input type="text" value={selectedOrder.id} readOnly />

              <label>Customer Name</label>
              <input type="text" value="John Doe" readOnly />

              <label>Order Date</label>
              <input type="text" value={selectedOrder.date} readOnly />

              <label>Total Amount</label>
              <input type="text" value={selectedOrder.total} readOnly />

              <label>Status</label>
              <select value={updatedStatus} onChange={handleStatusChange}>
                <option>On Hold</option>
                <option>Processing</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>

              <div className="form-actions">
                <button type="submit" className="update">Update</button>
                <button type="button" className="close" onClick={() => setShowForm(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>
        {`
        /* 📌 General Styles */
.container {
  width: 90%;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

        /* 📌 Navigation Tabs */
.nav-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tab {
  background: #f6b88f;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 5px;
  font-weight: bold;
  color: black;
  transition: background 0.3s ease, color 0.3s ease;
}

.tab.active {
  background: #ff914d;
  color: white;
}

.tab:hover {
  background: #ff914d;
  color: white;
}

/* 📌 Order Table */
.order-table {
  width: 100%;
  border-collapse: collapse;
}

.order-table th, .order-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.status {
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
}

.status.on-hold {
  background: #ffcc00;
  color: #996600;
}

.status.processing {
  background: #17a2b8;
  color: white;
}

.status.completed {
  background: #28a745;
  color: white;
}

.status.cancelled {
  background: #dc3545;
  color: white;
}

/* 📌 Form Popup */
.form-popup {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  width: 300px;
}

.form-container label {
  display: block;
  margin-top: 10px;
}

.form-container input, .form-container select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.form-actions .update {
  background: #ff914d;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}

.form-actions .close {
  background: #dc3545;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}
        `}
      </style>
    </div>
  );
};

export default HoldSale;
