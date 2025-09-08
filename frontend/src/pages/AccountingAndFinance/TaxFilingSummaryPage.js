import React, { useEffect, useState } from "react";
import axios from "axios";

const TaxFilingSummaryPage = () => {
  const [entries, setEntries] = useState([]);
  const [taxPeriod, setTaxPeriod] = useState("Monthly");

  const token = localStorage.getItem("token");
  const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/taxfilling`;

  const fetchData = async () => {
    try {
      const res = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Derived values
  const totalRevenue = 50000;
  const inputTax = entries
    .filter((e) => e.taxType.toLowerCase().includes("input"))
    .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

  const outputTax = entries
    .filter((e) => e.taxType.toLowerCase().includes("output"))
    .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

  const netTaxPayable = outputTax - inputTax;

  const handleDownload = () => {
    const rows = [
      ["Category", "Tax Type", "Amount"],
      ...entries.map((e) => [e.category, e.taxType, e.amount]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tax_report.csv";
    link.click();
  };

  return (
    <div className="tax-summary-page">
      <h2>Tax Filing Summary</h2>

      <div className="period-filter">
        <label>Select Period:</label>
        <select
          value={taxPeriod}
          onChange={(e) => setTaxPeriod(e.target.value)}
        >
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      <div className="summary-cards">
        <div className="card">
          <h4>Total Revenue</h4>
          <p>${totalRevenue}</p>
        </div>
        <div className="card">
          <h4>Input Tax</h4>
          <p>${inputTax.toFixed(2)}</p>
        </div>
        <div className="card">
          <h4>Output Tax</h4>
          <p>${outputTax.toFixed(2)}</p>
        </div>
        <div className="card">
          <h4>Net Tax Payable</h4>
          <p>${netTaxPayable.toFixed(2)}</p>
        </div>
      </div>

      <button className="download-btn" onClick={handleDownload}>
        ⬇️ Download Tax Report
      </button>

      <table className="tax-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Tax Type</th>
            <th>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.category}</td>
                <td>{entry.taxType}</td>
                <td>{parseFloat(entry.amount).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="history">
        <h3>Filing History</h3>
        <ul>
          <li>Monthly Report - Dec 2024 ✅</li>
          <li>Quarterly Report - Q4 2024 ✅</li>
          <li>Yearly Report - 2024 ⏳</li>
        </ul>
      </div>

      <style>{`
        .tax-summary-page {
          padding: 30px;
          background: #f4f6fa;
          font-family: 'Segoe UI', sans-serif;
          min-height: 100vh;
        }

        h2 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 20px;
        }

        .period-filter {
          text-align: center;
          margin-bottom: 25px;
        }

        .period-filter label {
          margin-right: 10px;
          font-weight: 500;
        }

        .period-filter select {
          padding: 6px 12px;
          font-size: 16px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        .summary-cards {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        .card {
          background: white;
          border-radius: 10px;
          padding: 20px;
          min-width: 200px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: 0.3s ease;
        }

        .card:hover {
          transform: scale(1.03);
        }

        .card h4 {
          color: #34495e;
          margin-bottom: 10px;
        }

        .card p {
          font-size: 20px;
          font-weight: bold;
          color: #2980b9;
        }

        .download-btn {
          background: #2980b9;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: block;
          margin: 0 auto 25px;
          font-weight: 500;
        }

        .download-btn:hover {
          background: #21618c;
        }

        .tax-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }

        .tax-table th, .tax-table td {
          padding: 12px 16px;
          border: 1px solid #ddd;
          text-align: left;
        }

        .tax-table th {
          background-color: #3498db;
          color: white;
        }

        .no-data {
          text-align: center;
          color: gray;
        }

        .history {
          margin-top: 40px;
        }

        .history h3 {
          margin-bottom: 10px;
          text-align: center;
          color: #34495e;
        }

        .history ul {
          list-style: none;
          padding: 0;
          max-width: 400px;
          margin: 0 auto;
        }

        .history li {
          background: #ecf0f1;
          padding: 12px 18px;
          margin-bottom: 10px;
          border-left: 5px solid #2980b9;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default TaxFilingSummaryPage;
