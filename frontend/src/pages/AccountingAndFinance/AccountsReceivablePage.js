import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountsReceivablePage = () => {
  const [receivables, setReceivables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReceivable, setNewReceivable] = useState({
    customer: "",
    invoiceNumber: "",
    dueDate: "",
    amount: "",
    status: "Pending",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const token = ""; // Add your JWT token here
  const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/receivables`;

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    fetchReceivables();
  }, []);

  const fetchReceivables = async () => {
    try {
      const res = await axios.get(API_BASE, authHeader);
      setReceivables(res.data);
    } catch (err) {
      console.error("Error fetching receivables:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReceivable({ ...newReceivable, [name]: value });
  };

  const handleAddReceivable = async () => {
    try {
      await axios.post(API_BASE, newReceivable, authHeader);
      fetchReceivables();
      setNewReceivable({
        customer: "",
        invoiceNumber: "",
        dueDate: "",
        amount: "",
        status: "Pending",
      });
      setIsModalOpen(false);
      alert("Receivable added successfully!");
    } catch (err) {
      console.error("Error adding receivable:", err);
    }
  };

  const handleDeleteReceivable = async (id) => {
    if (window.confirm("Are you sure you want to delete this receivable?")) {
      try {
        await axios.delete(`${API_BASE}/${id}`, authHeader);
        fetchReceivables();
        alert("Receivable deleted successfully!");
      } catch (err) {
        console.error("Error deleting receivable:", err);
      }
    }
  };

  const filteredReceivables = receivables.filter(
    (r) =>
      r.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.invoiceNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="accounts-receivable-page">
      <h1 className="page-title">Accounts Receivable</h1>

      <input
        type="text"
        placeholder="Search by customer name or invoice number..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <table className="receivable-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Invoice Number</th>
            <th>Due Date</th>
            <th>Amount ($)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReceivables.map((r) => (
            <tr key={r._id} className={r.status?.toLowerCase()}>
              <td>{r.customer}</td>
              <td>{r.invoiceNumber}</td>
              <td>{r.dueDate?.substring(0, 10)}</td>
              <td>${Number(r.amount).toLocaleString()}</td>
              <td>{r.status?.toUpperCase()}</td>
              <td>
                <button
                  onClick={() => handleDeleteReceivable(r._id)}
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
        className="add-receivable-button"
      >
        Add New Receivable
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Receivable</h2>
            <label>Customer</label>
            <input
              type="text"
              name="customer"
              value={newReceivable.customer}
              onChange={handleInputChange}
              required
            />
            <label>Invoice Number</label>
            <input
              type="text"
              name="invoiceNumber"
              value={newReceivable.invoiceNumber}
              onChange={handleInputChange}
              required
            />
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={newReceivable.dueDate}
              onChange={handleInputChange}
              required
            />
            <label>Amount ($)</label>
            <input
              type="number"
              name="amount"
              value={newReceivable.amount}
              onChange={handleInputChange}
              required
            />
            <label>Status</label>
            <select
              name="status"
              value={newReceivable.status}
              onChange={handleInputChange}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
              <option value="Partial">Partial</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="modal-buttons">
              <button onClick={handleAddReceivable} className="save-button">
                Save Receivable
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

      {/* STYLES */}
      <style>{`
        .accounts-receivable-page {
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

        .receivable-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        .receivable-table th, .receivable-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ccc;
        }

        .receivable-table tr:hover {
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

        .partial {
          background-color: #ffe0b3;
        }

        .cancelled {
          background-color: #f0f0f0;
          color: #888;
        }

        .add-receivable-button {
          padding: 10px 20px;
          background-color: #007bff;
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
          background-color: #28a745;
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

export default AccountsReceivablePage;
