import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Header() {
  const [outOfStockCount, setOutOfStockCount] = useState(0);

  // Fetch low stock count
  useEffect(() => {
    fetch("/api/low-stock-products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch low stock count");
        }
        return response.json();
      })
      .then((data) => {
        setOutOfStockCount(data.length); // Set count based on API response
      })
      .catch((error) => {
        console.error("Error fetching low stock count:", error);
      });
  }, []);

  return (
    <header className="header text-white p-4">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo/Brand Name */}
        <h1 className="h4 mb-0">BBSCART POS Software</h1>

        {/* Right Side: Welcome User, Notification Bell, User Profile Icon, and Login Dropdown */}
        <div className="d-flex align-items-center">
          {/* Welcome Message */}
          <span className="user-profile me-3">Welcome, User!</span>

          {/* Notification Bell */}
          <div className="notification-container me-3 position-relative">
            <a href="/stockalertnotify" className="bell-link">
              <i className="bi bi-bell bell-icon"></i>
              {outOfStockCount > 0 && (
                <span className="notification-badge">{outOfStockCount}</span>
              )}
            </a>
          </div>

          {/* User Profile Icon */}
          <a href="/UserProfile" className="profile-icon-container me-3">
            <i className="bi bi-person profile-icon"></i>
          </a>

          {/* Login Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Login
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="/login">
                  Sign In
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/logout">
                  Logout
                </a>
              </li>
            </ul>
          </div>

          {/* Settings Icon */}
           <a href="/SettingsPage " className="settings-icon-container me-3">
             <i className="bi bi-gear settings-icon"></i>
          </a>

        </div>
      </div>

      {/* Inline Styles */}
      <style>
        {`
          .header {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            background-color: #e24864;
          }
          .notification-container {
            position: relative;
            cursor: pointer;
            font-size: 18px;
          }
          .bell-link {
            text-decoration: none;
            color: white;
          }
          .bell-icon {
            font-size: 24px;
            color: white;
          }
          .notification-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: red;
            color: white;
            font-size: 12px;
            font-weight: bold;
            border-radius: 50%;
            padding: 4px 6px;
          }
          .user-profile {
            font-weight: bold;
            margin-right: 16px;
            color: white;
          }
          .profile-icon-container {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            text-decoration: none;
            color: white;
          }
          .profile-icon {
            font-size: 24px;
            color: white;
          }
          .profile-icon-container:hover {
            color: lightgray;
          }
            /* Add this CSS to your styles */
.dropdown {
  position: relative;
}

.dropdown-menu {
  display: none; /* Initially hide the dropdown */
  position: absolute;
  top: 100%; /* Position the dropdown below the button */
  left: 0;
  min-width: 160px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 4px;
  z-index: 1000;
}

.dropdown:hover .dropdown-menu {
  display: block; /* Show the dropdown when hovering over the parent */
}

.dropdown-item {
  padding: 8px 12px;
  color: #333;
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #f8f9fa;
}

.btn-light {
  background-color: #f8f9fa;
  color:rgb(20, 21, 22);
  border: 1px solid  #f8f9fa;
  padding: 8px 16px;
}

.btn-light:hover {
  background-color:rgb(49, 52, 54);
  color: white;
}

  // Settings Icon
  .settings-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  text-decoration: none;
  color: white;
}
.settings-icon {
  font-size: 24px;
  color: white;
  margin-left: 16px;
}
.settings-icon-container:hover {
  color: lightgray;
}


        `}
      </style>
    </header>
  );
}

export default Header;
