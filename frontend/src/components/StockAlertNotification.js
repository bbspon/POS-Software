import React, { useState, useEffect } from "react";

const StockAlertNotification = () => {
  const [stockNotifications, setStockNotifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newNotification, setNewNotification] = useState({
    product: "",
    status: "Low Stock",
    quantity: "",
    discount: "",
    amount: "",
  });

  useEffect(() => {
    const fetchStockNotifications = async () => {
      const data = [
        { id: 1, product: "Gold Ring", status: "Low Stock", quantity: 5, discount: "5%", amount: "$500" },
        { id: 2, product: "Silver Necklace", status: "Out of Stock", quantity: 0, discount: "10%", amount: "$1200" },
        { id: 3, product: "Diamond Earrings", status: "Restocked", quantity: 20, discount: "2%", amount: "$2500" },
      ];
      setStockNotifications(data);
    };

    fetchStockNotifications();
  }, []);

  const handleAddNotification = () => {
    if (Object.values(newNotification).some((val) => val === "")) {
      alert("Please fill in all fields");
      return;
    }
    setStockNotifications([...stockNotifications, { id: stockNotifications.length + 1, ...newNotification }]);
    setNewNotification({ product: "", status: "Low Stock", quantity: "", discount: "", amount: "" });
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    setNewNotification({ ...newNotification, [e.target.name]: e.target.value });
  };

  const handleRestock = (id) => {
    setStockNotifications(stockNotifications.map((item) =>
      item.id === id ? { ...item, status: "Restocked", quantity: Number(item.quantity) + 10 } : item
    ));
  };

  return (
    <div className="container">
      <h1>Stock Alert Notifications</h1>

      {/* Notification List */}
      <div className="notifications">
        {stockNotifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <p><strong>Product:</strong> {notification.product}</p>
            <p><strong>Status:</strong> {notification.status}</p>
            <p><strong>Quantity:</strong> {notification.quantity}</p>
            <p><strong>Discount:</strong> {notification.discount}</p>
            <p><strong>Amount:</strong> {notification.amount}</p>
            <button className="button restock-button" onClick={() => handleRestock(notification.id)}>Restock</button>
          </div>
        ))}
      </div>

      {/* Add Notification Button */}
      <button className="button add-button" onClick={() => setShowForm(true)}>Add Notification</button>

      {/* Add Notification Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Notification</h2>
            <input type="text" name="product" placeholder="Product Name" value={newNotification.product} onChange={handleInputChange} />
            <select name="status" value={newNotification.status} onChange={handleInputChange}>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Restocked">Restocked</option>
            </select>
            <input type="number" name="quantity" placeholder="Quantity" value={newNotification.quantity} onChange={handleInputChange} />
            <input type="text" name="discount" placeholder="Discount (%)" value={newNotification.discount} onChange={handleInputChange} />
            <input type="text" name="amount" placeholder="Amount ($)" value={newNotification.amount} onChange={handleInputChange} />
            <div className="modal-actions">
              <button className="button save-button" onClick={handleAddNotification}>Save</button>
              <button className="button cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <style>
        {`.container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.notifications {
  margin-top: 20px;
}

.notification-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.button {
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.add-button {
  background-color: #28a745;
}

.restock-button {
  background-color: #007bff;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.save-button {
  background-color: #007bff;
}

.cancel-button {
  background-color: #dc3545;
}

input, select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}
`}
      </style>
    </div>
  );
};

export default StockAlertNotification;
