// src/pages/PrintInvoicePage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function PrintInvoicePage() {
  const { id } = useParams(); // /hospital-invoice/print/:id
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/hospital-invoices/${id}`
        );
        setInvoice(res.data);
        setTimeout(() => window.print(), 800); // Optional auto-print
      } catch (err) {
        console.error("Failed to load invoice", err);
      }
    };
    fetchInvoice();
  }, [id]);

  if (!invoice) return <div className="p-4">Loading...</div>;

  const {
    patient,
    services,
    subtotal,
    gstTotal,
    grandTotal,
    amountDue,
    payments,
  } = invoice;

  return (
    <div
      className="container my-4"
      style={{ fontFamily: "Arial", fontSize: "14px" }}
    >
      <div className="text-center">
        <img src="/logo.png" alt="Logo" height={60} />
        <h3>ABC Multispecialty Hospital</h3>
        <p>123 Health Street, Wellness City, IN - 600001</p>
        <p>GSTIN: 29ABCDE1234F2Z5 | Ph: +91-9876543210</p>
        <hr />
      </div>

      <div className="d-flex justify-content-between mb-3">
        <div>
          <strong>Patient Name:</strong> {patient.name}
          <br />
          <strong>Patient ID:</strong> {patient.id}
          <br />
          <strong>Age / Gender:</strong> {patient.age} / {patient.gender}
          <br />
          <strong>Visit Type:</strong> {invoice.visitType}
        </div>
        <div className="text-end">
          <strong>Invoice No:</strong> {invoice.invoiceNo}
          <br />
          <strong>Date:</strong>{" "}
          {moment(invoice.date).format("DD MMM YYYY, hh:mm A")}
          <br />
          <strong>Doctor:</strong> {invoice.doctor}
          <br />
          <strong>Department:</strong> {invoice.department}
        </div>
      </div>

      <hr />

      <h5>Services Rendered</h5>
      <table className="table table-bordered table-sm mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Service</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>GST %</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s, i) => {
            const base = s.qty * s.rate;
            const gst = (base * s.gst) / 100;
            const total = base + gst;
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{s.name}</td>
                <td>{s.qty}</td>
                <td>₹{s.rate}</td>
                <td>{s.gst || 0}%</td>
                <td>₹{total.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-end">
        <table className="table table-bordered w-50">
          <tbody>
            <tr>
              <th>Subtotal</th>
              <td>₹{subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <th>GST</th>
              <td>₹{gstTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Discount</th>
              <td>₹{invoice.discount.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Insurance Deduction</th>
              <td>₹{invoice.insuranceDeduction.toFixed(2)}</td>
            </tr>
            <tr>
              <th>
                <strong>Grand Total</strong>
              </th>
              <td>
                <strong>₹{grandTotal.toFixed(2)}</strong>
              </td>
            </tr>
            <tr>
              <th>Total Paid</th>
              <td>₹{invoice.totalPaid.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Amount Due</th>
              <td className="text-danger fw-bold">₹{amountDue.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-3">
        <strong>Payment Mode:</strong> {invoice.paymentMode}
        <br />
        <strong>Remarks:</strong> {invoice.billingRemarks || "N/A"}
      </div>

      <div className="text-end mt-4">
        <p>Authorized Signature</p>
      </div>

      <div className="text-center mt-5 text-muted">
        <small>Thank you for choosing ABC Multispecialty Hospital</small>
      </div>
    </div>
  );
}
