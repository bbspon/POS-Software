import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountsPayablePage = () => {
  const [payables, setPayables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newPayable, setNewPayable] = useState({
    vendor: "",
    invoiceNumber: "",
    dueDate: "",
    amount: "",
    status: "Pending",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const token = ""; // Replace with real token if needed

  const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/payables`;
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchPayables();
  }, []);

  const fetchPayables = async () => {
    try {
      const res = await axios.get(API_BASE, authHeader);
      setPayables(res.data);
    } catch (err) {
      console.error("Error fetching payables:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayable({ ...newPayable, [name]: value });
  };

  const handleAddPayable = async () => {
    try {
      await axios.post(API_BASE, newPayable, authHeader);
      fetchPayables();
      setNewPayable({
        vendor: "",
        invoiceNumber: "",
        dueDate: "",
        amount: "",
        status: "Pending",
      });
      setIsModalOpen(false);
      alert("Payable added successfully!");
    } catch (err) {
      console.error("Error adding payable:", err);
    }
  };

  const handleDeletePayable = async (id) => {
    if (window.confirm("Are you sure you want to delete this payable?")) {
      try {
        await axios.delete(`${API_BASE}/${id}`, authHeader);
        fetchPayables();
        alert("Payable deleted successfully!");
      } catch (err) {
        console.error("Error deleting payable:", err);
      }
    }
  };

  const filteredPayables = payables.filter(
    (payable) =>
      payable.vendor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payable.invoiceNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="accounts-payable-page">
      <h1 className="page-title">Accounts Payable</h1>
      <input
        type="text"
        placeholder="Search by vendor or invoice number..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <table className="payable-table">
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Invoice Number</th>
            <th>Due Date</th>
            <th>Amount ($)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayables.map((payable) => (
            <tr key={payable._id} className={payable.status?.toLowerCase()}>
              <td>{payable.vendor}</td>
              <td>{payable.invoiceNumber}</td>
              <td>{payable.dueDate?.substring(0, 10)}</td>
              <td>${Number(payable.amount).toLocaleString()}</td>
              <td>{payable.status?.toUpperCase()}</td>
              <td>
                <button
                  onClick={() => handleDeletePayable(payable._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setIsModalOpen(true)}
        className="add-payable-button"
      >
        Add New Payable
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Payable</h2>
            <label>Vendor</label>
            <input
              type="text"
              name="vendor"
              value={newPayable.vendor}
              onChange={handleInputChange}
              required
            />
            <label>Invoice Number</label>
            <input
              type="text"
              name="invoiceNumber"
              value={newPayable.invoiceNumber}
              onChange={handleInputChange}
              required
            />
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={newPayable.dueDate}
              onChange={handleInputChange}
              required
            />
            <label>Amount ($)</label>
            <input
              type="number"
              name="amount"
              value={newPayable.amount}
              onChange={handleInputChange}
              required
            />
            <label>Status</label>
            <select
              name="status"
              value={newPayable.status}
              onChange={handleInputChange}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="modal-buttons">
              <button onClick={handleAddPayable} className="save-button">
                Save Payable
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline Styles */}
      <style>{`
        .accounts-payable-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .page-title {
          margin-bottom: 15px;
        }

        .search-bar {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .payable-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        .payable-table th, .payable-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ccc;
        }

        .payable-table tr:hover {
          background-color: #f1f1f1;
        }

        .pending {
          background-color: #fffacc;
        }

        .overdue {
          background-color: #ffd6d6;
        }

        .paid {
          background-color: #d9f9d9;
        }

        .add-payable-button {
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }

        .delete-button {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          cursor: pointer;
        }

        .modal {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          width: 400px;
        }

        .modal-content input,
        .modal-content select {
          width: 100%;
          margin: 10px 0;
          padding: 8px;
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
        }

        .cancel-button {
          background-color: #6c757d;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default AccountsPayablePage;
