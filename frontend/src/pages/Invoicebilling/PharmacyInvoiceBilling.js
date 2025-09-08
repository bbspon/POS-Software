import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  FaPrint,
  FaWhatsapp,
  FaPlus,
  FaTrash,
  FaSave,
  FaFilePdf,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const sampleStock = [
  {
    name: "Paracetamol 500mg",
    batch: "B123",
    expiry: "2026-03",
    mrp: 20,
    availableQty: 100,
    tax: 5,
  },
  {
    name: "Amoxicillin 250mg",
    batch: "A456",
    expiry: "2025-12",
    mrp: 45,
    availableQty: 50,
    tax: 12,
  },
  {
    name: "Ibuprofen 200mg",
    batch: "B789",
    expiry: "2026-06",
    mrp: 30,
    availableQty: 75,
    tax: 10,
  },
  {
    name: "Cetirizine 10mg",
    batch: "A123",
    expiry: "2025-09",
    mrp: 25,
    availableQty: 80,
    tax: 8,
  },
];

const PharmacyInvoiceBilling = ({
    
  invoiceId = "RX-" + Date.now(),
  pharmacyName = "MediPlus Pharmacy",
  address = "123 Health Street, MedCity, IN 400001",
  gstin = "27ABCDE1234F1Z2",
  drugLicenseNo = "MH-123456/2024",
}) => {
  const today = new Date().toISOString().split("T")[0];

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    date: today,
  });
const navigate = useNavigate();
  const [prescriptionId, setPrescriptionId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [items, setItems] = useState([]);
  const [payments, setPayments] = useState({
    cash: 0,
    upi: 0,
    upiId: "",
    card: 0,
    cardNumber: "",
    cheque: 0,
    wallet: 0,
    insurance: 0,
    insuranceAmount: 0,
    insuranceNumber: "",
    insuranceProvider: "",
    discount: 0,
    remarks: "",
  });
  const [totalPaid, setTotalPaid] = useState(0);
  const [due, setDue] = useState(0);

  const upiLink = payments.upiId
    ? `upi://pay?pa=${payments.upiId}&am=${payments.upi}&cu=INR`
    : "#";

  const getSubtotal = () =>
    items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const getTotalTax = () =>
    items.reduce((sum, i) => sum + (i.qty * i.price * i.tax) / 100, 0);

  const getGSTSplit = () => {
    const tax = getTotalTax();
    return { CGST: tax / 2, SGST: tax / 2 };
  };

  const getGrandTotal = () =>
    getSubtotal() + getTotalTax() - (parseFloat(payments.discount) || 0);

  const getPaid = () =>
    (parseFloat(payments.cash) || 0) +
    (parseFloat(payments.upi) || 0) +
    (parseFloat(payments.card) || 0) +
    (parseFloat(payments.cheque) || 0) +
    (parseFloat(payments.wallet) || 0) +
    (parseFloat(payments.insurance) || 0);

  const getPending = () => getGrandTotal() - getPaid();

  useEffect(() => {
    const paid = getPaid();
    setTotalPaid(paid);
    setDue(getGrandTotal() - paid);
  }, [payments, items]);

  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 16);
    setPayments({ ...payments, cardNumber: val });
  };

  const handleProviderChange = (e) => {
    setPayments({
      ...payments,
      insuranceProvider: e.target.value.toUpperCase(),
    });
  };

  const addItem = () => {
    setItems([...items, { name: "", batch: "", qty: 1, price: 0, tax: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] =
      field === "qty" || field === "price" ? parseFloat(value) || 0 : value;

    if (field === "name") {
      const found = sampleStock.find((s) => s.name === value);
      if (found) {
        updated[index].price = found.mrp;
        updated[index].tax = found.tax;
        updated[index].batch = found.batch;
        updated[index].expiry = found.expiry;
      }
    }

    setItems(updated);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

const saveInvoice = async () => {
  const payload = {
    invoiceId,
    date: new Date().toISOString(),
    patient,
    items,
    payments,
    prescriptionId,
    pharmacyName,
    address,
    gstin,
    drugLicenseNo,
    summary: {
      subtotal: getSubtotal(),
      tax: getTotalTax(),
      grandTotal: getGrandTotal(),
      paid: getPaid(),
      pending: getPending(),
    },
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/pharmacy-invoice`,
      payload
    );
    const { savedId } = res.data;
    console.log(savedId);
    
    navigate(`/pharmacy-invoice/print/${savedId}`);
  } catch (err) {
    console.error("Invoice save failed:", err);
    alert("Failed to save invoice. Try again.");
  }
};



  return (
    <div className="container py-4" id="invoice-preview">
      {/* Header */}
      <div className="text-center mb-4">
        <img
          src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-healthcare-medical-center-diagnostic-centre-hospital-and-treatment-service-logo-design-png-image_11080637.png"
          alt="Pharmacy Logo"
          style={{ height: "60px" }}
        />
        <h2 className="mt-2">Pharmacy Invoice</h2>
      </div>

      {/* Top Info */}
      <div className="row mb-3 border-bottom pb-2">
        <div className="col-md-6">
          <p>
            <strong>Invoice No:</strong> {invoiceId}
          </p>
          <p>
            <strong>Date:</strong> {moment().format("DD-MM-YYYY hh:mm A")}
          </p>
          <p>
            <strong>Prescription:</strong> {prescriptionId || "N/A"}
          </p>
        </div>
        <div className="col-md-6 text-md-end">
          <h5>{pharmacyName}</h5>
          <p>{address}</p>
          <p>GSTIN: {gstin}</p>
          <p>DL No: {drugLicenseNo}</p>
        </div>
      </div>

      {/* Patient Info */}
      <div className="card p-4 mb-3 shadow-sm">
        <h5 className="mb-3">👤 Customer Details</h5>
        <div className="row g-3 align-items-center">
          <div className="col-md-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              placeholder="Enter name"
              value={patient.name}
              onChange={(e) => setPatient({ ...patient, name: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Age</label>
            <input
              className="form-control"
              placeholder="Age"
              value={patient.age}
              onChange={(e) => setPatient({ ...patient, age: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              value={patient.gender}
              onChange={(e) =>
                setPatient({ ...patient, gender: e.target.value })
              }
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Mobile</label>
            <input
              className="form-control"
              placeholder="Mobile number"
              value={patient.mobile}
              onChange={(e) =>
                setPatient({ ...patient, mobile: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              placeholder="Email (optional)"
              value={patient.email}
              onChange={(e) =>
                setPatient({ ...patient, email: e.target.value })
              }
            />
          </div>
          <div className="col-md-5">
            <label className="form-label">Address</label>
            <input
              className="form-control"
              placeholder="Customer address"
              value={patient.address}
              onChange={(e) =>
                setPatient({ ...patient, address: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Date of Visit</label>
            <input
              type="date"
              className="form-control"
              value={patient.date}
              onChange={(e) => setPatient({ ...patient, date: e.target.value })}
            />
          </div>
        </div>

        <hr className="my-4" />
        <div className="row g-3 align-items-center">
          <div className="col-md-3">
            <label className="form-label">Prescription ID</label>
            <input
              className="form-control"
              placeholder="e.g. RX202507"
              value={prescriptionId}
              onChange={(e) => setPrescriptionId(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Prescribing Doctor</label>
            <input
              className="form-control"
              placeholder="Doctor's name"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Medicines */}
      <div className="card p-3 mb-3">
        <h6>🧪 Medicines</h6>
        <div className="row fw-bold text-muted mb-2">
          <div className="col-md-3">Medicine Name</div>
          <div className="col-md-1">Qty</div>
          <div className="col-md-1">Price</div>
          <div className="col-md-2">Batch</div>
          <div className="col-md-1">Tax %</div>
          <div className="col-md-1">MRP</div>
          <div className="col-md-1">Expiry</div>
          <div className="col-md-1">Total</div>
          <div className="col-md-1 text-end">Action</div>
        </div>

        {items.map((item, idx) => (
          <div className="row g-2 mb-2" key={idx}>
            <div className="col-md-3">
              <select
                className="form-select"
                value={item.name}
                onChange={(e) => updateItem(idx, "name", e.target.value)}
              >
                <option value="">--Select--</option>
                {sampleStock.map((s, i) => (
                  <option key={i}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-1">
              <input
                type="number"
                className="form-control"
                placeholder="Qty"
                value={item.qty}
                onChange={(e) => updateItem(idx, "qty", e.target.value)}
              />
            </div>
            <div className="col-md-1">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={item.price}
                onChange={(e) => updateItem(idx, "price", e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <input
                className="form-control"
                placeholder="Batch No"
                value={item.batch}
                readOnly
              />
            </div>
            <div className="col-md-1">
              <input
                className="form-control"
                placeholder="Tax %"
                value={item.tax}
                readOnly
              />
            </div>
            <div className="col-md-1">
              <input
                type="number"
                className="form-control"
                placeholder="MRP"
                value={item.mrp || ""}
                onChange={(e) => updateItem(idx, "mrp", e.target.value)}
              />
            </div>
            <div className="col-md-1">
              <input
                type="text"
                className="form-control"
                placeholder="MM/YY"
                value={item.expiry || ""}
                onChange={(e) => updateItem(idx, "expiry", e.target.value)}
              />
            </div>
            <div className="col-md-1 fw-bold d-flex align-items-center">
              ₹{" "}
              {(item.qty * item.price * (1 + (item.tax || 0) / 100)).toFixed(2)}
            </div>
            <div className="col-md-1 text-end">
              <button
                className="btn btn-sm btn-danger"
                onClick={() => removeItem(idx)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        <button className="btn btn-outline-primary mt-2" onClick={addItem}>
          <FaPlus /> Add Medicine
        </button>
      </div>

      {/* Payment */}
   <div className="card p-3 mb-3">
      <h5 className="border-bottom pb-2 mb-3">💰 Payment</h5>
      <div className="row g-2">
        <div className="col-md-3">
          <label className="form-label">Cash</label>
          <input
            type="number"
            className="form-control"
            value={payments.cash}
            onChange={(e) => setPayments({ ...payments, cash: e.target.value })}
            placeholder="Enter cash received"
          />
        </div>

          <div className="col-md-3">
          <label className="form-label">UPI ID</label>
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="e.g. user@upi"
              value={payments.upiId}
              onChange={(e) => setPayments({ ...payments, upiId: e.target.value })}
            />
            <a
              href={upiLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success"
            >
              Pay
            </a>
          </div>
        </div>

          {/* Card */}
    
        <div className="col-md-3">
          <label className="form-label">Card Number</label>
          <input
            className="form-control"
            type="text"
            placeholder="16-digit card number"
            value={payments.cardNumber}
            onChange={handleCardNumberChange}
          />
        </div>
        
               {/* Insurance */}
        <div className="col-md-2">
          <label className="form-label">Insurance Amount</label>
          <input
            className="form-control"
            type="number"
            min="0"
            value={payments.insuranceAmount}
            onChange={(e) => setPayments({ ...payments, insuranceAmount: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Policy Number</label>
          <input
            className="form-control"
            type="text"
            value={payments.insuranceNumber}
            onChange={(e) => setPayments({ ...payments, insuranceNumber: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Provider</label>
          <input
            className="form-control text-uppercase"
            type="text"
            value={payments.insuranceProvider}
            onChange={handleProviderChange}
          />
        </div>

        {/* Discount */}
        <div className="col-md-2">
          <label className="form-label">Discount</label>
          <input
            className="form-control"
            type="number"
            min="0"
            value={payments.discount}
            onChange={(e) => setPayments({ ...payments, discount: e.target.value })}
          />
        </div>

        {/* Due */}
        <div className="col-md-2">
          <label className="form-label">Balance Due</label>
          <input
            className="form-control text-danger fw-bold"
            value={due.toFixed(2)}
            readOnly
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Cheque</label>
          <input
            type="text"
            className="form-control"
            value={payments.cheque}
            onChange={(e) => setPayments({ ...payments, cheque: e.target.value })}
            placeholder="e.g., Cheque No. 1234"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Wallet</label>
          <input
            type="text"
            className="form-control"
            value={payments.wallet}
            onChange={(e) => setPayments({ ...payments, wallet: e.target.value })}
            placeholder="e.g., Paytm/PhonePe"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Insurance</label>
          <input
            type="text"
            className="form-control"
            value={payments.insurance}
            onChange={(e) => setPayments({ ...payments, insurance: e.target.value })}
            placeholder="Policy No. / ₹ Value"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Remarks / Notes</label>
          <input
            type="text"
            className="form-control"
            value={payments.remarks}
            onChange={(e) => setPayments({ ...payments, remarks: e.target.value })}
            placeholder="Any additional notes (e.g., part payment)"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold text-success">Total Paid</label>
          <input
            type="text"
            className="form-control text-success"
            value={totalPaid.toFixed(2)}
            readOnly
          />
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold text-danger">Balance Due</label>
          <input
            type="text"
            className="form-control text-danger"
            value={due.toFixed(2)}
            readOnly
          />
        </div>
      </div>
     

    </div>
      {/* Summary */}
      <div className="card p-3 mb-3">
        <h6>📋 Summary</h6>
        <div className="row">
          <div className="col-md-4">Subtotal</div>
          <div className="col-md-2 fw-bold">₹ {getSubtotal().toFixed(2)}</div>
          <div className="col-md-4">CGST</div>
          <div className="col-md-2 fw-bold">
            ₹ {getGSTSplit().CGST.toFixed(2)}
          </div>
          <div className="col-md-4">SGST</div>
          <div className="col-md-2 fw-bold">
            ₹ {getGSTSplit().SGST.toFixed(2)}
          </div>
          <div className="col-md-4">Grand Total</div>
          <div className="col-md-2 fw-bold">₹ {getGrandTotal().toFixed(2)}</div>
          <div className="col-md-4">Paid</div>
          <div className="col-md-2 fw-bold">₹ {getPaid().toFixed(2)}</div>
          <div className="col-md-4">Pending</div>
          <div className="col-md-2 fw-bold text-danger">
            ₹ {getPending().toFixed(2)}
          </div>
        </div>
      </div>

      {/* QR + Actions */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div className="d-flex gap-2">
          <button className="btn btn-secondary" onClick={saveInvoice}>
            <FaSave /> Save
          </button>
    
        </div>
      </div>
    </div>
  );
};

export default PharmacyInvoiceBilling;
