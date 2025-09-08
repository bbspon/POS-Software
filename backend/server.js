require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dashboardRoutes = require("./routes/dashboardRoutes");
const physicalInventoryRoutes = require("./routes/physicalInventoryRoutes"); // ✅ Adjust path as needed
const batchRoutes = require("./routes/batchAndExpiryInventoryRoutes"); // path may vary
const orderRoutes = require("./routes/orderinventoryRoutes");
const returnsAndRefundsRoutes = require("./routes/returnsAndRefundsRoutes");
const promotionRoutes = require("./routes/promotionRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const supplierRoutes = require("./routes/supplierManagementRoutes");
const customerRoutes = require("./routes/customerRoutes");
const customerLoyaltyRoutes = require("./routes/customerLoyaltyRoutes");
const userManagementRoutes = require("./routes/userManagementRoutes");
const accountPayableRoutes = require("./routes/accountPayableRoutes");
const accountReceivableRoutes = require("./routes/accountReceivableRoutes");
const budgetPlanningRoutes = require("./routes/budgetPlanningRoutes");
const auditReportRoutes = require("./routes/auditReportRoutes");
const expenseTrackingRoutes = require("./routes/expenseTrackingRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const profitability = require("./routes/profitabilityRoutes");
const taxfillingRoutes = require("./routes/taxfillingRoutes");
const storePosRoutes = require("./routes/storePosRoutes");
const productRoutes = require("./routes/productRoutes");
const hospitalInvoiceRoutes = require("./routes/hospitalInvoiceRoutes");
const pharmacyInvoiceRoutes = require("./routes/pharmacyInvoiceRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ MongoDB URI is missing! Check your .env file.");
  process.exit(1); // Exit the application
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
// API Routes
app.use("/api/dashboard", dashboardRoutes);
const inventoryRoutes = require("./routes/inventoryRoutes");
app.use("/api/inventory", inventoryRoutes);
app.use("/api/physical-inventory", physicalInventoryRoutes); // ✅ Mount here
app.use("/api/batch", batchRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/returns-and-refunds", returnsAndRefundsRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/supplier-orders", supplierRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/customer-loyalty", customerLoyaltyRoutes);
app.use("/api/users", userManagementRoutes);
app.use("/api/payables", accountPayableRoutes);
app.use("/api/receivables", accountReceivableRoutes);
app.use("/api/budget-planning", budgetPlanningRoutes);
app.use("/api/audit-reports", auditReportRoutes);
app.use("/api/expenses", expenseTrackingRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payrolls", payrollRoutes);
app.use("/api/profitability", profitability);
app.use("/api/taxfilling", taxfillingRoutes);
// app.use("/api/store-pos", storePosRoutes);
app.use("/api/sales", storePosRoutes);
app.use("/api/products",productRoutes);
app.use("/api/hospital-invoices", hospitalInvoiceRoutes);
app.use("/api/pharmacy-invoice", pharmacyInvoiceRoutes); // THIS LINE IS CRUCIAL

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/items", require("./routes/itemsRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/subcategories", require("./routes/subcategoryRoutes"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
