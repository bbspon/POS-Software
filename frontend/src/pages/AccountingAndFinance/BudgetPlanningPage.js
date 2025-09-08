import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const BudgetPlanningPage = () => {
  const [budgetSummary, setBudgetSummary] = useState({
    plannedBudget: 50000,
    actualExpenses: 42000,
    variance: 8000,
    utilization: "84%",
  });

  const [budgetAllocations, setBudgetAllocations] = useState([
    { category: "Marketing", planned: 15000, actual: 13000 },
    { category: "Operations", planned: 20000, actual: 18000 },
    { category: "Salaries", planned: 10000, actual: 9000 },
    { category: "Supplies", planned: 5000, actual: 2000 },
  ]);

  const [newAllocation, setNewAllocation] = useState({
    category: "",
    planned: "",
    actual: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const chartData = {
    labels: budgetAllocations.map((a) => a.category),
    datasets: [
      {
        label: "Planned Budget ($)",
        data: budgetAllocations.map((a) => a.planned),
        backgroundColor: "#4CAF50",
      },
      {
        label: "Actual Expenses ($)",
        data: budgetAllocations.map((a) => a.actual),
        backgroundColor: "#FF6384",
      },
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAllocation({ ...newAllocation, [name]: value });
  };

  const handleAddAllocation = () => {
    setBudgetAllocations([
      ...budgetAllocations,
      {
        ...newAllocation,
        planned: parseFloat(newAllocation.planned),
        actual: parseFloat(newAllocation.actual),
      },
    ]);
    setNewAllocation({ category: "", planned: "", actual: "" });
    setIsModalOpen(false);
    alert("New budget allocation added successfully!");
  };

  return (
    <div className="budget-planning-page">
      <h1 className="page-title">Budget Planning</h1>

      {/* Summary Cards */}
      <div className="overview-section">
        <div className="card planned">
          Planned: ${budgetSummary.plannedBudget}
        </div>
        <div className="card actual">
          Spent: ${budgetSummary.actualExpenses}
        </div>
        <div className="card variance">Variance: ${budgetSummary.variance}</div>
        <div className="card utilization">
          Utilization: {budgetSummary.utilization}
        </div>
      </div>

      {/* Chart */}
      <div className="chart-section">
        <h3>Budget vs Actual</h3>
        <Bar data={chartData} options={{ responsive: true }} />
      </div>

      {/* Table */}
      <table className="budget-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Planned Budget ($)</th>
            <th>Actual Expenses ($)</th>
            <th>Variance ($)</th>
          </tr>
        </thead>
        <tbody>
          {budgetAllocations.map((a, i) => (
            <tr key={i}>
              <td>{a.category}</td>
              <td>${a.planned.toLocaleString()}</td>
              <td>${a.actual.toLocaleString()}</td>
              <td>${(a.planned - a.actual).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => setIsModalOpen(true)} className="add-btn">
        Add New Allocation
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Budget Allocation</h2>
            <input
              type="text"
              name="category"
              value={newAllocation.category}
              onChange={handleInputChange}
              placeholder="Category"
              required
            />
            <input
              type="number"
              name="planned"
              value={newAllocation.planned}
              onChange={handleInputChange}
              placeholder="Planned Budget ($)"
              required
            />
            <input
              type="number"
              name="actual"
              value={newAllocation.actual}
              onChange={handleInputChange}
              placeholder="Actual Expenses ($)"
              required
            />
            <div className="modal-actions">
              <button onClick={handleAddAllocation} className="save-btn">
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .budget-planning-page {
          max-width: 1200px;
          margin: auto;
          padding: 20px;
        }

        .page-title {
          margin-bottom: 20px;
        }

        .overview-section {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .card {
          flex: 1;
          padding: 15px;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          text-align: center;
        }

        .planned { background-color: #4caf50; }
        .actual { background-color: #f44336; }
        .variance { background-color: #ff9800; }
        .utilization { background-color: #2196f3; }

        .chart-section {
          margin-bottom: 30px;
        }

        .budget-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        .budget-table th,
        .budget-table td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }

        .budget-table tr:hover {
          background-color: #f9f9f9;
        }

        .add-btn {
          background-color: #007bff;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
        }

        /* Modal */
        .modal {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          background: white;
          padding: 25px;
          border-radius: 10px;
          width: 400px;
          display: flex;
          flex-direction: column;
        }

        .modal-content input {
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .modal-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        .save-btn {
          background-color: #28a745;
          padding: 10px 15px;
          color: white;
          border: none;
          border-radius: 5px;
        }

        .cancel-btn {
          background-color: #6c757d;
          padding: 10px 15px;
          color: white;
          border: none;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default BudgetPlanningPage;
