import React, { useState } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";

const QRScannerV2 = ({ sessionId, scannedBy }) => {
  const [scanResult, setScanResult] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [manualSKU, setManualSKU] = useState("");
  const [fullscreen, setFullscreen] = useState(false);

  const handleScan = async (skuData) => {
    if (!skuData) return;
    setScanResult(skuData);

    try {
      await sendScanToServer(skuData);
    } catch (err) {
      setFeedback(
        "❌ Scan failed: " + (err.response?.data?.error || err.message)
      );
    }
  };
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const sendScanToServer = async (sku) => {
    try {
      const res = await axios.post(`${API_URL}/api/inventory/scan`, {
        sku,
        quantity: 1,
        scannedBy,
        sessionId,
        method: "QR/Manual",
        store: "Main Warehouse",
        location: "Zone A",
      });

      triggerFeedback();
      setFeedback("✅ " + res.data.message);
    } catch (err) {
      throw err;
    }
  };

  const handleManualSubmit = async () => {
    if (!manualSKU) return;
    try {
      await sendScanToServer(manualSKU);
      setManualSKU("");
    } catch (err) {
      setFeedback("❌ Manual scan failed.");
    }
  };

  const triggerFeedback = () => {
    // Sound
    const beep = new Audio("/beep.mp3"); // Place beep.mp3 in public folder
    beep.play();

    // Vibration
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  };

  return (
    <div className={`scanner-wrapper ${fullscreen ? "fullscreen" : ""}`}>
      <div className="scanner-header">
        <h3>📷 QR/Manual Inventory Scanner</h3>
        <button onClick={() => setFullscreen(!fullscreen)}>
          {fullscreen ? "🗕 Exit Fullscreen" : "🗖 Fullscreen"}
        </button>
      </div>

      <QrReader
        delay={300}
        onError={() => setFeedback("❌ Camera Error")}
        onScan={handleScan}
        style={{ width: "100%", maxWidth: "600px" }}
      />

      <div className="manual-input">
        <input
          type="text"
          placeholder="🔍 Enter SKU manually"
          value={manualSKU}
          onChange={(e) => setManualSKU(e.target.value)}
        />
        <button onClick={handleManualSubmit}>Submit</button>
      </div>

      <p>🆔 Last scanned: {scanResult}</p>
      <p>{feedback}</p>

      <style jsx>{`
        .scanner-wrapper {
          padding: 20px;
          border: 2px solid #ccc;
          border-radius: 8px;
        }
        .scanner-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .manual-input {
          margin-top: 10px;
          display: flex;
          gap: 10px;
        }
        .fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 9999;
          padding: 40px;
        }
      `}</style>
    </div>
  );
};

export default QRScannerV2;
