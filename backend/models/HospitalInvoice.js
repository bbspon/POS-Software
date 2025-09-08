// models/HospitalInvoice.js
const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: String,
  type: String,
  code: String,
  qty: Number,
  rate: Number,
  discount: Number,
  gst: Number,
  taxType: String,
  free: Boolean,
  remarks: String,
});

const PaymentSchema = new mongoose.Schema({
  cash: Number,
  upiId: String,
  upiAmount: Number,
  cardNumber: String,
  cheque: String,
  wallet: String,
  insuranceAmount: Number,
  insuranceNumber: String,
  insuranceProvider: String,
  discount: Number,
  insurance: String,
  remarks: String,
});

const HospitalInvoiceSchema = new mongoose.Schema(
  {
    invoiceNo: String,
    date: String,

    // Patient Details
    patient: {
      id: String,
      name: String,
      age: Number,
      dob: String,
      gender: String,
      phone: String,
    },

    visitType: String,

    // Visit Details
    doctor: String,
    department: String,
    complaints: String,
    diagnosis: String,
    treatment: String,
    bp: String,
    temperature: String,
    doctorNotes: String,

    // Services
    services: [ServiceSchema],

    // Summary
    subtotal: Number,
    gstTotal: Number,
    discount: Number,
    insuranceDeduction: Number,
    paymentMode: String,
    paymentStatus: String,
    advanceUsed: Number,
    grandTotal: Number,
    amountDue: Number,
    billingRemarks: String,
    pendingAmount: Number,
    pendingStatus: String,

    // Payment
    payments: PaymentSchema,
    totalPaid: Number,
    balanceDue: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("HospitalInvoice", HospitalInvoiceSchema);
