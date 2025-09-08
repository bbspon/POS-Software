// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useNavigate } from "react-router-dom";
// import {
//   faCogs,
//   faStore,
//   faCreditCard,
//   faShoppingCart,
//   faChartBar,
//   faDatabase,
//   faBoxOpen,
//   faUsers,
//   faTools,
//   faFileInvoice,
// } from "@fortawesome/free-solid-svg-icons";

// const settingsOptions = [
//   {
//     name: "Setup",
//     icon: faCogs,
//     subOptions: [
//       { name: "Company Information", path: "/setup/company-info" },
//       { name: "User Roles & Permissions", path: "/setup/user-roles" },
//       { name: "Tax Settings", path: "/setup/tax-settings" },
//       { name: "Currency Settings", path: "/setup/currency-settings" },
//     ],
//   },
//   {
//     name: "Branches",
//     icon: faStore,
//     subOptions: [
//       { name: "Add New Branch", path: "/branches/add" },
//       { name: "Branch Locations", path: "/branches/locations" },
//       { name: "Branch Managers", path: "/branches/managers" },
//     ],
//   },
//   {
//     name: "POS",
//     icon: faCreditCard,
//     subOptions: [
//       { name: "POS Settings", path: "/pos/settings" },
//       { name: "POS Receipt Builder", path: "/pos/receipt-builder" },
//       { name: "POS Registers Setup", path: "/pos/registers" },
//       { name: "POS Integration", path: "/pos/integration" },
//       { name: "POS Vouchers & Store Credit", path: "/pos/vouchers" },
//       { name: "POS Email Templates", path: "/pos/email-templates" },
//     ],
//   },
//   {
//     name: "Legacy B2B",
//     icon: faShoppingCart,
//     subOptions: [
//       { name: "Customer Accounts", path: "/b2b/customer-accounts" },
//       { name: "B2B Orders", path: "/b2b/orders" },
//       { name: "Wholesale Pricing", path: "/b2b/wholesale-pricing" },
//     ],
//   },
//   {
//     name: "Integrations & API",
//     icon: faChartBar,
//     subOptions: [
//       { name: "Third-Party Apps", path: "/integrations/third-party-apps" },
//       { name: "API Keys & Webhooks", path: "/integrations/api-keys" },
//       { name: "Payment Gateway Setup", path: "/integrations/payment-gateway" },
//     ],
//   },
//   {
//     name: "Custom Settings",
//     icon: faDatabase,
//     subOptions: [
//       { name: "Custom Fields", path: "/custom-settings/fields" },
//       { name: "Data Backup & Restore", path: "/custom-settings/backup" },
//       { name: "Advanced System Logs", path: "/custom-settings/logs" },
//     ],
//   },
//   {
//     name: "CRM",
//     icon: faUsers,
//     subOptions: [
//       { name: "Customer Management", path: "/crm/customers" },
//       { name: "Loyalty Programs", path: "/crm/loyalty-programs" },
//       { name: "Email Marketing", path: "/crm/email-marketing" },
//     ],
//   },
//   {
//     name: "Products",
//     icon: faBoxOpen,
//     subOptions: [
//       { name: "Add New Product", path: "/products/add" },
//       { name: "Manage Categories", path: "/products/categories" },
//       { name: "Bulk Import & Export", path: "/products/bulk-import-export" },
//     ],
//   },
//   {
//     name: "Sales",
//     icon: faFileInvoice,
//     subOptions: [
//       { name: "Invoices & Billing", path: "/sales/invoices" },
//       { name: "Sales Reports", path: "/sales/reports" },
//       { name: "Refund & Returns", path: "/sales/refunds" },
//     ],
//   },
//   {
//     name: "Production",
//     icon: faTools,
//     subOptions: [
//       { name: "Manufacturing Process", path: "/production/process" },
//       { name: "Work Orders", path: "/production/work-orders" },
//       { name: "Production Costing", path: "/production/costing" },
//     ],
//   },
//   {
//     name: "Stock Management",
//     icon: faTools,
//     subOptions: [
//       { name: "Inventory Tracking", path: "/stock/inventory" },
//       { name: "Stock Adjustments", path: "/stock/adjustments" },
//       { name: "Warehouse Transfers", path: "/stock/transfers" },
//     ],
//   },
//   {
//     name: "Accounting",
//     icon: faFileInvoice,
//     subOptions: [
//       { name: "Financial Reports", path: "/accounting/reports" },
//       { name: "Tax Compliance", path: "/accounting/tax-compliance" },
//       { name: "Expense Tracking", path: "/accounting/expenses" },
//     ],
//   },
// ];


// const SettingsPage = () => {
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const navigate = useNavigate();

//   const toggleDropdown = (index) => {
//     setOpenDropdown(openDropdown === index ? null : index);
//   };

//   return (
//     <div className="settings-container">
//       <h2>Settings and Options</h2>
//       <div className="settings-grid">
//         {settingsOptions.map((option, index) => (
//           <div key={index} className="settings-option">
//             <div
//               className="settings-header"
//               onClick={() => toggleDropdown(index)}
//             >
//               <div className="icon-text">
//                 <FontAwesomeIcon icon={option.icon} className="icon" />
//                 <span className="text">{option.name}</span>
//               </div>
//               <span className="dropdown-arrow">
//                 {openDropdown === index ? "▲" : "▼"}
//               </span>
//             </div>
//             {option.subOptions && openDropdown === index && (
//               <div className="submenu">
//                 {option.subOptions.map((sub, i) => (
//                   <p key={i} onClick={() => navigate(sub.path)}>
//                     {sub.name}
//                   </p>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <style>
//         {`
//         /* General Styles */
// body {
//   font-family: Arial, sans-serif;
//   background-color: #f3f4f6;
// }

// /* Container */
// .settings-container {
//   display: flex;
//   flex-direction: column;
//   background-color: #f3f4f6;
//   min-height: 100vh;
//   padding: 20px;
// }

// /* Heading */
// .settings-container h2 {
//   font-size: 1.5rem;
//   font-weight: bold;
//   margin-bottom: 20px;
// }

// /* Grid Layout for Two Rows */
// .settings-grid {
//   display: grid;
//   grid-template-columns: repeat(2, 1fr); /* Two columns */
//   gap: 16px;
// }

// /* Individual Option Box */
// .settings-option {
//   background-color: white;
//   padding: 16px;
//   border-radius: 8px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease-in-out;
// }

// .settings-option:hover {
//   transform: translateY(-3px);
// }

// /* Dropdown Header */
// .settings-header {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 12px;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: background-color 0.2s ease-in-out;
// }

// .settings-header:hover {
//   background-color: #f9fafb;
// }

// /* Icon and Text */
// .settings-header .icon-text {
//   display: flex;
//   align-items: center;
// }

// .settings-header .icon-text .icon {
//   margin-right: 8px;
//   color: #4b5563;
// }

// .settings-header .text {
//   font-size: 16px;
//   font-weight: 600;
//   color: #1f2937;
// }

// /* Submenu */
// .submenu {
//   margin-left: 20px;
//   margin-top: 10px;
//   border-left: 2px solid #d1d5db;
//   padding-left: 12px;
//   font-size: 14px;
//   color: #6b7280;
// }

// .submenu p {
//   padding: 8px 0;
//   cursor: pointer;
//   transition: color 0.2s ease-in-out;
// }

// .submenu p:hover {
//   color: #111827;
//   font-weight: 500;
// }
// `}
//       </style>
//     </div>
//   );
// };

// export default SettingsPage;




import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faCogs,
  faStore,
  faCreditCard,
  faShoppingCart,
  faChartBar,
  faDatabase,
  faBoxOpen,
  faUsers,
  faTools,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";

const settingsOptions = [
  {
    name: "Setup",
    icon: faCogs,
    subOptions: [
      { name: "Company Information", path: "/setup/company-info" },
      { name: "User Roles & Permissions", path: "/setup/user-roles" },
      { name: "Tax Settings", path: "/setup/tax-settings" },
      { name: "Currency Settings", path: "/setup/currency-settings" },
    ],
  },
  {
    name: "Branches",
    icon: faStore,
    subOptions: [
      { name: "Add New Branch", path: "/branches/add" },
      { name: "Branch Locations", path: "/branches/locations" },
      { name: "Branch Managers", path: "/branches/managers" },
    ],
  },
  {
    name: "POS",
    icon: faCreditCard,
    subOptions: [
      { name: "POS Settings", path: "/pos/settings" },
      { name: "POS Receipt Builder", path: "/pos/receipt-builder" },
      { name: "POS Registers Setup", path: "/pos/registers" },
      { name: "POS Integration", path: "/pos/integration" },
      { name: "POS Vouchers & Store Credit", path: "/pos/vouchers" },
      { name: "POS Email Templates", path: "/pos/email-templates" },
    ],
  },
  {
    name: "Legacy B2B",
    icon: faShoppingCart,
    subOptions: [
      { name: "Customer Accounts", path: "/b2b/customer-accounts" },
      { name: "B2B Orders", path: "/b2b/orders" },
      { name: "Wholesale Pricing", path: "/b2b/wholesale-pricing" },
    ],
  },
  {
    name: "Integrations & API",
    icon: faChartBar,
    subOptions: [
      { name: "Third-Party Apps", path: "/integrations/third-party-apps" },
      { name: "API Keys & Webhooks", path: "/integrations/api-keys" },
      { name: "Payment Gateway Setup", path: "/integrations/payment-gateway" },
    ],
  },
  {
    name: "Custom Settings",
    icon: faDatabase,
    subOptions: [
      { name: "Custom Fields", path: "/custom-settings/fields" },
      { name: "Data Backup & Restore", path: "/custom-settings/backup" },
      { name: "Advanced System Logs", path: "/custom-settings/logs" },
    ],
  },
  {
    name: "CRM",
    icon: faUsers,
    subOptions: [
      { name: "Customer Management", path: "/crm/customers" },
      { name: "Loyalty Programs", path: "/crm/loyalty-programs" },
      { name: "Email Marketing", path: "/crm/email-marketing" },
    ],
  },
  {
    name: "Products",
    icon: faBoxOpen,
    subOptions: [
      { name: "Add New Product", path: "/products/add" },
      { name: "Manage Categories", path: "/products/categories" },
      { name: "Bulk Import & Export", path: "/products/bulk-import-export" },
    ],
  },
  {
    name: "Sales",
    icon: faFileInvoice,
    subOptions: [
      { name: "Invoices & Billing", path: "/sales/invoices" },
      { name: "Sales Reports", path: "/sales/reports" },
      { name: "Refund & Returns", path: "/sales/refunds" },
    ],
  },
  {
    name: "Production",
    icon: faTools,
    subOptions: [
      { name: "Manufacturing Process", path: "/production/process" },
      { name: "Work Orders", path: "/production/work-orders" },
      { name: "Production Costing", path: "/production/costing" },
    ],
  },
  {
    name: "Stock Management",
    icon: faTools,
    subOptions: [
      { name: "Inventory Tracking", path: "/stock/inventory" },
      { name: "Stock Adjustments", path: "/stock/adjustments" },
      { name: "Warehouse Transfers", path: "/stock/transfers" },
    ],
  },
  {
    name: "Accounting",
    icon: faFileInvoice,
    subOptions: [
      { name: "Financial Reports", path: "/accounting/reports" },
      { name: "Tax Compliance", path: "/accounting/tax-compliance" },
      { name: "Expense Tracking", path: "/accounting/expenses" },
    ],
  },
];

const SettingsPage = () => {
  const [openDropdown, setOpenDropdown] = useState(null);  // State for tracking which dropdown is active
  const navigate = useNavigate();

  const toggleDropdown = (index) => {
    // Only open the clicked dropdown and close others
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="settings-container">
      <h2>Settings and Options</h2>
      <div className="settings-grid">
        {settingsOptions.map((option, index) => (
          <div key={index} className={`settings-option ${openDropdown === index ? "active" : ""}`}>
            <div
              className="settings-header"
              onClick={() => toggleDropdown(index)} // Toggle the clicked dropdown
            >
              <div className="icon-text">
                <FontAwesomeIcon icon={option.icon} className="icon" />
                <span className="text">{option.name}</span>
              </div>
              <span className="dropdown-arrow">
                {openDropdown === index ? "▲" : "▼"}
              </span>
            </div>
            {option.subOptions && (
              <div className="submenu">
                {option.subOptions.map((sub, i) => (
                  <p key={i} onClick={() => navigate(sub.path)}>
                    {sub.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    
      <style>
        {`
        /* Grid Layout for a Single Column (to make the dropdowns stack vertically) */
.settings-grid {
  display: grid;
  grid-template-columns: 1fr; /* Single column layout */
  gap: 16px;
}

/* Individual Option Box */
.settings-option {
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  position: relative;
}

/* Submenu */
.submenu {
  margin-left: 20px;
  margin-top: 10px;
  border-left: 2px solid #d1d5db;
  padding-left: 12px;
  font-size: 14px;
  color: #6b7280;
  display: none; /* Hide by default */
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

/* Show submenu when dropdown is active */
.settings-option.active .submenu {
  display: block;
  opacity: 1;
}

/* Hover effect for the settings option */
.settings-option:hover {
  transform: translateY(-3px);
}

/* Dropdown Header */
.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.settings-header:hover {
  background-color: #f9fafb;
}

.settings-header .icon-text {
  display: flex;
  align-items: center;
}

.settings-header .icon-text .icon {
  margin-right: 8px;
  color: #4b5563;
}

.settings-header .text {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

`}
      </style>
    </div>
  );
};

export default SettingsPage;
