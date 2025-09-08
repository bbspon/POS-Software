import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StorePOSLandingPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalOrders: 0,
    netSales: 0,
    tax: 0,
  });
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const navigate = useNavigate();

  const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/sales`;

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const res = await axios.get(API_BASE);
      const data = res.data;

      const totalSales = data.reduce((sum, r) => sum + (r.total || 0), 0);
      const netSales = data.reduce((sum, r) => sum + (r.netAmount || 0), 0);
      const tax = data.reduce((sum, r) => sum + (r.tax || 0), 0);

      setSummary({
        totalSales,
        totalOrders: data.length,
        netSales,
        tax,
      });

      const productMap = new Map();
      data.forEach((row) => {
        if (!productMap.has(row.productName)) {
          productMap.set(row.productName, {
            id: row._id,
            name: row.productName,
            price: row.price,
            stock: row.stock,
            thumbnail: "https://via.placeholder.com/100", // or your own image logic
          });
        }
      });
      setProducts([...productMap.values()]);
    } catch (err) {
      console.error("Error loading sales data:", err.message);
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((it) => it.name === product.name);
      return found
        ? prev.map((it) =>
            it.name === product.name ? { ...it, quantity: it.quantity + 1 } : it
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (name) =>
    setCart((c) => c.filter((it) => it.name !== name));

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
  };

  const totals = cart.reduce(
    (acc, it) => {
      acc.sub += it.price * it.quantity;
      return acc;
    },
    { sub: 0 }
  );
  totals.tax = totals.sub * 0.1;
  totals.net = totals.sub + totals.tax - discount;

  const handleSubmit = async () => {
    try {
      for (const it of cart) {
        await axios.post(API_BASE, {
          productName: it.name,
          price: it.price,
          quantity: it.quantity,
          stock: it.stock,
          paymentMethod,
          discount,
          total: totals.sub,
          tax: totals.tax,
          netAmount: totals.net,
          date: new Date(),
          user: "cashier1",
        });
      }
      alert("Payment submitted!");
      clearCart();
      fetchSalesData();
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    }
  };

  const Sidebar = () => {
    const routes = [
      { label: "Dashboard", path: "/" },
      { label: "Products", path: "/ProductsPage" },
      { label: "Orders", path: "/OrdersPage" },
      { label: "Customers", path: "/CustomersPage" },
      { label: "Reports", path: "/StorePOSReports" },
      { label: "Settings", path: "/StorePOSSettingsPage" },
    ];
    return (
      <div className="sidebar">
        <h2>POS Menu</h2>
        <ul>
          {routes.map((route) => (
            <li key={route.path} onClick={() => navigate(route.path)}>
              {route.label}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="pos-container">
      <Sidebar />
      <div className="content">
        <h2>Welcome to the POS Dashboard</h2>

        {/* Summary */}
        <div className="summary-card">
          <h3>Sales Summary</h3>
          <p>Total Sales Today: ${summary.totalSales.toFixed(2)}</p>
          <p>Total Orders: {summary.totalOrders}</p>
          <p>Net Sales: ${summary.netSales.toFixed(2)}</p>
          <p>Total Tax: ${summary.tax.toFixed(2)}</p>
        </div>

        {/* Products */}
        <h3>Products</h3>
        <div className="product-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.thumbnail} alt={p.name} />
              <h4>{p.name}</h4>
              <p>${p.price.toFixed(2)}</p>
              <p>{p.stock} in stock</p>
              <button onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div className="cart-section">
          <h3>Cart</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul>
                {cart.map((it) => (
                  <li key={it.name}>
                    {it.name} × {it.quantity} — $
                    {(it.price * it.quantity).toFixed(2)}{" "}
                    <button onClick={() => removeFromCart(it.name)}>❌</button>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <label>
                  Discount ($):{" "}
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                  />
                </label>
                <p>Total: ${totals.sub.toFixed(2)}</p>
                <p>Tax: ${totals.tax.toFixed(2)}</p>
                <p>
                  <strong>Net: ${totals.net.toFixed(2)}</strong>
                </p>
                <label>
                  Payment Method:
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                  </select>
                </label>
                <button
                  onClick={handleSubmit}
                  className="submit-payment-button"
                >
                  Submit Payment
                </button>
                <button onClick={clearCart} className="clear-cart-button">
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Internal Styles */}
      <style>
        {`
        .pos-container {
          display: flex;
          height: 100vh;
        }

        .sidebar {
          width: 250px;
          background: #343a40;
          color: white;
          padding: 20px;
        }

        .sidebar h2 {
          color: gold;
          margin-bottom: 20px;
          text-align: center;
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
        }

        .sidebar ul li {
          background: #495057;
          margin-bottom: 8px;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        .sidebar ul li:hover {
          background: #6c757d;
        }

        .content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: #f8f9fa;
        }

        .summary-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 15px;
        }

        .product-card {
          background: white;
          padding: 10px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .product-card img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 5px;
        }

        .cart-section {
          background: white;
          margin-top: 30px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .cart-summary input,
        .cart-summary select {
          padding: 5px;
          font-size: 14px;
          margin-left: 8px;
          margin-bottom: 8px;
        }

        .submit-payment-button {
          background: #d22f44;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .clear-cart-button {
          background: #007bff;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          margin-left: 10px;
          cursor: pointer;
        }
        `}
      </style>
    </div>
  );
};

export default StorePOSLandingPage;
