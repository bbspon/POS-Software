import React, { useState } from "react";

const OfflineOrders = () => {
  const [offlineOrders] = useState([
    { id: "#O1005", date: "Feb 3, 2024", total: "£75.00", channel: "Offline", status: "Completed" },
    { id: "#O1004", date: "Feb 1, 2024", total: "£250.00", channel: "Offline", status: "Completed" },
  ]);

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleStatusClick = (orderId) => {
    setSelectedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  const handlePrintInvoice = (orderId) => {
    alert(`Printing invoice for Order ID: ${orderId}`);
    window.print();
  };

  const handleSendEmail = (orderId) => {
    alert(`Order confirmation email sent for Order ID: ${orderId}`);
  };

  return (
    <div className="container">
      {/* 📌 Navigation Tabs */}
      <div className="nav-tabs">
        <a href="/ReturnsAndRefunds" className="tab">Sale History</a>
        <a href="/HoldSale" className="tab">Hold Sale</a>
        <a href="/OfflineOrders" className="tab active">Offline Sale/Orders</a>
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
            {offlineOrders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.total}</td>
                  <td>{order.channel}</td>
                  <td
                    className={`status ${order.status.toLowerCase().replace(" ", "-")}`}
                    onClick={() => handleStatusClick(order.id)}
                  >
                    {order.status}
                  </td>
                </tr>
                {/* 📌 Show order details inline when clicked */}
                {selectedOrderId === order.id && (
                  <tr className="order-details">
                    <td colSpan="5">
                      <div className="details-container">
                        <p><strong>Order ID:</strong> {order.id}</p>
                        <p><strong>Date:</strong> {order.date}</p>
                        <p><strong>Total:</strong> {order.total}</p>
                        <p><strong>Status:</strong> {order.status}</p>

                        {/* 📌 Action Buttons */}
                        <div className="actions">
                          <button className="print" onClick={() => handlePrintInvoice(order.id)}>Print Invoice</button>
                          <button className="email" onClick={() => handleSendEmail(order.id)}>Send Order Email</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

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
  cursor: pointer;
}

.status.completed {
  background: #28a745;
  color: white;
}

.status.processing {
  background: #17a2b8;
  color: white;
}

.status.on-hold {
  background: #ffc107;
  color: black;
}

.status.cancelled {
  background: #dc3545;
  color: white;
}

/* 📌 Order Details (Inline View) */
.order-details td {
  background: #f8f9fa;
}

.details-container {
  padding: 10px;
  font-size: 14px;
  color: #333;
}

.details-container p {
  margin: 5px 0;
}

/* 📌 Action Buttons */
.actions {
  margin-top: 10px;
}

.actions button {
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  transition: all 0.3s;
  margin-right: 5px;
}

.print {
  background: #ff914d;
  color: white;
}

.email {
  background: #007bff;
  color: white;
}

.actions button:hover {
  opacity: 0.8;
}
        `}
      </style>
    </div>
  );
};

export default OfflineOrders;
