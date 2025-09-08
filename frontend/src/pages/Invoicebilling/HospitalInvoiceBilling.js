import React, { useState, useEffect } from "react";
import moment from "moment";
import { FaPlus, FaTrash} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure this is at the top of your file

const taxRates = { Consultation: 0, Lab: 5, Procedure: 12 };

const servicesList = [
  { name: "General Consultation", department: "Consultation", rate: 500 },
  { name: "CBC Test", department: "Lab", rate: 300 },
  { name: "X-Ray Chest", department: "Procedure", rate: 400 },
  { name: "Room Charges (General)", department: "IPD", rate: 1200 },
];

export default function HospitalInvoiceBilling() {
  const navigate = useNavigate();

  const invoiceNo = "INV-" + moment().format("YYYYMMDD-HHmmss");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD HH:mm"));

  const [doctor, setDoctor] = useState("");
  const [department, setDepartment] = useState("");
  const [complaints, setComplaints] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [bp, setBP] = useState("");
  const [temperature, setTemperature] = useState("");
  const [notes, setNotes] = useState("");
  const [discount, setDiscount] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [advanceUsed, setAdvanceUsed] = useState(0);
  const [billingRemarks, setBillingRemarks] = useState("");
  const [pendingAmount, setPendingAmount] = useState(0);
  const [pendingStatus, setPendingStatus] = useState("To Be Collected");

  const [services, setServices] = useState([]);
  const [visitType, setVisitType] = useState("OPD");

  const [patient, setPatient] = useState({
    id: "PTN-" + Date.now().toString().slice(-6),
    name: "",
    age: "",
    dob: "",
    gender: "",
    phone: "",
  });

  const [payments, setPayments] = useState({
    cash: "",
    upi: "",
    card: "",
    cheque: "",
    wallet: "",
    insurance: "",
    remarks: "",
  });

  const calcTotal = () => {
    const subtotal = services.reduce((sum, s) => sum + s.qty * s.rate, 0);
    const gstTotal = services.reduce(
      (sum, s) => sum + (s.qty * s.rate * s.gst) / 100,
      0
    );
    const total = subtotal + gstTotal - discount - insurance;
    return { subtotal, gstTotal, total };
  };

  const { subtotal, gstTotal, total } = calcTotal();
  const grandTotal = total;
  const [totalPaid, setTotalPaid] = useState(0);
  const [due, setDue] = useState(grandTotal);

  useEffect(() => {
    const cash = parseFloat(payments.cash) || 0;
    const upi = parseFloat(payments.upi) || 0;
    const card = parseFloat(payments.card) || 0;
    const cheque = parseFloat(payments.cheque) || 0;
    const wallet = parseFloat(payments.wallet) || 0;
    const insurancePay = parseFloat(payments.insurance) || 0;

    const paid = cash + upi + card + cheque + wallet + insurancePay;
    setTotalPaid(paid);
    setDue(grandTotal - paid);
  }, [payments, grandTotal]);

  const addService = () => {
    setServices([...services, { name: "", qty: 1, rate: 0, gst: 0 }]);
  };

  const updateService = (index, key, value) => {
    const updated = [...services];
    if (key === "name") {
      const match = servicesList.find((s) => s.name === value);
      if (match) {
        updated[index] = {
          ...updated[index],
          name: match.name,
          qty: 1,
          rate: match.rate,
          gst: taxRates[match.department] || 0,
        };
      } else {
        updated[index][key] = value;
      }
    } else {
      updated[index][key] = value;
    }
    setServices(updated);
  };

  const removeService = (index) => {
    const updated = [...services];
    updated.splice(index, 1);
    setServices(updated);
  };

  const handleDOBChange = (dob) => {
    const calculatedAge = moment().diff(moment(dob, "YYYY-MM-DD"), "years");
    setPatient((prev) => ({ ...prev, dob, age: calculatedAge }));
  };

  const handleAgeChange = (age) => {
    const calculatedDOB = moment().subtract(age, "years").format("YYYY-MM-DD");
    setPatient((prev) => ({ ...prev, age, dob: calculatedDOB }));
  };

  const calculateTotal = (s) => {
    if (s.free) return 0;
    const base = s.qty * s.rate;
    const discounted = base - (base * (s.discount || 0)) / 100;
    if (s.taxType === "inclusive") return discounted;
    return discounted * (1 + (s.gst || 0) / 100);
  };
  const upiLink = payments.upiId
    ? `upi://pay?pa=${payments.upiId}&am=${payments.upiAmount}&cu=INR`
    : "#";
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 16);
    setPayments({ ...payments, cardNumber: val });
  };
   const handleProviderChange = (e) => {
    setPayments({ ...payments, insuranceProvider: e.target.value.toUpperCase() });
  };


const handleSave = async () => {
  const payload = {
    invoiceNo,
    date,
    patient,
    visitType,
    doctor,
    department,
    complaints,
    diagnosis,
    treatment,
    bp,
    temperature,
    doctorNotes: notes,
    services,
    subtotal,
    gstTotal,
    discount,
    insuranceDeduction: insurance,
    paymentMode,
    paymentStatus,
    advanceUsed,
    grandTotal: total,
    amountDue: total - advanceUsed,
    billingRemarks,
    pendingAmount,
    pendingStatus,
    payments,
    totalPaid,
    balanceDue: due,
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/hospital-invoices`,
      payload
    );

    const invoice = res.data?.invoice;
    if (invoice && invoice._id) {
      alert("Invoice saved successfully!");
      navigate(`/hospital-invoice/print/${invoice._id}`);
    } else {
      console.error("No invoice ID returned from backend");
      alert("Invoice saved, but no ID received.");
    }
  } catch (error) {
    console.error("Save failed:", error.response?.data || error.message);
    alert("Failed to save invoice. Please try again.");
  }
};

  return (
    <>
      <div className="container  py-5">
        <div className="text-end  ">
          <div>
            <strong>Invoice No:</strong> {invoiceNo}
          </div>
          <div>
            <strong>Date:</strong> {date}
          </div>
        </div>
        {/* Header */}
        <div className="border-bottom pb-3 mb-4">
          <div className="d-flex justify-content-between">
            <h1 className="text-center w-100 mb-1">Hospital Invoice Billing</h1>
          </div>
          <div className="d-flex flex-column text-center  justify-content-between mt-3">
            <div className="w-90">
              <img
                src="/logo.png"
                alt="Hospital Logo"
                height="60"
                className="mb-2 "
              />
              <div>
                <strong>ABC Multispecialty Hospital</strong>
              </div>
              <div>123 Health Street, Wellness City, IN - 600001</div>
              <div>GSTIN: 29ABCDE1234F2Z5 | Ph: +91-9876543210</div>
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="card p-3 mb-3 ">
          <h5 className="border-bottom pb-2 mb-3 text-center">
            🧍 Patient Details
          </h5>
          <div className="row g-3">
            {/* Left Column - 4 Fields */}
            <div className="col-md-6">
              <div className="d-flex flex-column gap-2">
                <div>
                  <label className="form-label">Patient ID</label>
                  <input className="form-control" value={patient.id} readOnly />
                </div>
                <div>
                  <label className="form-label">Patient Name</label>
                  <input
                    className="form-control"
                    value={patient.name}
                    onChange={(e) =>
                      setPatient({ ...patient, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    value={patient.age}
                    onChange={(e) => handleAgeChange(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">DOB</label>
                  <input
                    type="date"
                    className="form-control"
                    value={patient.dob}
                    onChange={(e) => handleDOBChange(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - 3 Fields */}
            <div className="col-md-6">
              <div className="d-flex flex-column gap-2">
                <div>
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
                <div>
                  <label className="form-label">Mobile</label>
                  <input
                    className="form-control"
                    value={patient.phone}
                    onChange={(e) =>
                      setPatient({ ...patient, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Visit Type</label>
                  <select
                    className="form-select"
                    value={visitType}
                    onChange={(e) => setVisitType(e.target.value)}
                  >
                    <option>OPD</option>
                    <option>IPD</option>
                    <option>Emergency</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visit Details */}
        <div className="card p-3 mb-3">
          <h5 className="border-bottom pb-2 mb-3">👨‍⚕️ Visit Details</h5>
          <div className="row g-3">
            {/* Doctor Name */}
            <div className="col-md-6">
              <label className="form-label">Doctor Name</label>
              <input
                className="form-control"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
              />
            </div>

            {/* Date & Time */}
            <div className="col-md-6">
              <label className="form-label">Date & Time</label>
              <input className="form-control" value={date} readOnly />
            </div>

            {/* Department */}
            <div className="col-md-6">
              <label className="form-label">Department</label>
              <select
                className="form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                <option>General Medicine</option>
                <option>Pediatrics</option>
                <option>Orthopedics</option>
                <option>Dermatology</option>
                <option>ENT</option>
                <option>Cardiology</option>
                <option>Gynecology</option>
              </select>
            </div>

            {/* Complaints / Issues */}
            <div className="col-md-6">
              <label className="form-label">Issues / Complaints</label>
              <textarea
                className="form-control"
                rows={2}
                value={complaints}
                onChange={(e) => setComplaints(e.target.value)}
              />
            </div>

            {/* Diagnosis */}
            <div className="col-md-6">
              <label className="form-label">Provisional Diagnosis</label>
              <input
                className="form-control"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </div>

            {/* Treatment Plan */}
            <div className="col-md-6">
              <label className="form-label">Treatment Plan</label>
              <textarea
                className="form-control"
                rows={2}
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
              />
            </div>

            {/* Optional: Vitals */}
            <div className="col-md-3">
              <label className="form-label">Blood Pressure</label>
              <input
                className="form-control"
                value={bp}
                onChange={(e) => setBP(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Temperature (°C)</label>
              <input
                className="form-control"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
            </div>

            {/* Doctor Notes */}
            <div className="col-12">
              <label className="form-label">Doctor's Notes / Remarks</label>
              <textarea
                className="form-control"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Services */}
    <div className="card p-3 mb-3">
  <div className="d-flex justify-content-between align-items-center mb-2">
    <h5 className="border-bottom pb-2 mb-2">🧾 Services Rendered</h5>
    <button className="btn btn-sm btn-success" onClick={addService}>
      <FaPlus /> Add Service
    </button>
  </div>

  {services.map((s, i) => (
    <div className="row g-2 mb-3 border-bottom pb-2" key={i}>

      {/* Service Name */}
      <div className="col-md-3">
        <label className="form-label">Service Name</label>
        <input
          className="form-control"
          list="services"
          value={s.name}
          onChange={(e) => updateService(i, "name", e.target.value)}
        />
        <datalist id="services">
          {servicesList.map((s, idx) => (
            <option key={idx} value={s.name} />
          ))}
        </datalist>
      </div>

      {/* Category */}
      <div className="col-md-2">
        <label className="form-label">Type</label>
        <select
          className="form-select"
          value={s.type}
          onChange={(e) => updateService(i, "type", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Consultation">Consultation</option>
          <option value="Lab Test">Lab Test</option>
          <option value="Procedure">Procedure</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* HSN/SAC */}
      <div className="col-md-2">
        <label className="form-label">HSN/SAC Code</label>
        <input
          className="form-control"
          value={s.code}
          onChange={(e) => updateService(i, "code", e.target.value)}
        />
      </div>

      {/* Qty */}
      <div className="col-md-1">
        <label className="form-label">Qty</label>
        <input
          type="number"
          className="form-control"
          value={s.qty}
          onChange={(e) => updateService(i, "qty", +e.target.value)}
        />
      </div>

      {/* Rate */}
      <div className="col-md-2">
        <label className="form-label">Rate</label>
        <input
          type="number"
          className="form-control"
          value={s.rate}
          onChange={(e) => updateService(i, "rate", +e.target.value)}
        />
      </div>

      {/* Discount (%) */}
      <div className="col-md-1">
        <label className="form-label">Disc %</label>
        <input
          type="number"
          className="form-control"
          value={s.discount}
          onChange={(e) => updateService(i, "discount", +e.target.value)}
        />
      </div>

      {/* GST */}
      <div className="col-md-1">
        <label className="form-label">GST %</label>
        <input
          type="number"
          className="form-control"
          value={s.gst}
          onChange={(e) => updateService(i, "gst", +e.target.value)}
        />
      </div>

      {/* Tax Type */}
      <div className="col-md-2">
        <label className="form-label">Tax Type</label>
        <select
          className="form-select"
          value={s.taxType}
          onChange={(e) => updateService(i, "taxType", e.target.value)}
        >
          <option value="exclusive">Exclusive</option>
          <option value="inclusive">Inclusive</option>
        </select>
      </div>

      {/* Subtotal */}
      <div className="col-md-2">
        <label className="form-label">Total</label>
        <input
          className="form-control"
          readOnly
          value={calculateTotal(s).toFixed(2)}
        />
      </div>

      {/* Free Checkbox */}
      <div className="col-md-1 d-flex align-items-center">
        <div className="form-check mt-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={s.free || false}
            onChange={() => updateService(i, "free", !s.free)}
          />
          <label className="form-check-label">Free</label>
        </div>
      </div>

      {/* Remove */}
      <div className="col-md-1 d-flex align-items-end">
        <button className="btn btn-sm btn-danger" onClick={() => removeService(i)}>
          <FaTrash />
        </button>
      </div>

      {/* Remarks */}
      <div className="col-12">
        <label className="form-label">Remarks</label>
        <input
          className="form-control"
          value={s.remarks}
          onChange={(e) => updateService(i, "remarks", e.target.value)}
        />
      </div>

    </div>
  ))}

  {/* Grand Total Footer */}
  <div className="text-end mt-3">
    <h6>
      💰 <strong>Total Amount:</strong> ₹{" "}
      {services.reduce((sum, s) => sum + calculateTotal(s), 0).toFixed(2)}
    </h6>
  </div>
</div>


        {/* Summary */}
     <div className="card p-3 mb-3">
  <h5 className="border-bottom pb-2 mb-3">📋 Billing Summary</h5>
  <div className="row g-2">
    <div className="col-md-3">
      <label className="form-label">Subtotal</label>
      <input className="form-control" value={subtotal.toFixed(2)} readOnly />
    </div>
    <div className="col-md-3">
      <label className="form-label">GST Total</label>
      <input className="form-control" value={gstTotal.toFixed(2)} readOnly />
    </div>
    <div className="col-md-3">
      <label className="form-label">Discount</label>
      <input
        className="form-control"
        value={discount}
        onChange={(e) => setDiscount(+e.target.value)}
      />
    </div>
    <div className="col-md-3">
      <label className="form-label">Insurance Deduction</label>
      <input
        className="form-control"
        value={insurance}
        onChange={(e) => setInsurance(+e.target.value)}
      />
    </div>
  </div>

  <div className="row g-2 mt-2">
    <div className="col-md-3">
      <label className="form-label">Payment Mode</label>
      <select
        className="form-select"
        value={paymentMode}
        onChange={(e) => setPaymentMode(e.target.value)}
      >
        <option value="">Select</option>
        <option>Cash</option>
        <option>Card</option>
        <option>UPI</option>
        <option>Insurance</option>
        <option>Mixed</option>
      </select>
    </div>
    <div className="col-md-3">
      <label className="form-label">Payment Status</label>
      <select
        className="form-select"
        value={paymentStatus}
        onChange={(e) => setPaymentStatus(e.target.value)}
      >
        <option>Pending</option>
        <option>Paid</option>
        <option>Partially Paid</option>
      </select>
    </div>
    <div className="col-md-3">
      <label className="form-label">Advance Used</label>
      <input
        className="form-control"
        value={advanceUsed}
        onChange={(e) => setAdvanceUsed(+e.target.value)}
      />
    </div>
    <div className="col-md-3">
      <label className="form-label">Amount Due</label>
      <input
        className="form-control fw-bold text-danger"
        value={(total - advanceUsed).toFixed(2)}
        readOnly
      />
    </div>
  </div>

  <div className="row g-2 mt-2">
    <div className="col-md-6">
      <label className="form-label">Remarks / Notes</label>
      <textarea
        className="form-control"
        value={billingRemarks}
        onChange={(e) => setBillingRemarks(e.target.value)}
        placeholder="Any special remarks, payment comments, etc."
      />
    </div>
    <div className="col-md-3">
      <label className="form-label">Grand Total</label>
      <input
        className="form-control fw-bold text-success"
        value={total.toFixed(2)}
        readOnly
      />
    </div>
  </div>

<div className="alert alert-warning mt-4">
  <h6 className="mb-2">🧾 Pending Amount Preview</h6>
  <div className="row">
    <div className="col-md-4">
      <strong>Calculated Pending:</strong>{" "}
      ₹ {(total - advanceUsed).toFixed(2)}
    </div>
    <div className="col-md-4">
      <strong>Adjusted Pending (if any):</strong>{" "}
      ₹ {pendingAmount ? pendingAmount.toFixed(2) : "-"}
    </div>
    <div className="col-md-4">
      <strong>Status:</strong>{" "}
      {pendingStatus || "Not Set"}
    </div>
  </div>
</div>


</div>



        {/* Payments */}
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

        {/* Notes */}
        <div className="card p-3 mb-3">
          <h5 className="border-bottom pb-2 mb-3">🗒️ Remarks / Notes</h5>
          <textarea
            className="form-control"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any special remarks or internal notes..."
          />
        </div>

        {/* Action Buttons */}
    <div className="d-flex gap-2 justify-content-end me-2">

  <button className="btn btn-secondary" onClick={handleSave}>
    Save
  </button>
</div>

      </div>
    </>
  );
}
