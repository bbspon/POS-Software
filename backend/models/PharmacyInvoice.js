const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  price: Number,
  batch: String,
  tax: Number,
  mrp: Number,
  expiry: String,
  total: Number,
});

const PaymentSchema = new mongoose.Schema({
  cash: Number,
  upiId: String,
  cardNumber: String,
  insuranceAmount: Number,
  policyNumber: String,
  provider: String,
  discount: Number,
  cheque: Number,
  wallet: Number,
  insurance: Number,
  remarks: String,
  totalPaid: Number,
  balanceDue: Number,
});

const PharmacyInvoiceSchema = new mongoose.Schema({
  invoiceId: String,
  date: Date,
  prescriptionId: String,
  pharmacyName: String,
  address: String,
  gstin: String,
  drugLicenseNo: String,
  patient: {
    name: String,
    age: String,
    gender: String,
    mobile: String,
    email: String,
    address: String,
    visitDate: String,
    doctor: String,
  },
  items: [MedicineSchema],
  payments: PaymentSchema,
  summary: {
    subtotal: Number,
    tax: Number,
    grandTotal: Number,
    paid: Number,
    pending: Number,
  },
});

module.exports = mongoose.model("PharmacyInvoice", PharmacyInvoiceSchema);
