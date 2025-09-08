import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import InventoryPage from "./pages/InventoryManagement/InventoryPage";
import LoginPage from "./pages/UserAndRoles/LoginPage";
import Signup from "./pages/UserAndRoles/Signup";
import QRScanner from "./components/QRScanner";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import StockAlertNotification from "./components/StockAlertNotification";
import PurchaseOrdersPage from "./pages/PurchaseAndSupplier/PurchaseOrdersPage";
import SalesPage from "./pages/SalesManagement/SalesPage";
import ReturnsAndRefunds from "./pages/SalesManagement/ReturnsAndRefundsPage";
import SupplierManagement from "./pages/PurchaseAndSupplier/SupplierManagement";
import PromotionsPage from "./pages/SalesManagement/PromotionsPage";
import CompliancePage from "./pages/SettingsAndConfiguration/CompliancePage";
import EcommerceIntegration from "./pages/MultiStoreManagement/ECommerceIntegrationPage";
import SettingsPage from "./pages/SettingsAndConfiguration/SettingsPage";
import CRMPage from "./pages/CRM/CRMPage";
import MultiStoreManagementPage from "./pages/MultiStoreManagement/MultiStoreManagementPage";
import PhysicalInventoryPage from "./pages/InventoryManagement/PhysicalInventoryPage";
import UserManagementPage from "./pages/UserAndRoles/UserManagementPage";
import UserProfile from "./components/UserProfile";
import AnalyticsPage from "./pages/ReportsAndAnalytics/AnalyticsPage";
import CustomerLoyaltyPage from "./pages/CustomerManagement/CustomerLoyaltyPage";
import ReportsPage from "./pages/SalesManagement/StorePOSReports";
import BatchAndExpiryPage from "./pages/InventoryManagement/BatchAndExpiryPage";
import ProductCard from "./components/ProductCard";
import FinancialReportPage from "./pages/ReportsAndAnalytics/FinancialReportPage";
import InvoiceManagementPage from "./pages/AccountingAndFinance/InvoiceManagementPage";
import AccountsPayablePage from "./pages/AccountingAndFinance/AccountsPayablePage";
import ExpenseTrackingPage from "./pages/AccountingAndFinance/ExpenseTrackingPage";
import TaxFilingSummaryPage from "./pages/AccountingAndFinance/TaxFilingSummaryPage";
import AccountsReceivablePage from "./pages/AccountingAndFinance/AccountsReceivablePage";
import AuditReportsPage from "./pages/AccountingAndFinance/AuditReportsPage";
import BudgetPlanningPage from "./pages/AccountingAndFinance/BudgetPlanningPage";
import PayrollManagementPage from "./pages/AccountingAndFinance/PayrollManagementPage";
import ProfitabilityPage from "./pages/AccountingAndFinance/ProfitabilityPage";
import StorePOSLandingPage from "./pages/Dashboard/StorePOSLandingPage";
import ProductsPage from "./pages/SalesManagement/ProductsPage";
import OrdersPage from "./pages/SalesManagement/OrdersPage";
import CustomersPage from "./pages/CustomerManagement/CustomersPage";
import StorePOSSettingsPage from "./pages/SettingsAndConfiguration/StorePOSSettings";
import StorePOSReports from "./pages/SalesManagement/StorePOSReports";
import ReportChart from "./components/ReportChart";
import ReturnRefundHoldSale from "./pages/SalesManagement/ReturnRefundHoldSale";
import ReturnRefundOfflineOrders from "./pages/SalesManagement/ReturnRefundOfflineOrders";
import VendorDashboard from "./pages/Dashboard/VendorDashboard";
import StaffForm from "./pages/SalesManagement/StaffForm";
import StaffList from "./pages/SalesManagement/StaffList";
import VendorDashboardOverview from "./pages/Dashboard/VendorDashboardOverview";
import VendorCustomerPage from "./pages/SalesManagement/VendorCustomerPage";
import VendorSalesPage from "./pages/SalesManagement/VendorSalesPage";
import VendorProductPage from "./pages/SalesManagement/VendorProductPage";
import VendorStaffPage from "./pages/SalesManagement/VendorStaffPage";
import HospitalInvoiceBilling from "./pages/Invoicebilling/HospitalInvoiceBilling";
import PharmacyBillPrint from "./pages/Invoicebilling/PrintPharmacyInvoicePage";
import PharmacyInvoiceBilling from "./pages/Invoicebilling/PharmacyInvoiceBilling";
import HospitalInvoiceBillingPrint from "./pages/Invoicebilling/PrintInvoicePage";
import PrintInvoicePage from "./pages/Invoicebilling/PrintInvoicePage";
import PrintPharmacyInvoicePage from "./pages/Invoicebilling/PrintPharmacyInvoicePage";
import Itempage from "./pages/StoreHardware/Item";
import ItemGroupPage from "./pages/StoreHardware/ItemGroup";
import NewCompositeItem from "./pages/StoreHardware/CompositeItem";
import PriceLists from "./pages/StoreHardware/PriceList";
import NewPriceList from "./pages/StoreHardware/NewPriceList";
import Itemspage from "./pages/StoreHardware/Items";
import AdjustmentsList from "./pages/StoreHardware/Adjustments";
import NewAdjustmentPage from "./pages/StoreHardware/NewAdjustmentPage";
import FifoCostLotTracking from "./pages/StoreHardware/FifoCostLotTracking";
import Dashboard from "./pages/StoreHardware/Dashboard";
import ImportItemGroup from "./pages/StoreHardware/ImportItemGroup";
import PreferencesPage from "./pages/StoreHardware/PreferencesPage";
import Navbar from "./components/Navbar";
import Gereral from "./pages/StoreHardware/Preferences/Gerenal";
import CustomerVendor from "./pages/StoreHardware/Preferences/CustomerVendor";
import TransactionNumberSeries from "./pages/StoreHardware/Preferences/TransactionNumberSeries";

import ItemPerference from "./pages/StoreHardware/Preferences/ItemPerference";
import InventoryAdjustment from "./pages/StoreHardware/Preferences/InventoryAdjustment";
import SalePerferences from "./pages/StoreHardware/Preferences/SalePerferences";
import Packages from "./pages/StoreHardware/Preferences/Packages";
import NewCustomField from "./pages/StoreHardware/Preferences/NewCustomField";
import Shipments from "./pages/StoreHardware/Preferences/Shipments";
import DeliveryChallans from "./pages/StoreHardware/Preferences/DeliveryChallans";
import Payments from "./pages/StoreHardware/Preferences/Payments";
import Invoices from "./pages/StoreHardware/Preferences/Invoices";
function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        {/* <Sidebar /> */}
        <div className="content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/InventoryPage" element={<InventoryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/qrscanner" element={<QRScanner />} />
            <Route path="/pagination" element={<Pagination />} />
            <Route path="/searchbar" element={<SearchBar />} />
            <Route
              path="/StockAlertNotification"
              element={<StockAlertNotification />}
            />
            <Route
              path="/PurchaseOrdersPage"
              element={<PurchaseOrdersPage />}
            />
            <Route path="/salespage" element={<SalesPage />} />
            <Route path="/ReturnsAndRefunds" element={<ReturnsAndRefunds />} />
            <Route
              path="/SupplierManagement"
              element={<SupplierManagement />}
            />
            <Route path="/PromotionsPage" element={<PromotionsPage />} />
            <Route path="/CompliancePage" element={<CompliancePage />} />
            <Route
              path="/EcommerceIntegration"
              element={<EcommerceIntegration />}
            />
            <Route path="/SettingsPage" element={<SettingsPage />} />
            <Route path="/CRMPage" element={<CRMPage />} />
            <Route
              path="/MultiStoreManagementPage"
              element={<MultiStoreManagementPage />}
            />
            <Route
              path="/PhysicalInventoryPage"
              element={<PhysicalInventoryPage />}
            />
            <Route
              path="/UserManagementPage"
              element={<UserManagementPage />}
            />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/AnalyticsPage" element={<AnalyticsPage />} />
            <Route
              path="/CustomerLoyaltyPage"
              element={<CustomerLoyaltyPage />}
            />
            <Route path="/ReportsPage" element={<ReportsPage />} />
            <Route
              path="/BatchAndExpiryPage"
              element={<BatchAndExpiryPage />}
            />
            <Route path="/ProductCard" element={<ProductCard />} />
            <Route
              path="/FinancialReportPage"
              element={<FinancialReportPage />}
            />
            <Route
              path="/InvoiceManagementPage"
              element={<InvoiceManagementPage />}
            />
            <Route
              path="/AccountsPayablePage"
              element={<AccountsPayablePage />}
            />
            <Route
              path="/ExpenseTrackingPage"
              element={<ExpenseTrackingPage />}
            />
            <Route
              path="/TaxFilingSummaryPage"
              element={<TaxFilingSummaryPage />}
            />
            <Route
              path="/AccountsReceivablePage"
              element={<AccountsReceivablePage />}
            />
            <Route path="/AuditReportsPage" element={<AuditReportsPage />} />
            <Route
              path="/BudgetPlanningPage"
              element={<BudgetPlanningPage />}
            />
            <Route
              path="/PayrollManagementPage"
              element={<PayrollManagementPage />}
            />
            <Route path="/ProfitabilityPage" element={<ProfitabilityPage />} />
            <Route
              path="/StorePOSLandingPage"
              element={<StorePOSLandingPage />}
            />
            <Route path="/ProductsPage" element={<ProductsPage />} />
            <Route path="/OrdersPage" element={<OrdersPage />} />
            <Route path="/CustomersPage" element={<CustomersPage />} />
            <Route
              path="/StorePOSSettingsPage"
              element={<StorePOSSettingsPage />}
            />
            <Route path="/StorePOSReports" element={<StorePOSReports />} />
            <Route path="/ReportChart" element={<ReportChart />} />
            <Route
              path="/ReturnRefundHoldSale"
              element={<ReturnRefundHoldSale />}
            />
            <Route
              path="/ReturnRefundOfflineOrders"
              element={<ReturnRefundOfflineOrders />}
            />
            <Route path="/VendorDashboard" element={<VendorDashboard />} />
            <Route path="/StaffForm" element={<StaffForm />} />
            <Route path="/StaffList" element={<StaffList />} />
            <Route
              path="/VendorDashboardOverview"
              element={<VendorDashboardOverview />}
            />
            <Route
              path="/VendorCustomerPage"
              element={<VendorCustomerPage />}
            />
            <Route path="/VendorSalesPage" element={<VendorSalesPage />} />
            <Route path="/VendorProductPage" element={<VendorProductPage />} />
            <Route path="/VendorStaffPage" element={<VendorStaffPage />} />
            <Route
              path="/HospitalInvoiceBilling"
              element={<HospitalInvoiceBilling />}
            />
            <Route
              path="/hospital-invoice/print/:id"
              element={<PrintInvoicePage />}
            />
            <Route
              path="/PharmacyInvoiceBilling"
              element={<PharmacyInvoiceBilling />}
            />
            <Route
              path="/pharmacy-invoice/print/:id"
              element={<PrintPharmacyInvoicePage />}
            />
            //Store Hardware
            <Route path="/item" element={<Itempage />} />
            <Route path="/items" element={<Itemspage />} />
            <Route path="/itemgroup" element={<ItemGroupPage />} />
            <Route path="/compositeitem" element={<NewCompositeItem />} />
            <Route path="/pricelists" element={<PriceLists />} />
            <Route path="/newpricelist" element={<NewPriceList />} />
            <Route path="/adjustments" element={<AdjustmentsList />} />
            <Route path="/newadjustment" element={<NewAdjustmentPage />} />
            <Route
              path="/fifoCostLotTracking"
              element={<FifoCostLotTracking />}
            />
            <Route path="/dashboard-store" element={<Dashboard />} />
            <Route path="/import-item-group" element={<ImportItemGroup />} />
            <Route path="/preferences" element={<PreferencesPage />} />
            <Route path="/nav" element={<Navbar />} />
            <Route path="/gereral" element={<Gereral />} />
            <Route path="/CustomerVendor" element={<CustomerVendor />} />
            <Route path="/CustomerVendor" element={<CustomerVendor />} />
            <Route
              path="/TransactionNumberSeries"
              element={<TransactionNumberSeries />}
            />
            <Route path="/ItemPerferance" element={<ItemPerference />} />
            <Route
              path="/InventoryAdjustment"
              element={<InventoryAdjustment />}
            />
            <Route path="/SalePerferences" element={<SalePerferences />} />
            <Route path="/ Packages" element={<Packages />} />
            <Route path="/NewCustomField" element={<NewCustomField />} />
            <Route path="/Shipments" element={<Shipments />} />
            <Route path="/DeliveryChallans" element={<DeliveryChallans />} />
            <Route path="/Invoices" element={<Invoices />} />
            <Route path="/Payments" element={<Payments />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
