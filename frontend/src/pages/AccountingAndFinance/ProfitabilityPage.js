import React, { useEffect, useState } from "react";
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

const ProfitabilityPage = () => {
  const [profitBreakdown, setProfitBreakdown] = useState([]);
  const [newEntry, setNewEntry] = useState({
    category: "",
    revenue: "",
    expenses: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/profitability`;
  const token = localStorage.getItem("token");

  const fetchEntries = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProfitBreakdown(data);
    } catch (err) {
      console.error("Failed to fetch entries", err);
    }
  };

  const handleAddEntry = async () => {
    const { category, revenue, expenses } = newEntry;
    if (!category || !revenue || !expenses) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category,
          revenue: parseFloat(revenue),
          expenses: parseFloat(expenses),
        }),
      });
      const data = await res.json();
      setProfitBreakdown([...profitBreakdown, data]);
      setNewEntry({ category: "", revenue: "", expenses: "" });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to add entry", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfitBreakdown(profitBreakdown.filter((entry) => entry._id !== id));
    } catch (err) {
      console.error("Failed to delete entry", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Overview Calculations
  const totalRevenue = profitBreakdown.reduce((sum, e) => sum + e.revenue, 0);
  const totalExpenses = profitBreakdown.reduce((sum, e) => sum + e.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue
    ? ((totalProfit / totalRevenue) * 100).toFixed(2) + "%"
    : "0%";

  const chartData = {
    labels: profitBreakdown.map((e) => e.category),
    datasets: [
      {
        label: "Revenue ($)",
        data: profitBreakdown.map((e) => e.revenue),
        backgroundColor: "#007bff",
      },
      {
        label: "Expenses ($)",
        data: profitBreakdown.map((e) => e.expenses),
        backgroundColor: "#ff6384",
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Profitability Overview</h2>

      {/* Overview Cards */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        <div className="card p-3 flex-fill text-center bg-light shadow-sm">
          Total Revenue: ${totalRevenue.toLocaleString()}
        </div>
        <div className="card p-3 flex-fill text-center bg-light shadow-sm">
          Total Expenses: ${totalExpenses.toLocaleString()}
        </div>
        <div className="card p-3 flex-fill text-center bg-light shadow-sm">
          Net Profit: ${totalProfit.toLocaleString()}
        </div>
        <div className="card p-3 flex-fill text-center bg-light shadow-sm">
          Profit Margin: {profitMargin}
        </div>
      </div>

      {/* Chart */}
      <div className="mb-5" style={{ maxWidth: 800, margin: "0 auto" }}>
        <h4 className="text-center">Revenue vs. Expenses</h4>
        <Bar data={chartData} options={{ responsive: true }} />
      </div>

      {/* Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Category</th>
            <th>Revenue ($)</th>
            <th>Expenses ($)</th>
            <th>Profit ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profitBreakdown.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.category}</td>
              <td>${entry.revenue.toLocaleString()}</td>
              <td>${entry.expenses.toLocaleString()}</td>
              <td>${(entry.revenue - entry.expenses).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(entry._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Entry Button */}
      <button
        className="btn btn-primary mt-3"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Entry
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Profitability Entry</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="category"
                  className="form-control mb-2"
                  placeholder="Category"
                  value={newEntry.category}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, category: e.target.value })
                  }
                />
                <input
                  type="number"
                  name="revenue"
                  className="form-control mb-2"
                  placeholder="Revenue"
                  value={newEntry.revenue}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, revenue: e.target.value })
                  }
                />
                <input
                  type="number"
                  name="expenses"
                  className="form-control mb-2"
                  placeholder="Expenses"
                  value={newEntry.expenses}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, expenses: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleAddEntry}>
                  Submit
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfitabilityPage;
