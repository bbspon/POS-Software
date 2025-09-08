import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DashboardOverview = () => {
  const [customerCount, setCustomerCount] = useState(120);
  const [salesAmount, setSalesAmount] = useState(45000);
  const [productCount, setProductCount] = useState(300);
  const [staffCount, setStaffCount] = useState(10);
  
  const navigate = useNavigate(); // Initialize navigate

  // Fetch data when the component mounts
  useEffect(() => {
    setTimeout(() => {
      setCustomerCount(150);
      setSalesAmount(53000);
      setProductCount(350);
      setStaffCount(12);
    }, 1000);
  }, []);

  return (
    <div className="dashboard-overview">
     

      {/* Right-side header navigation buttons */}
      <div className="header-nav">
        <button className="btn" onClick={() => navigate("/VendorCustomerPage")}>Customer</button>
        <button className="btn" onClick={() => navigate("/VendorSalesPage")}>Sales</button>
        <button className="btn" onClick={() => navigate("/VendorProductPage")}>Product</button>
        <button className="btn" onClick={() => navigate("/VendorStaffPage")}>Staff</button>
      </div>
      <h2>Dashboard Overview</h2>
      <div className="cards-container">
        <div className="card">
          <h3>Customers</h3>
          <p>{customerCount}</p>
        </div>
        <div className="card">
          <h3>Sales</h3>
          <p>${salesAmount.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Products</h3>
          <p>{productCount}</p>
        </div>
        <div className="card">
          <h3>Staff</h3>
          <p>{staffCount}</p>
        </div>
      </div>

      <style>
        {`
          .dashboard-overview {
            padding: 20px;
            background-color: #f4f6f9;
            display: flex;
            flex-direction: column;
          }

          .dashboard-overview h2 {
            text-align: center;
            margin-bottom: 30px;
            color: #333;
          }

          /* Header Navigation */
          .header-nav {
            display: flex;
            justify-content: flex-start;
            gap: 15px;
            margin-bottom: 20px;
            font-family:bold;
          }

          .btn {
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            width: 150px;
            text-align: center;
          }

          .btn:hover {
            background-color: #2980b9;
          }

          .cards-container {
            display: flex;
            justify-content: space-around;
            gap: 20px;
            flex-wrap: wrap;
          }

          .card {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 200px;
            text-align: center;
            transition: transform 0.3s ease-in-out;
          }

          .card h3 {
            font-size: 1.2em;
            color: #3498db;
          }

          .card p {
            font-size: 2em;
            color: #333;
            margin-top: 10px;
          }

          .card:hover {
            transform: translateY(-10px);
          }

          /* Responsive Design */
          @media screen and (max-width: 768px) {
            .dashboard-overview {
              flex-direction: column;
            }

            .header-nav {
              justify-content: space-between;
              width: 100%;
            }

            .cards-container {
              flex-direction: column;
              align-items: center;
            }

            .card {
              width: 90%;
              margin-bottom: 20px;
            }

            .btn {
              width: 100%;
              padding: 12px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DashboardOverview;
