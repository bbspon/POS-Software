import React from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const SalesDashboard = () => {
  const navigate = useNavigate(); // Initialize navigation

  // Reports List
  const reports = [
    { id: 1, name: "Bank Statement", path: "/bank-statement" },
    { id: 2, name: "Sales Profit", path: "/sales-profit" },
    { id: 3, name: "Creditors", path: "/creditors" },
    { id: 4, name: "Sales Items", path: "/sales-items" },
    { id: 5, name: "Ledger", path: "/ledger" },
    { id: 6, name: "Bill R Ledger", path: "/bill-r-ledger" },
    { id: 7, name: "I.R Ledger", path: "/ir-ledger" },
    { id: 8, name: "Sales Book", path: "/sales-book" },
    { id: 9, name: "Supervisors Overdue", path: "/supervisors-overdue" },
    { id: 10, name: "Customer Overdue", path: "/customer-overdue" },
    { id: 11, name: "Low Selling", path: "/low-selling" },
    { id: 12, name: "Best Selling", path: "/best-selling" },
    { id: 13, name: "Customer W. Sales", path: "/customer-sales" },
    { id: 14, name: "Purchase Book", path: "/purchase-book" },
    { id: 15, name: "Product Book", path: "/product-book" },
    { id: 16, name: "Balance Sheet", path: "/balance-sheet" },
  ];

  // Handle report navigation
  const handleReportClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-layout">
      {/* Main Content */}
      <div className="dashboard-main">
        <h1 className="sales-title">Sales Dashboard</h1>

        {/* Top Statistics */}
        <div className="statistics-grid">
          {[
            { label: "Sales", value: 0 },
            { label: "No. of Reorders", value: 0 },
            { label: "No. of Sale Bills", value: 0 },
            { label: "No. of Purchases", value: 0 },
            { label: "Customer Payments", value: "₹0" },
            { label: "Supplier Payments", value: "₹80,000.00" },
            { label: "Total Stock Value", value: "₹402,482.37" },
            { label: "Customer Overdues", value: "₹320,415.43" },
          ].map((stat, idx) => (
            <div key={idx} className="stat-card">
              <h2 className="stat-label">{stat.label}</h2>
              <p className="stat-value">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Graphs */}
        <div className="graphs-grid">
          <div className="graph-card">
            <h3 className="graph-title">Day vs Sales</h3>
            <Line
              data={{
                labels: ["1/2/2022", "1/9/2022", "1/16/2022"],
                datasets: [
                  {
                    label: "Sales",
                    data: [300000, 200000, 100000],
                    borderColor: "red",
                    fill: false,
                  },
                  {
                    label: "Orders",
                    data: [280000, 190000, 90000],
                    borderColor: "green",
                    fill: false,
                  },
                ],
              }}
            />
          </div>

          <div className="graph-card">
            <h3 className="graph-title">Top Items</h3>
            <Bar
              data={{
                labels: ["Item A", "Item B", "Item C", "Item D"],
                datasets: [
                  {
                    label: "Count",
                    data: [10, 20, 5, 15],
                    backgroundColor: "blue",
                  },
                ],
              }}
            />
          </div>
        </div>

        {/* Category vs Sales and Brand vs Sales */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3 className="chart-title">Category vs Sales</h3>
            <Pie
              data={{
                labels: ["Category A", "Category B", "Category C"],
                datasets: [
                  {
                    data: [40, 35, 25],
                    backgroundColor: ["purple", "orange", "blue"],
                  },
                ],
              }}
            />
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Brand vs Sales</h3>
            <Pie
              data={{
                labels: ["Brand A", "Brand B", "Brand C"],
                datasets: [
                  {
                    data: [40, 35, 25],
                    backgroundColor: ["purple", "orange", "blue"],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar for Reports */}
      <div className="reports-sidebar">
        <h2 className="reports-title">Reports</h2>
        <ul className="reports-list">
          {reports.map((report) => (
            <li
              key={report.id}
              className="report-card"
              onClick={() => handleReportClick(report.path)}
            >
              {report.name}
            </li>
          ))}
        </ul>
      </div>

      <style>
        {`
       /* Layout for dashboard */
.dashboard-layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* Main content */
.dashboard-main {
  flex: 1;
}

/* Header */
.sales-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e40af;
  text-align: center;
  margin-bottom: 32px;
}

/* Top statistics grid */
.statistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.stat-card {
  background: linear-gradient(135deg, #93c5fd, #3b82f6);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

/* Sidebar */
.reports-sidebar {
  width: 280px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
  height: fit-content;
}

.reports-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
}

/* Report Cards */
.reports-list {
  list-style: none;
  padding: 0;
}

.report-card {
  background: linear-gradient(135deg, #bfdbfe, #60a5fa);
  color: white;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
}

.report-card:hover {
  background: linear-gradient(135deg, #93c5fd, #2563eb);
}
 /* General styles for charts */
.graph-card, .chart-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

/* Resize Pie Chart */
.chart-card canvas {
  width: 250px !important; /* Set width */
  height: 250px !important; /* Set height */
  max-width: 100%;
  max-height: 250px;
  display: block;
  margin: 0 auto; /* Center the chart */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .chart-card canvas {
    width: 200px !important;
    height: 200px !important; /* Reduce size for smaller screens */
  }
}


`}
      </style>
    </div>
  );
};

export default SalesDashboard;
