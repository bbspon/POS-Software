import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PrintPharmacyInvoicePage = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/pharmacy-invoice/${id}`
        );
        const data = await res.json();
        setInvoice(data);
      } catch (err) {
        console.error("Error fetching invoice:", err);
      }
    };

    fetchInvoice();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!invoice) return <p>Loading invoice...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Pharmacy Invoice</h2>
      <p>
        <strong>Invoice ID:</strong> {invoice.invoiceId}
      </p>
      <p>
        <strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Patient:</strong> {invoice.patient?.name}
      </p>
      <hr />
      <h4>Items:</h4>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>MRP</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.mrp}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />
      <p>
        <strong>Subtotal:</strong> ₹{invoice.summary.subtotal}
      </p>
      <p>
        <strong>Tax:</strong> ₹{invoice.summary.tax}
      </p>
      <p>
        <strong>Grand Total:</strong> ₹{invoice.summary.grandTotal}
      </p>
      <p>
        <strong>Paid:</strong> ₹{invoice.summary.paid}
      </p>
      <p>
        <strong>Pending:</strong> ₹{invoice.summary.pending}
      </p>

      <br />
      <button onClick={handlePrint}>🖨️ Print Invoice</button>
    </div>
  );
};

export default PrintPharmacyInvoicePage;
