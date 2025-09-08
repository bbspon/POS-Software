// File: PhysicalInventoryPage.js

import React, { useState, useEffect } from "react";
import QRScanner from "../../components/QRScanner"; // Placeholder

const PhysicalInventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [discrepancies, setDiscrepancies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState("Admin"); // Simulated role

  const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/physical-inventory`;


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}`);
      const data = await res.json(); // ← [] here
      console.log(data, "data");

      setProducts(data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };

  const handleProductScan = async (scannedProduct) => {
    try {
      const response = await fetch(`${API_BASE}/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scannedProduct),
      });
      const updated = await response.json();
      fetchProducts();
    } catch (err) {
      console.error("Scan failed:", err);
    }
  };

  const handleStockReconciliation = async (productId) => {
    try {
      await fetch(`${API_BASE}/reconcile/${productId}`, { method: "PUT" });
      fetchProducts();
      alert("Reconciled successfully");
    } catch (err) {
      console.error("Reconciliation error:", err);
    }
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const filtered = products.filter((p) => {
    const name = (p?.productName || "").toLowerCase();
    const sku = (p?.sku || p?.SKU || "").toLowerCase(); // handle both cases
    return (
      name.includes(searchQuery.toLowerCase()) ||
      sku.includes(searchQuery.toLowerCase())
    );
  });

  useEffect(() => {
    const filteredDiscrepancies = products.filter(
      (p) => p.scannedQty !== 0 && p.scannedQty !== p.systemQty
    );
    setDiscrepancies(filteredDiscrepancies);
  }, [products]);

  return (
    <div className="physical-inventory-page">
      <h1 className="page-title">Physical Inventory Management</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search..."
        className="search-bar"
      />
      <QRScanner onProductScanned={handleProductScan} />
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>System Qty</th>
            <th>Scanned Qty</th>
            <th>Status</th>
            <th>Last Scanned</th>
            <th>Store</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((product) => (
            <tr key={product._id}>
              <td>{product.productName}</td> {/* ✅ FIXED */}
              <td>{product.sku}</td>
              <td>{product.systemQty}</td> {/* ✅ FIXED */}
              <td>{product.scannedQty}</td> {/* ✅ FIXED */}
              <td
                className={
                  product.status === "Mismatch" ? "discrepancy" : "matched"
                }
              >
                {product.status}
              </td>
              <td>{product.lastScanned || "Not Scanned"}</td>
              <td>{product.store}</td>
              <td>
                {product.status === "Mismatch" && role === "Admin" && (
                  <button
                    onClick={() => handleStockReconciliation(product._id)}
                    className="reconcile-button"
                  >
                    Reconcile
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {discrepancies.length > 0 && (
        <div className="discrepancy-section">
          <h3>Discrepancies Detected</h3>
          <ul>
            {discrepancies.map((p) => (
              <li key={p._id}>
                <li key={p._id}>
                  {p.productName} (System: {p.systemQty}, Scanned:{" "}
                  {p.scannedQty})
                </li>
              </li>
            ))}
          </ul>
        </div>
      )}
      {role === "Admin" && (
        <button
          className="audit-report-button"
          onClick={() => alert("Generating report...")}
        >
          Generate Audit Report
        </button>
      )}
      <style>
        {`
        .physical-inventory-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.inventory-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.inventory-table th, .inventory-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.discrepancy {
  color: red;
  font-weight: bold;
}

.matched {
  color: green;
  font-weight: bold;
}

.reconcile-button {
  background-color: #28a745;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reconcile-button:hover {
  background-color: #218838;
}

.discrepancy-section {
  background-color: #fff3cd;
  padding: 15px;
  border: 1px solid #ffeeba;
  border-radius: 5px;
}

.discrepancy-section h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.audit-report-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.audit-report-button:hover {
  background-color: #0056b3;
}`}
      </style>{" "}
    </div>
  );
};

export default PhysicalInventoryPage;
