import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    product: "",
    stock: "",
    status: "Active",
    category: "",
    price: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API = `${process.env.REACT_APP_API_BASE_URL}/api/products`;
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, form);
      } else {
        await axios.post(API, form);
      }
      fetchProducts();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };
  const handleExportCSV = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/export/csv`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // or your auth token logic
        },
      });

      if (!response.ok) throw new Error("Failed to download CSV");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "products.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("CSV Export Error:", err);
      alert("Failed to export CSV.");
    }
  };

  const handleImportCSV = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/api/products/import/csv`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("CSV Imported successfully!");
        fetchProducts(); // reload product list
      } else {
        alert(`Import failed: ${data.error}`);
      }
    } catch (err) {
      console.error("CSV Import Error:", err);
      alert("Failed to import CSV.");
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm({
      product: "",
      stock: "",
      status: "Active",
      category: "",
      price: "",
    });
    setEditingId(null);
  };

  return (
    <div className="container mt-4">
      <h2>Products Management</h2>
      <div className="mb-3 d-flex justify-content-end gap-2">
        <button className="btn btn-outline-success" onClick={handleExportCSV}>
          Export CSV
        </button>

        <label className="btn btn-outline-primary mb-0">
          Import CSV
          <input type="file" accept=".csv" onChange={handleImportCSV} hidden />
        </label>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              name="product"
              className="form-control"
              placeholder="Product Name"
              value={form.product}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              name="stock"
              className="form-control"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <select
              name="status"
              className="form-select"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Discontinued">Discontinued</option>
            </select>
          </div>

          <div className="col-md-2">
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              {editingId ? "Update" : "Add"}
            </button>
          </div>

          {editingId && (
            <div className="col-md-2">
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-secondary w-100"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Category</th>
            <th>Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.product}</td>
              <td>{p.stock}</td>
              <td>{p.status}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>
                <button
                  onClick={() => handleEdit(p)}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
