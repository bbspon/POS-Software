import React, { useState } from "react";
import { Container,Row,  Nav, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/Sidebar";
import Gereral from "./Preferences/Gerenal";
import CustomerVendor from "./Preferences/CustomerVendor";
import TransactionNumberSeries from "./Preferences/TransactionNumberSeries";
import ItemPerference from "./Preferences/ItemPerference";
import InventoryAdjustment from "./Preferences/InventoryAdjustment";
import SalePerferences from "./Preferences/SalePerferences";
import Packages from "./Preferences/Packages";
import DeliveryChallans from "./Preferences/DeliveryChallans";
import Shipments from "./Preferences/Shipments";
import Invoices from "./Preferences/Invoices";
import Payments from "./Preferences/Payments";
import SalesReturnsFieldCustomization from "./Preferences/SalesReturnsFieldCustomization";
import Credit from "./Preferences/Credit";
import Bills from "./Preferences/Bills";
import PaymentsMade from "./Preferences/PaymentsMade";
import PurchaseOrders from "./Preferences/PurchaseOrders";
import PurchaseReceives from "./Preferences/PurchaseReceives";
import VendorCredits from "./Preferences/VendorCredits";
import CustomModules from "./Preferences/CustomModules";
const PreferencesPage = () => {
  const [general, setGeneral] = useState(true);
  const [customerVendor, setCustomerVendor] = useState(false);
  const [transactionNumberSeries, setTransactionNumberSeries] = useState(false);
  const [items, setItems] = useState(false);
  const [inventoryAdjustment, setInventoryAdjustment] = useState(false);
  const [sale, setSale] = useState(false);
  const [packages, setPackages] = useState(false);
  const [shipments, setShipments] = useState(false);
  const [deliveryChallans, setDeliveryChallans] = useState(false);
  const [invoices, setInvoices] = useState(false);
  const [payments, setPayments] = useState(false);
  const [salesReturns, setSalesReturns] = useState(false);
  const [credit, setCredit] = useState(false);
  const [bills, setBills] = useState(false);
  const [paymentsMade, setPaymentsMade] = useState(false);
  const [purchaseReceives, setPurchaseReceives] = useState(false);
  const [vendorCredits, setVendorCredits] = useState(false);
 const [purchaseOrders, setPurchaseOrders] = useState(false);
 const [customModules, setCustomModules] = useState(false);
  const resetSections = () => {
  setGeneral(false);
  setCustomerVendor(false);
  setTransactionNumberSeries(false);
  setItems(false);
  setInventoryAdjustment(false);
  setSale(false);
  setPackages(false);
  setInvoices(false);
  setShipments(false);
  setDeliveryChallans(false);
  setPayments(false);
  setSalesReturns(false);
  setCredit(false);
  setBills(false);
  setPaymentsMade(false);
  setPurchaseReceives(false);
  setVendorCredits(false);
  setPurchaseOrders(false);
  setCustomModules(false);
};

const handleGeneral = () => {
  resetSections();
  setGeneral(true);
};

const handleCustomerVendor = () => {
  resetSections();
  setCustomerVendor(true);
};

const handleTransactionNumberSeries = () => {
  resetSections();
  setTransactionNumberSeries(true);
};

const handleItems = () => {
  resetSections();
  setItems(true);
};

const handleInventoryAdjustment = () => {
  resetSections();
  setInventoryAdjustment(true);
};

const handleSale = () => {
  resetSections();
  setSale(true);
};

const handlePackages = () => {
  resetSections();
  setPackages(true);
};

const handleInvoices = () => {
  resetSections();
  setInvoices(true);
};

const handleShipments = () => {
  resetSections();
  setShipments(true);
};

const handleDeliveryChallans = () => {
  resetSections();
  setDeliveryChallans(true);
};

const handlePayments = () => {
  resetSections();
  setPayments(true);
};

const handleSalesReturns = () => {
  resetSections();
  setSalesReturns(true);
};

const handleCredit = () => {
  resetSections();
  setCredit(true);
};

const handleBills = () => {
  resetSections();
  setBills(true);
};

const handlePaymentsMade = () => {
  resetSections();
  setPaymentsMade(true);
};

const handlePurchaseReceives = () => {
  resetSections();
  setPurchaseReceives(true);
};

const handleVendorCredits = () => {
  resetSections();
  setVendorCredits(true);
};

const handlePurchaseOrders = () => {
  resetSections();
  setPurchaseOrders(true);
};

const handleCustomModules = () => {
  resetSections();
  setCustomModules(true);
};

  return (
    <>
      <div className="d-flex flex-row vh-100   bg-light">
        <Sidebar />
            <div>
               <div style={{ height: "100%", width: "300px", overflow: "auto" }}>
                  <Nav variant="pills" className="flex-column px-3" 
                  style ={{ overflow: "auto" ,margin:"7rem 10px",marginBottom:"15rem"}}>
                    <h5 className="px-3">Preferences</h5>
                    <Nav.Link onClick={handleGeneral}>General</Nav.Link>
                    <Nav.Link onClick={handleCustomerVendor}> Customers and Vendors </Nav.Link>
                    <Nav.Link onClick={handleTransactionNumberSeries}>Transaction Number Series</Nav.Link>
                    <hr />
          
                    <h6 className="text-muted px-2">ITEMS</h6>
                    <Nav.Link onClick={handleItems}>Items</Nav.Link>
                    <Nav.Link onClick={handleInventoryAdjustment}>Inventory Adjustments</Nav.Link>
          
                    <h6 className="text-muted px-2 mt-3">SALES</h6>
                    <Nav.Link onClick={handleSale}>Sales Orders</Nav.Link>
                    <Nav.Link onClick={handlePackages}>Packages</Nav.Link>
                    <Nav.Link onClick={handleShipments}>Shipments</Nav.Link>
                    <Nav.Link onClick={handleDeliveryChallans}>Delivery Challans</Nav.Link>
                    <Nav.Link onClick={handleInvoices}>Invoices</Nav.Link>
                    <Nav.Link onClick={handlePayments}> Payments Received</Nav.Link>
                    <Nav.Link onClick={handleSalesReturns}>Sales Returns</Nav.Link>
                    <Nav.Link onClick={handleCredit}>Credit Notes</Nav.Link>
                    <h6 className="text-muted px-2 mt-3">PURCHASES</h6>
                    <Nav.Link onClick={handleBills}>Bills</Nav.Link>
                    <Nav.Link onClick={handlePaymentsMade}>Payments Made</Nav.Link>
                    <Nav.Link onClick={handlePurchaseOrders}>Purchase Orders</Nav.Link>
                    <Nav.Link onClick={handlePurchaseReceives}>Purchase Receive</Nav.Link>
                    <Nav.Link onClick={handleVendorCredits}>Vendor Credits</Nav.Link>
                     <div
                 
                    style={{
                      border: "1px solid black ",
                      padding: "10px",
                      borderRadius: "10px",
                      marginTop: "25px",
                    }}
                  >
                    <h6 className="text-muted   mt-1 font-weight-bold">Custom Modules</h6>
                    <p>
                      You can now create Custom Modules with the required fields to cater
                      to your business needs.
                    </p>
                   <h6 onClick={handleCustomModules} className="text-primary font-weight-bold "
                   style ={{cursor:"pointer"}}>  view more</h6>      
                     
                  
                  </div>
                  </Nav>  
                </div>
            </div>
        <div
          className="flex-grow-1  p-md-1"
          style={{ overflowY: "auto", margin: "6rem 0" }}
        >

      
          <Container fluid className="bg-white  rounded shadow-sm p-4">
            <Row>

              {/* General */}
              {general && (
                <Gereral />
              )}

              {/*Customer and Vendors*/}
              {customerVendor && (
                <CustomerVendor />                
              )}

              {/* Transaction Number Series */} 
              {transactionNumberSeries && (       
               <TransactionNumberSeries />
              )}


              {/* Items */}
              {items && (
                <ItemPerference/>
              )}

              {inventoryAdjustment && (
                <InventoryAdjustment/>          
              )}
              
               {sale && (
                <SalePerferences/>
              )}

              {packages && (
                <Packages/>
              )}

              {shipments && (
                <Shipments/>
              )}
              
              {deliveryChallans && (
                <DeliveryChallans/>
              )}

              {invoices && (
               <Invoices/>
              )}

              {payments && (
                <Payments/>
              )}

              {salesReturns && (
                <SalesReturnsFieldCustomization/>
              )}

              {credit && (
               <Credit/>
              )}

              {bills && (
               <Bills/>
              )}

              {paymentsMade && (
                <PaymentsMade/>
              )}

              {purchaseOrders && (
                <PurchaseOrders/>
              )}

              {purchaseReceives && (
               <PurchaseReceives/>
              )}

              {vendorCredits && (
                <VendorCredits/>
              )}

              {customModules && (
                <CustomModules/>
              )} 
           



            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

const thStyle = {
  padding: "12px",
  backgroundColor: "#f9fafb",
  fontWeight: "bold",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  whiteSpace: "nowrap",
};
const fields = [
  {
    name: "Item Name",
    type: "Text",
    mandatory: "Yes",
    showInPdf: "No",
    status: "Active",
  },
  {
    name: "Price",
    type: "Number",
    mandatory: "Yes",
    showInPdf: "Yes",
    status: "Active",
  },
  // Add more rows as needed
];

export default PreferencesPage;
