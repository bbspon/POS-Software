import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import StaffList from "../SalesManagement/StaffList";
import Reports from "../../components/ReportChart";
import Notifications from "../../components/StockAlertNotification";
import Settings from "../SettingsAndConfiguration/SettingsPage";

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate(); // ✅ Define navigate

  return (
    <div className="vendor-dashboard">
      <div className="sidebar">
      <h2>Vendor Dashboard</h2>
        <ul>
          <li>
            <button className="btn" onClick={() => navigate("/VendorDashboardOverview")}>
              Dashboard Overview
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => navigate("/StaffForm")}>
              Staff Management
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => navigate("/reports")}>
              Reports & Analytics
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => navigate("/notifications")}>
              Notifications
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => navigate("/settings")}>
              Settings
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => navigate("/supply-management")}>
              Supply Management
            </button>
          </li>
        </ul>
      </div>
      <div className="content">
        {activeTab === "dashboard" && (
          <div className="card">
            <div className="card-content">
              <h3>Dashboard Overview</h3>
              <p>Stats on sales, commissions, and staff performance.</p>
            </div>
          </div>
        )}
        {activeTab === "staff-management" && <StaffList />}
        {activeTab === "reports" && <Reports />}
        {activeTab === "notifications" && <Notifications />}
        {activeTab === "settings" && <Settings />}
      </div>
      <style>
        {`
       .vendor-dashboard {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 20px;
}

.sidebar h2 {
  margin-bottom: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  padding: 10px;
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  text-align: left;
}

.btn:hover {
  background: #2980b9;
}

.content {
  flex: 1;
  padding: 20px;
}
  /* Responsive Design */
@media screen and (max-width: 768px) {
  .vendor-dashboard {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    padding: 10px;
  }

  .content {
    padding: 10px;
  }

  .btn {
    padding: 12px;
  }
}

`}
      </style>
    </div>
  );
};

export default VendorDashboard;
