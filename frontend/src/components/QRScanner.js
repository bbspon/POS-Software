import React, { useState } from "react";
import QRScanner from "../components/QRScanner"; // Custom QR Scanner Component

const PaymentHandler = () => {
  const [paymentMethod, setPaymentMethod] = useState(""); // Current payment method
  const [amount, setAmount] = useState(0); // Payment amount
  const [qrResult, setQrResult] = useState(""); // QR Code scan result
  const [showQRScanner, setShowQRScanner] = useState(false); // Toggle QR Scanner visibility

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);

    if (method === "Digital (QR Scanner)") {
      setShowQRScanner(true); // Show QR scanner for digital payments
    } else {
      setShowQRScanner(false); // Hide scanner for other payment methods
    }
  };

  const handleQrPayment = (result) => {
    setQrResult(result); // Save scanned QR code result
    alert(`Digital Payment Successful! Transaction ID: ${result}`);
    setShowQRScanner(false); // Hide scanner after scan
  };

  const processPayment = () => {
    if (!amount || amount <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    switch (paymentMethod) {
      case "Cash":
        alert(`Payment of ₹${amount} accepted in cash.`);
        break;

      case "Card":
        alert(`Processing ₹${amount} via card...`);
        break;

      case "GPay":
        alert(`Redirecting to GPay for ₹${amount} payment.`);
        break;

      case "PayPal":
        alert(`Redirecting to PayPal for ₹${amount} payment.`);
        break;

      case "Bank Transfer":
        alert(`Please initiate a bank transfer for ₹${amount}.`);
        break;

      case "Digital (QR Scanner)":
        if (!qrResult) {
          alert("Please scan the QR Code to complete the payment.");
        } else {
          alert(`Payment of ₹${amount} processed with Transaction ID: ${qrResult}`);
        }
        break;

      default:
        alert("Select a payment method.");
    }
  };

  return (
    <div className="payment-handler-container">
      <h1 className="title">Enhanced Payment Handling</h1>

      <div className="input-group">
        <label htmlFor="amount">Enter Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
        />
      </div>

      <div className="payment-methods">
        <h3>Select Payment Method:</h3>
        <button onClick={() => handlePaymentMethod("Cash")} className="btn cash">
          Cash
        </button>
        <button onClick={() => handlePaymentMethod("Card")} className="btn card">
          Card
        </button>
        <button onClick={() => handlePaymentMethod("GPay")} className="btn gpay">
          GPay
        </button>
        <button onClick={() => handlePaymentMethod("PayPal")} className="btn paypal">
          PayPal
        </button>
        <button onClick={() => handlePaymentMethod("Bank Transfer")} className="btn bank-transfer">
          Bank Transfer
        </button>
        <button onClick={() => handlePaymentMethod("Digital (QR Scanner)")} className="btn digital">
          Digital (QR Scanner)
        </button>
      </div>

      <button onClick={processPayment} className="btn process-payment">
        Process Payment
      </button>

      {showQRScanner && (
        <div className="qr-scanner">
          <h3>Scan QR Code:</h3>
          <QRScanner onScan={(result) => handleQrPayment(result)} />
        </div>
      )}

      {qrResult && (
        <p className="transaction-result">
          Transaction ID: <strong>{qrResult}</strong>
        </p>
      )}


      <style>
        {`
        /* General Container */
.payment-handler-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  color: #333;
  font-size: 1.8em;
  margin-bottom: 20px;
}

/* Input Styles */
.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-size: 1.1em;
  margin-bottom: 5px;
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Payment Method Buttons */
.payment-methods {
  margin-bottom: 20px;
}

.payment-methods h3 {
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #444;
}

.btn {
  display: inline-block;
  padding: 10px 15px;
  font-size: 1em;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  opacity: 0.9;
}

.btn.cash {
  background-color: #4caf50;
  color: white;
}

.btn.card {
  background-color: #007bff;
  color: white;
}

.btn.gpay {
  background-color: #f9a825;
  color: white;
}

.btn.paypal {
  background-color: #009cde;
  color: white;
}

.btn.bank-transfer {
  background-color: #6c757d;
  color: white;
}

.btn.digital {
  background-color: #673ab7;
  color: white;
}

.btn.process-payment {
  background-color: #d9534f;
  color: white;
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
}

/* QR Scanner */
.qr-scanner {
  margin-top: 20px;
  padding: 15px;
  border: 1px dashed #673ab7;
  border-radius: 4px;
  text-align: center;
}

.transaction-result {
  margin-top: 20px;
  font-size: 1.2em;
  color: #4caf50;
  font-weight: bold;
  text-align: center;
}
`}
      </style>
    </div>
  );
};

export default PaymentHandler;













