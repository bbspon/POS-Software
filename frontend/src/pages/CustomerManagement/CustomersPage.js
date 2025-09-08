import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    membership: "Gold Member",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/customers`);
      setCustomers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const openModal = (customer = null) => {
    setEditingCustomer(customer);
    setFormData(
      customer || {
        customerName: "",
        email: "",
        phone: "",
        membership: "Gold Member",
      }
    );
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCustomer) {
        await axios.put(
          `${API_URL}/api/customers/${editingCustomer._id}`,
          formData
        );
      } else {
        await axios.post(`${API_URL}/api/customers`, formData);
      }
      setIsModalOpen(false);
      fetchCustomers();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`${API_URL}/api/customers/${id}`);
        fetchCustomers();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="customers-container">
      <h2>Customer Management</h2>
      <button className="add-btn" onClick={() => openModal()}>
        Add New Customer
      </button>

      <table className="customers-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Membership Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust._id}>
              <td>{cust.customerName}</td>
              <td>{cust.email}</td>
              <td>{cust.phone}</td>
              <td
                className={`membership ${cust.membership
                  ?.toLowerCase()
                  .replace(" ", "-")}`}
              >
                {cust.membership}
              </td>
              <td>
                <button className="edit-btn" onClick={() => openModal(cust)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(cust._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingCustomer ? "Edit Customer" : "Add New Customer"}</h3>
            <input
              type="text"
              placeholder="Name"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <select
              value={formData.membership}
              onChange={(e) =>
                setFormData({ ...formData, membership: e.target.value })
              }
            >
              <option value="Gold Member">Gold Member</option>
              <option value="Silver Member">Silver Member</option>
              <option value="Platinum Member">Platinum Member</option>
            </select>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSubmit}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
        .customers-container {
          width: 90%;
          max-width: 1200px;
          margin: 20px auto;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }

        .customers-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .customers-table th, .customers-table td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .customers-table th {
          background-color: #f1f1f1;
          font-weight: bold;
        }

        .membership {
          font-weight: bold;
          padding: 5px 10px;
          border-radius: 5px;
          text-align: center;
        }

        .membership.gold-member {
          background-color: gold;
          color: #333;
        }

        .membership.silver-member {
          background-color: silver;
          color: #333;
        }

        .membership.platinum-member {
          background-color: #007bff;
          color: white;
        }

        .edit-btn, .delete-btn, .save-btn, .cancel-btn, .add-btn {
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          margin-right: 5px;
        }

        .edit-btn {
          background-color: #ffc107;
          color: #343a40;
        }

        .delete-btn {
          background-color: #dc3545;
          color: white;
        }

        .save-btn {
          background-color: #28a745;
          color: white;
        }

        .cancel-btn {
          background-color: #6c757d;
          color: white;
        }

        .add-btn {
          background-color: #007bff;
          color: white;
          font-weight: bold;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          text-align: center;
        }

        .modal input, .modal select {
          width: 100%;
          margin-bottom: 10px;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .modal-actions {
          display: flex;
          justify-content: space-between;
        }
        `}
      </style>
    </div>
  );
};

export default CustomersPage;
