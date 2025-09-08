import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAgentListOpen, setIsAgentListOpen] = useState(false);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false); // New state for Customer Details dropdown
  const [isFranchiseDropdownOpen, setIsFranchiseDropdownOpen] = useState(false); // Franchise dropdown state
  const [isTerritoryDropdownOpen, setIsTerritoryDropdownOpen] = useState(false); // Territory dropdown state
  const [isStoreHardware, setIsStoreHardware] = useState(false); // Product dropdown state

  const [isManageDetailsOpen, setIsManageDetailsOpen] = useState(false); // New state for Manage Details dropdown
  // const [isAccountDetailsOpen, setIsAccountDetailsOpen] = useState(false); // New state for Account Details dropdown
  const [isReportsAndAnalyticsOpen, setIsReportsAndAnalyticsOpen] =
    useState(false); // New state for Account Details dropdown
  const [isUserAndRolesOpen, setIsUserAndRolesOpen] = useState(false); // New state for Account Details dropdown
  const [isSettingsAndConfigurationOpen, setIsSettingsAndConfigurationOpen] =
    useState(false); // New state for Account Details dropdown
  const [isMultiStoreManagementOpen, setIsMultiStoreManagementOpen] =
    useState(false); // New state for Account Details dropdown
  const [isAccountingAndFinanceOpen, setIsAccountingAndFinanceOpen] =
    useState(false); // New state for Account Details dropdown
  const [isCRMOpen, setIsCRMOpen] = useState(false); // New state for Account Details dropdown
  const [isErpPos, setIsErpPos] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isSalesOpen, setIsSalesOpen] = useState(false);
  const [isPurchasesOpen, setIsPurchasesOpen] = useState(false);

  const togglePurchases = () => {
    setIsPurchasesOpen(!isPurchasesOpen);
  };
  const toggleStoreHardware = () => {
    setIsStoreHardware(!isStoreHardware);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleposerp = () => {
    setIsErpPos(!isErpPos);
  };
  const toggleAgentListDropdown = () => {
    setIsAgentListOpen(!isAgentListOpen);
  };

  const toggleCustomerDetailsDropdown = () => {
    setIsCustomerDetailsOpen(!isCustomerDetailsOpen); // Toggle Customer Details dropdown
  };

  const toggleFranchiseDropdown = () => {
    setIsFranchiseDropdownOpen(!isFranchiseDropdownOpen);
  };

  const toggleTerritoryDropdown = () => {
    setIsTerritoryDropdownOpen(!isTerritoryDropdownOpen);
  };

  const toggleManageDetailsDropdown = () => {
    setIsManageDetailsOpen(!isManageDetailsOpen); // Toggle Customer Details dropdown
  };

  const toggleReportsAndAnalyticsDropdown = () => {
    setIsReportsAndAnalyticsOpen(!isReportsAndAnalyticsOpen); // Toggle Customer Details dropdown
  };

  const toggleUserAndRolesDropdown = () => {
    setIsUserAndRolesOpen(!isUserAndRolesOpen); // Toggle Customer Details dropdown
  };

  const toggleSettingsAndConfigurationDropdown = () => {
    setIsSettingsAndConfigurationOpen(!isSettingsAndConfigurationOpen); // Toggle Customer Details dropdown
  };

  const toggleMultiStoreManagementDropdown = () => {
    setIsMultiStoreManagementOpen(!isMultiStoreManagementOpen); // Toggle Customer Details dropdown
  };

  const toggleAccountingAndFinanceDropdown = () => {
    setIsAccountingAndFinanceOpen(!isAccountingAndFinanceOpen); // Toggle Customer Details dropdown
  };

  const toggleCRMDropdown = () => {
    setIsCRMOpen(!isCRMOpen); // Toggle Customer Details dropdown
  };

  const toggleInventory = () => {
    setIsInventoryOpen((prev) => !prev);
  };

  const toggleSales = () => {
    setIsSalesOpen((prev) => !prev);
  };

  return (
    <>
      <div style={{ fontSize: "14px", fontFamily: "Arial, sans-serif" }}>
        <div
          className="sidebar"
          style={{ ...styles.sidebar, width: isOpen ? "320px" : "65px" }}
        >
          {/* Hamburger Menu */}
          <div style={styles.hamburger} onClick={toggleSidebar}>
            <div style={styles.line}></div>
            <div style={styles.line}></div>
            <div style={styles.line}></div>
          </div>

          {/* Menu */}
          <ul style={styles.menu}>
            <li>
              <div style={styles.dropdownContainer}>
                {/* Franchise Dropdown */}
                <div
                  style={styles.dropdownToggle}
                  onClick={toggleFranchiseDropdown}
                >
                  {isOpen ? "📊 Dashboard" : "📊"}
                  {isOpen && (
                    <span style={{ marginLeft: "auto" }}>
                      {isFranchiseDropdownOpen ? "▲" : "▼"}
                    </span>
                  )}
                </div>
                {isFranchiseDropdownOpen && (
                  <ul style={styles.dropdownMenu}>
                    <li>
                      <Link to="/ " style={styles.dropdownLink}>
                        DashboardPage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/StorePOSLandingPage"
                        style={styles.dropdownLink}
                      >
                        StorePOSLandingPage
                      </Link>
                    </li>
                    <li>
                      <Link to="/VendorDashboard" style={styles.dropdownLink}>
                        VendorDashboard
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>

            <li>
              <div style={styles.dropdownContainer}>
                {/* Agent List Dropdown */}
                <div style={styles.dropdownToggle} onClick={toggleposerp}>
                  {isOpen ? "👥 OFFLINE POS MODULE " : "👥"}
                  {isOpen && (
                    <span style={{ marginLeft: "auto" }}>
                      {isErpPos ? "▲" : "▼"}
                    </span>
                  )}
                </div>
                {isErpPos && (
                  <ul style={styles.dropdownMenu}>
                    <li>
                      <Link to="/OfflineMode" style={styles.dropdownLink}>
                        Offline Mode Status{" "}
                      </Link>
                      <Link to="/OfflineCheckout" style={styles.dropdownLink}>
                        Offline Checkout
                      </Link>
                      <Link to="/OfflineOrders" style={styles.dropdownLink}>
                        Offline Orders
                      </Link>
                      <Link to="/OfflineProducts" style={styles.dropdownLink}>
                        Offline Product Cache
                      </Link>
                      <Link
                        to="/OfflineSalesReport"
                        style={styles.dropdownLink}
                      >
                        Offline Sales Report
                      </Link>
                      <Link to="/OfflineInventory" style={styles.dropdownLink}>
                        Offline Inventory Adjust
                      </Link>
                      <Link to="/OfflineErrorLog" style={styles.dropdownLink}>
                        Offline Sync Logs
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>

            <li>
              <div style={styles.dropdownContainer}>
                {/* Territory Dropdown */}
                <div
                  style={styles.dropdownToggle}
                  onClick={toggleTerritoryDropdown}
                >
                  {isOpen ? "💰 SalesManagement" : "💰"}
                  {isOpen && (
                    <span style={{ marginLeft: "auto" }}>
                      {isTerritoryDropdownOpen ? "▲" : "▼"}
                    </span>
                  )}
                </div>
                {isTerritoryDropdownOpen && (
                  <ul style={styles.dropdownMenu}>
                    <li>
                      <Link to="/salespage" style={styles.dropdownLink}>
                        Sales page
                      </Link>
                    </li>
                    <li>
                      <Link to="/OrdersPage" style={styles.dropdownLink}>
                        Orders Page
                      </Link>
                    </li>
                    <li>
                      <Link to="/ReturnsAndRefunds" style={styles.dropdownLink}>
                        Returns And Refunds
                      </Link>
                    </li>
                    <li>
                      <Link to="/PromotionsPage" style={styles.dropdownLink}>
                        Promotions Page
                      </Link>
                    </li>

                    <li>
                      <Link to="/ProductBundles" style={styles.dropdownLink}>
                        {" "}
                        Product Bundles
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>

            <li>
              <div style={styles.dropdownContainer}>
                {/* Store Hardware Dropdown */}
                <div
                  style={styles.dropdownToggle}
                  onClick={toggleStoreHardware}
                >
                  💰 Product Management
                  <span>{isStoreHardware ? "▲" : "▼"}</span>
                </div>

                {isStoreHardware && (
                  <ul style={styles.dropdownMenu}>
                    <div style={styles.dropdownSubToggle}>
                      <a>
                        {" "}
                        <Link to="/dashboard-store" style={styles.dropdownLink}>
                          {" "}
                          📦 Dashboard{" "}
                        </Link>
                      </a>
                    </div>
                    {/* Inventory with Nested Menu */}
                    <li>
                      <div
                        style={styles.dropdownSubToggle}
                        onClick={toggleInventory}
                      >
                        📦 All Products
                        <span>{isInventoryOpen ? "▲" : "▼"}</span>
                      </div>
                      {isInventoryOpen && (
                        <ul style={styles.submenu}>
                          <li>
                            <Link to="/item" style={styles.dropdownLink}>
                              {" "}
                              Create New Product
                            </Link>
                          </li>
                          <li>
                            <Link to="/categories" style={styles.dropdownLink}>
                              Create New Category
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/sub-categories"
                              style={styles.dropdownLink}
                            >
                              Create New Subcategory
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/inventory-adjust"
                              style={styles.dropdownLink}
                            >
                              Categories
                            </Link>
                          </li>
                          <li>
                            <Link to="/pricelists" style={styles.dropdownLink}>
                              Price List
                            </Link>
                          </li>
                          <li>
                            <Link to="/adjustments" style={styles.dropdownLink}>
                              Adjustments
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* Sales */}

                    <li>
                      <div
                        style={styles.dropdownSubToggle}
                        onClick={toggleSales}
                      >
                        💳 Sales
                        <span>{isSalesOpen ? "▲" : "▼"}</span>
                      </div>
                      {isSalesOpen && (
                        <ul style={styles.submenu}>
                          <li>
                            <Link to="/inventory" style={styles.dropdownLink}>
                              {" "}
                              Items
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/inventory-adjust"
                              style={styles.dropdownLink}
                            >
                              Item Group
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/inventory-adjust"
                              style={styles.dropdownLink}
                            >
                              Categories
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/inventory-adjust"
                              style={styles.dropdownLink}
                            >
                              Adjustments
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* Purchases */}
                    <li>
                      <div
                        style={styles.dropdownSubToggle}
                        onClick={togglePurchases}
                      >
                        💳 Purchases
                        <span>{isPurchasesOpen ? "▲" : "▼"}</span>
                      </div>
                      {isPurchasesOpen && (
                        <ul style={styles.submenu}>
                          <li>
                            <Link to="/vendors" style={styles.dropdownLink}>
                              Vendors
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/Purchase Orders"
                              style={styles.dropdownLink}
                            >
                              Purchase Orders
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/inventory-adjust"
                              style={styles.dropdownLink}
                            >
                              Purchase Receives
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/inventory-adjust"
                              style={styles.dropdownLink}
                            >
                              Bills
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/inventory-adjust"
                              style={styles.dropdownLink}
                            >
                              Payments Made
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/inventory-adjust"
                              style={styles.dropdownLink}
                            >
                              Vendor Credits
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </div>
            </li>

            <li>
              <div style={styles.dropdownContainer}>
                {/* Dropdown Toggle */}
                <div
                  style={styles.dropdownToggle}
                  onClick={toggleAgentListDropdown}
                >
                  {isOpen ? "📦 InventoryManagement" : "📦"}
                  {isOpen && (
                    <span style={{ marginLeft: "auto" }}>
                      {isAgentListOpen ? "▲" : "▼"}
                    </span>
                  )}
                </div>
                {/* Dropdown Menu */}
                {isAgentListOpen && (
                  <ul style={styles.dropdownMenu}>
                    <li>
                      <Link to="/InventoryPage" style={styles.dropdownLink}>
                        InventoryPage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/PhysicalInventoryPage"
                        style={styles.dropdownLink}
                      >
                        PhysicalInventoryPage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/BatchAndExpiryPage"
                        style={styles.dropdownLink}
                      >
                        BatchAndExpiryPage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/StockAlertNotification"
                        style={styles.dropdownLink}
                      >
                        StockAlertNotification
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <div style={styles.dropdownContainer}>
                {/* Customer Details Dropdown */}
                <div
                  style={styles.dropdownToggle}
                  onClick={toggleCustomerDetailsDropdown}
                >
                  {isOpen ? "🛒 PurchaseAndSupplier" : "🛒"}
                  {isOpen && (
                    <span style={{ marginLeft: "auto" }}>
                      {isCustomerDetailsOpen ? "▲" : "▼"}
                    </span>
                  )}
                </div>
                {/* Customer Details Dropdown Menu */}
                {isCustomerDetailsOpen && (
                  <ul style={styles.dropdownMenu}>
                    <li>
                      <Link
                        to="/PurchaseOrdersPage"
                        style={styles.dropdownLink}
                      >
                        PurchaseOrdersPage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/SupplierManagement"
                        style={styles.dropdownLink}
                      >
                        SupplierManagement
                      </Link>
                    </li>

                    <li>
                      <Link to="/StockMovement" style={styles.dropdownLink}>
                        Stock Movement Tracker
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <div style={styles.dropdownContainer}>
                {/* Manage Details Dropdown */}
                <div
                  style={styles.dropdownToggle}
                  onClick={toggleManageDetailsDropdown}
                >
                  {isOpen ? "👥 CustomerManagement" : "👥"}
                  {isOpen && (
                    <span style={{ marginLeft: "auto" }}>
                      {isManageDetailsOpen ? "▲" : "▼"}
                    </span>
                  )}
                </div>
                {/* Customer Details Dropdown Menu */}
                {isManageDetailsOpen && (
                  <ul style={styles.dropdownMenu}>
                    <li>
                      <Link
                        to="/CustomerLoyaltyPage"
                        style={styles.dropdownLink}
                      >
                        CustomerLoyaltyPage
                      </Link>
                    </li>
                    <li>
                      <Link to="/CustomersPage" style={styles.dropdownLink}>
                        CustomersPage
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            {/* ------------------------------------------------------------------------------------------------------ */}
            <li>
              <div style={styles.dropdownContainer}>
                {/* ReportsAndAnalytics Dropdown */}
                <div
                  style={styles.dropdownToggle}
                  onClick={toggleReportsAndAnalyticsDropdown}
                >
                  {isOpen ? "📈 ReportsAndAnalytics" : "📈"}
                  {isOpen && (
                    <span style={{ marginLeft: "auto" }}>
                      {isReportsAndAnalyticsOpen ? "▲" : "▼"}
                    </span>
                  )}
                </div>
                {/* ReportsAndAnalytics Dropdown Menu */}
                {isReportsAndAnalyticsOpen && (
                  <ul style={styles.dropdownMenu}>
                    <li>
                      <Link to="/AnalyticsPage" style={styles.dropdownLink}>
                        AnalyticsPage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/FinancialReportPage"
                        style={styles.dropdownLink}
                      >
                        FinancialReportPage
                      </Link>
                    </li>
                    <li>
                      <Link to="/ReportsPage" style={styles.dropdownLink}>
                        ReportsPage
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            {/* ---------------------------2 */}
            <li>
              <div style={styles.dropdownContainer}>
                {/* UserAndRoles Dropdown */}
                <div
                  style={styles.dropdownToggle}
                  onClick={toggleUserAndRolesDropdown}
                >
                  {isOpen ? "🔐 User And Roles" : "🔐"}
                  {isOpen && (
                    <span style={{ marginLeft: "auto" }}>
                      {isUserAndRolesOpen ? "▲" : "▼"}
                    </span>
                  )}
                </div>
                {/* UserAndRoles Dropdown Menu */}
                {isUserAndRolesOpen && (
                  <ul style={styles.dropdownMenu}>
                    <li>
                      <Link
                        to="/UserManagementPage"
                        style={styles.dropdownLink}
                      >
                        UserManagementPage
                      </Link>
                    </li>
                    <li>
                      <Link to="/login" style={styles.dropdownLink}>
                        login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/TerminalAssignment"
                        style={styles.dropdownLink}
                      >
                        Terminal Assignment Page
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            {/* -----------------3 */}
            <li>
              <div style={styles.dropdownContainer}>
                {/* SettingsAndConfiguration Dropdown */}
                <div
                  style={styles.dropdownToggle}
                  onClick={toggleSettingsAndConfigurationDropdown}
                >
                  {isOpen ? "⚙️ SettingsAndConfiguration" : "⚙️"}
                  {isOpen && (
                    <span style={{ marginLeft: "auto" }}>
                      {isSettingsAndConfigurationOpen ? "▲" : "▼"}
                    </span>
                  )}
                </div>
                {/* SettingsAndConfiguration Dropdown Menu */}
                {isSettingsAndConfigurationOpen && (
                  <ul style={styles.dropdownMenu}>
                    <li>
                      <Link to="/CompliancePage" style={styles.dropdownLink}>
                        CompliancePage
                      </Link>
                    </li>
                    <li>
                      <Link to="/SettingsPage" style={styles.dropdownLink}>
                        SettingsPage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/StorePOSSettingsPage"
                        style={styles.dropdownLink}
                      >
                        StorePOSSettingsPage
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            {/* ---------------------4 */}
            <li>
              <div style={styles.dropdownContainer}>
                {/* MultiStoreManagement Dropdown */}
                <div
                  style={styles.dropdownToggle}
                  onClick={toggleMultiStoreManagementDropdown}
                >
                  {isOpen ? "🏪 MultiStoreManagement" : "🏪"}
                  {isOpen && (
                    <span style={{ marginLeft: "auto" }}>
                      {isMultiStoreManagementOpen ? "▲" : "▼"}
                    </span>
                  )}
                </div>
                {/* MultiStoreManagement Dropdown Menu */}
                {isMultiStoreManagementOpen && (
                  <ul style={styles.dropdownMenu}>
                    <li>
                      <Link
                        to="/EcommerceIntegration"
                        style={styles.dropdownLink}
                      >
                        EcommerceIntegration
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/MultiStoreManagementPage"
                        style={styles.dropdownLink}
                      >
                        MultiStoreManagementPage
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            {/* ---------------------5 */}
            <li>
              <div style={styles.dropdownContainer}>
                {/* AccountingAndFinance Dropdown */}
                <div
                  style={styles.dropdownToggle}
                  onClick={toggleAccountingAndFinanceDropdown}
                >
                  {isOpen ? "💸 AccountingAndFinance" : "💸"}
                  {isOpen && (
                    <span style={{ marginLeft: "auto" }}>
                      {isAccountingAndFinanceOpen ? "▲" : "▼"}
                    </span>
                  )}
                </div>
                {/* AccountingAndFinance Dropdown Menu */}
                {isAccountingAndFinanceOpen && (
                  <ul style={styles.dropdownMenu}>
                    <li>
                      <Link
                        to="/AccountsPayablePage"
                        style={styles.dropdownLink}
                      >
                        AccountsPayablePage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/AccountsReceivablePage"
                        style={styles.dropdownLink}
                      >
                        AccountsReceivablePage
                      </Link>
                    </li>
                    <li>
                      <Link to="/AuditReportsPage" style={styles.dropdownLink}>
                        AuditReportsPage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/BudgetPlanningPage"
                        style={styles.dropdownLink}
                      >
                        BudgetPlanningPage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/ExpenseTrackingPage"
                        style={styles.dropdownLink}
                      >
                        ExpenseTrackingPage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/InvoiceManagementPage"
                        style={styles.dropdownLink}
                      >
                        InvoiceManagementPage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/PayrollManagementPage"
                        style={styles.dropdownLink}
                      >
                        PayrollManagementPage
                      </Link>
                    </li>
                    <li>
                      <Link to="/ProfitabilityPage" style={styles.dropdownLink}>
                        ProfitabilityPage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/TaxFilingSummaryPage"
                        style={styles.dropdownLink}
                      >
                        TaxFilingSummaryPage
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>

            <li>
              <div style={styles.dropdownContainer}>
                {/* CRM Dropdown */}
                <div style={styles.dropdownToggle} onClick={toggleCRMDropdown}>
                  {isOpen ? "💼 CRM" : "💼"}
                  {isOpen && (
                    <span style={{ marginLeft: "auto" }}>
                      {isCRMOpen ? "▲" : "▼"}
                    </span>
                  )}
                </div>
                {/* CRM Dropdown Menu */}
                {isCRMOpen && (
                  <ul style={styles.dropdownMenu}>
                    <li>
                      <Link to="/CRMPage" style={styles.dropdownLink}>
                        CRMPage
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
          <style>
            {`
      @media (max-width: 768px) {
        .sidebar {
        position: relative;
        top: 40px;
        }
      }`}
          </style>
        </div>
      </div>
    </>
  );
};

const styles = {
  sidebar: {
    height: "100vh",
    backgroundColor: "black",
    color: "#fff",
    padding: "7rem 20px",
    transition: "width 0.3s ease",
    boxSizing: "border-box",
    overflowY: "auto",
  },

  hamburger: {
    cursor: "pointer",
    marginBottom: "30px",
  },
  line: {
    width: "25px",
    height: "2px",
    backgroundColor: "#fff",
    margin: "5px 0",
    borderRadius: "2px",
    marginBottom: "5px",
  },
  menu: {
    listStyle: "none",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "16px",
    transition: "color 0.2s",
  },
  dropdownContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    position: "relative",
    padding: "10px",
  },

  dropdownToggle: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: "bold",
    backgroundColor: "#34495e",
    padding: "10px",
    borderRadius: "6px",
  },
  dropdownMenu: {
    listStyle: "none",
    paddingLeft: "0px",
    marginTop: "10px",
  },
  dropdownLink: {
    display: "block",
    padding: "8px 16px",
    textDecoration: "none",
    color: "#333",
  },

  dropdownSubToggle: {
    cursor: "pointer",
    fontWeight: "500",
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  submenu: {
    listStyle: "none",
    paddingLeft: "20px",
    marginTop: "4px",
    borderLeft: "2px solid rgba(0, 0, 0, 0.5)",
    borderRadius: "4px",
  },

  dropdownMenu: {
    listStyle: "none",
    padding: "10px 0 10px 15px",
    margin: "5px 0",
    backgroundColor: "#34495e",
    borderRadius: "5px",
  },
  dropdownLink: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "14px",
    padding: "5px 0",
    display: "block",
  },
};

export default Sidebar;
