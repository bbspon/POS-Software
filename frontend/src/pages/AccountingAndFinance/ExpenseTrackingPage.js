import React, { useEffect, useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseTrackingPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
    status: "Pending",
    responsible: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [token] = useState(localStorage.getItem("token") || "");

  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/expenses`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${apiUrl}/${editingId}` : apiUrl;

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      setFormData({
        date: "",
        category: "",
        description: "",
        amount: "",
        status: "Pending",
        responsible: "",
      });
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (exp) => {
    setFormData({
      ...exp,
      date: exp.date.slice(0, 10), // ensure date input format
    });
    setEditingId(exp._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this expense?")) return;
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Chart: summarize expenses by category
  const categories = [
    "Marketing",
    "Utilities",
    "Travel",
    "Office Supplies",
    "Others",
  ];
  const chartData = useMemo(() => {
    const totals = categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {});
    expenses.forEach((e) => {
      if (totals[e.category] !== undefined)
        totals[e.category] += parseFloat(e.amount || 0);
    });

    return {
      labels: categories,
      datasets: [
        {
          label: "Expenses by Category ($)",
          data: categories.map((c) => totals[c]),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
          borderRadius: 4,
        },
      ],
    };
  }, [expenses]);

  return (
    <div className="container mt-5">
      <h2>Expense Tracking</h2>

      {/* Chart */}
      <div style={{ maxWidth: 700, margin: "0 auto 40px" }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Expense Analytics" },
            },
            scales: { y: { beginAtZero: true } },
          }}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4 row g-3">
        <div className="col-md-2">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-2">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Description"
          />
        </div>
        <div className="col-md-1">
          <input
            type="number"
            step="0.01"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-1">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-control"
          >
            <option>Pending</option>
            <option>Paid</option>
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="responsible"
            value={formData.responsible}
            onChange={handleChange}
            className="form-control"
            placeholder="Responsible"
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            {editingId ? "Update" : "Add"}
          </button>
        </div>
      </form>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Responsible</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td>{new Date(exp.date).toLocaleDateString()}</td>
              <td>{exp.category}</td>
              <td>{exp.description}</td>
              <td>₹{parseFloat(exp.amount).toFixed(2)}</td>
              <td>{exp.status}</td>
              <td>{exp.responsible}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(exp)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(exp._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTrackingPage;
