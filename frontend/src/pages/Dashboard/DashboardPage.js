// Import necessary dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar"; // Import Sidebar
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FaBarcode, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

// Register the chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardPage() {
  // State Management
  const [salesData, setSalesData] = useState({
    today: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
    chart: { labels: [], datasets: [] },
  });

  const [inventoryData, setInventoryData] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [userRole, setUserRole] = useState("Manager"); // Example role-based access
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Fetch Data from API
    axios.get("/api/dashboard/sales")
      .then((res) => setSalesData(res.data))
      .catch((error) => console.error("Error fetching sales data:", error));

    axios.get("/api/dashboard/inventory")
      .then((res) => setInventoryData(res.data))
      .catch((error) => console.error("Error fetching inventory data:", error));

    axios.get("/api/dashboard/top-selling")
      .then((res) => setTopSelling(res.data))
      .catch((error) => console.error("Error fetching top-selling products:", error));

    axios.get("/api/dashboard/notifications")
      .then((res) => setNotifications(res.data))
      .catch((error) => console.error("Error fetching notifications:", error));

    axios.get("/api/dashboard/customers")
      .then((res) => setCustomers(res.data))
      .catch((error) => console.error("Error fetching customer data:", error));

    window.addEventListener("offline", () => setIsOffline(true));
    window.addEventListener("online", () => setIsOffline(false));
  }, []);

  // Data for Bar Chart
  const barChartData = {
    labels: ["Purchase", "Sales", "Customers", "Vendors", "Products"],
    datasets: [
      {
        label: "Statistics",
        data: [17684, 6523, 12, 11, 25],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(54, 162, 235, 0.5)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const navigate = useNavigate(); // Using the useNavigate hook
  
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Purchase & Sales Overview",
      },
    },
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="container-fluid"
        style={{ marginLeft: "10px", padding: "20px" }}
      >
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-primary">Dashboard</h1>
          <div className="d-flex">
            <button
              className="btn btn-success mx-2"
              onClick={() => navigate("/signup")} // Navigate to English page
            >
              SignUp
            </button>
            <button
              className="btn btn-primary mx-2"
              onClick={() => navigate("/UserManagementPage")} // Navigate to POS page
            >
              User Management
            </button>
            <button
              className="btn btn-secondary mx-2"
              onClick={() => navigate("/")} // Navigate to Dashboard page
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-outline-secondary me-2">
            <FaBarcode /> Scan Product
          </button>
          <button className="btn btn-outline-primary me-2">
            <FaUser /> Customer Management
          </button>
          <button className="btn btn-outline-dark me-2">
            <FaCog /> Settings
          </button>
          <button className="btn btn-outline-danger">
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Offline Mode Alert */}
        {isOffline && (
          <div className="alert alert-warning text-center">
            You are offline! Transactions will be synced once the internet is restored.
          </div>
        )}

        {/* Summary Cards */}
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card bg-info text-white text-center">
              <div className="card-body">
                <h5>Total Purchase Due</h5>
                <h3>-17684.50 $</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card bg-warning text-white text-center">
              <div className="card-body">
                <h5>Total Sales Due</h5>
                <h3>-6523.00 $</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card bg-success text-white text-center">
              <div className="card-body">
                <h5>Total Sales Amount</h5>
                <h3>529436.00 $</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card bg-danger text-white text-center">
              <div className="card-body">
                <h5>Total Expense Amount</h5>
                <h3>62500.00 $</h3>
              </div>
            </div>
          </div>
        </div>

       
        {/* Sales Forecast Chart */}
        <div className="chart-container shadow-sm p-3 my-3 rounded">
          <h3>Sales Forecast</h3>
          {salesData.chart.labels.length > 0 ? (
            <Line data={salesData.chart} />
          ) : (
            <p className="text-muted">Loading sales forecast...</p>
          )}
        </div>

        {/* Statistics Section */}
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card bg-pink text-black text-center">
              <div className="card-body">
                <h5>Customers</h5>
                <h3>12</h3>
                <button className="btn btn-light mt-2">View</button>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card bg-purple text-black text-center">
              <div className="card-body">
                <h5>Suppliers</h5>
                <h3>11</h3>
                <button className="btn btn-light mt-2">View</button>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card bg-teal text-black text-center">
              <div className="card-body">
                <h5>Purchase Invoice</h5>
                <h3>3</h3>
                <button className="btn btn-light mt-2">View</button>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card bg-green text-black text-center">
              <div className="card-body">
                <h5>Sales Invoice</h5>
                <h3>11</h3>
                <button className="btn btn-light mt-2">View</button>
              </div>
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="top-products shadow-sm p-3 rounded">
          <h3 className="text-info">Top Selling Products</h3>
          <ul className="list-group">
            {topSelling.length > 0 ? (
              topSelling.map((product) => (
                <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {product.name}
                  <span className="badge bg-primary rounded-pill">{product.sales} Sold</span>
                </li>
              ))
            ) : (
              <p className="text-muted">No top-selling products available</p>
            )}
          </ul>
        </div>

        {/* Inventory Alerts */}
        <div className="inventory-alerts shadow-sm p-3 rounded">
          <h3 className="text-danger">Low Stock Alerts</h3>
          <ul className="list-group">
            {inventoryData.length > 0 ? (
              inventoryData.map((item) => (
                <li key={item.id} className="list-group-item text-danger">
                  {item.name} - {item.stock} Remaining
                </li>
              ))
            ) : (
              <p className="text-muted">No low stock alerts</p>
            )}
          </ul>
        </div>

        {/* Customer Reports & Loyalty Programs */}
        <div className="customer-reports shadow-sm p-3 rounded">
          <h3 className="text-warning">Customer Reports & Loyalty</h3>
          <ul className="list-group">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <li key={customer.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {customer.name} - {customer.loyaltyPoints} Points
                </li>
              ))
            ) : (
              <p className="text-muted">No customer data available</p>
            )}
          </ul>
        </div>

        {/* Charts Section */}
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5>Purchase & Sales Bar Chart</h5>
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5>Recently Added Items</h5>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Sl. No</th>
                      <th>Item Name</th>
                      <th>Item Sales Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Test 1</td>
                      <td>13.20 $</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Test 2</td>
                      <td>14.16 $</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Test 3</td>
                      <td>9.36 $</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="notifications shadow-sm p-3 rounded">
          <h3 className="text-warning">Recent Activities</h3>
          <ul className="list-group">
            {notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <li key={index} className="list-group-item">{notif.message}</li>
              ))
            ) : (
              <p className="text-muted">No new notifications</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
