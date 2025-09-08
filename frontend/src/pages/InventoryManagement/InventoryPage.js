import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import { CSVLink } from "react-csv";
import EditProductModal from "../../components/EditProductModal";
import AddProductModal from "../../components/AddProductModal";

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, search, category, supplier, warehouse, page]);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/inventory`);

      console.log(res.data, "response");

      // 🛠️ Convert backend keys to camelCase
      const formatted = res.data.map((item) => ({
        productName: item["Product Name"],
        sku: item["SKU"],
        category: item["Category"],
        stock: item["Stock"],
        price: item["Price"],
        supplier: item["Supplier"],
        warehouse: item["Warehouse"],
        _id: item["_id"],
      }));

      setProducts(formatted);
    } catch (err) {
      console.error("Fetch Error", err);
      setProducts([]);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.productName.toLowerCase().includes(search.toLowerCase()) ||
          p.sku.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) filtered = filtered.filter((p) => p.category === category);
    if (supplier) filtered = filtered.filter((p) => p.supplier === supplier);
    if (warehouse) filtered = filtered.filter((p) => p.warehouse === warehouse);

    const startIndex = (page - 1) * itemsPerPage;
    setDisplayed(filtered.slice(startIndex, startIndex + itemsPerPage));
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const uniqueValues = (key) =>
    [...new Set(products.map((p) => p[key]))].filter(Boolean);

  const restock = async (productId) => {
    const qty = parseInt(prompt("Enter quantity to restock:"));
    if (isNaN(qty) || qty <= 0) {
      alert("Invalid quantity!");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/inventory/restock/${productId}`,
        {
          quantity: qty,
        }
      );
      alert("Restocked successfully");
      fetchInventory(); // refresh product list
    } catch (error) {
      console.error("Restock failed:", error);
      alert("Failed to restock: " + error.message);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };
  const handleProductAdd = async (newProduct) => {
    try {
      await axios.post(`${API_URL}/api/inventory`, {
        "Product Name": newProduct.productName,
        SKU: newProduct.sku,
        Category: newProduct.category,
        Stock: newProduct.stock,
        Price: newProduct.price,
        Supplier: newProduct.supplier,
        Warehouse: newProduct.warehouse,
      });
      fetchInventory();
      setShowAddModal(false);
    } catch (error) {
      console.error("Add product failed:", error);
      alert("Failed to add product");
    }
  };

  const handleEditSave = async (updatedProduct) => {
    console.log(updatedProduct._id, "id");

    try {
      await axios.put(
        `${API_URL}/api/inventory/${updatedProduct._id}`,
        updatedProduct
      );
      fetchInventory();
      setShowEditModal(false);
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };
  const handleDeduct = async (productId) => {
    const qty = prompt("Enter quantity to deduct:");
    if (!qty || isNaN(qty) || qty <= 0) return alert("Invalid quantity");

    try {
      const res = await axios.put(
        `${API_URL}/api/inventory/deduct/${productId}`,
        {
          quantity: qty,
        }
      );
      alert("Stock deducted successfully!");
      fetchInventory(); // refresh list
    } catch (err) {
      console.error("Deduct failed:", err);
      alert("Failed to deduct: " + err.response?.data?.message || err.message);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      await axios.delete(`${API_URL}/api/inventory/${id}`);
      fetchInventory();
    }
  };

  const csvData = displayed.map((p) => ({
    SKU: p.sku,
    Name: p.productName,
    Category: p.category,
    Stock: p.stock,
    Price: p.price,
    Supplier: p.supplier,
    Warehouse: p.warehouse,
  }));

  return (
    <div className="container mt-4">
      <h2>Inventory Management</h2>

      <Row className="my-3">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Search by name or SKU"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Select onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {uniqueValues("category").map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select onChange={(e) => setSupplier(e.target.value)}>
            <option value="">All Suppliers</option>
            {uniqueValues("supplier").map((sup) => (
              <option key={sup}>{sup}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select onChange={(e) => setWarehouse(e.target.value)}>
            <option value="">All Warehouses</option>
            {uniqueValues("warehouse").map((w) => (
              <option key={w}>{w}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3} className="text-end">
          <CSVLink data={csvData} filename="inventory.csv">
            <Button variant="success">Export CSV</Button>
          </CSVLink>
        </Col>
      </Row>
      <Button
        variant="success"
        onClick={() => setShowAddModal(true)}
        className="mb-4"
      >
        Add New Product
      </Button>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>SKU</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Supplier</th>
            <th>Warehouse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayed.map((product, index) => (
            <tr key={product._id}>
              <td>{(page - 1) * itemsPerPage + index + 1}</td>
              <td>{product.sku}</td>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td style={{ color: product.stock <= 5 ? "red" : "black" }}>
                {product.stock}
              </td>
              <td>₹{product.price}</td>
              <td>{product.supplier}</td>
              <td>{product.warehouse}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => restock(product._id)}
                >
                  Restock
                </Button>{" "}
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleDeduct(product._id)}
                >
                  Deduct
                </Button>{" "}
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showEditModal && selectedProduct && (
        <EditProductModal
          show={showEditModal}
          product={selectedProduct}
          onHide={() => setShowEditModal(false)}
          onSave={handleEditSave}
        />
      )}

      {showAddModal && (
        <AddProductModal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          onSave={handleProductAdd}
        />
      )}

      <div className="text-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
          <Button
            key={pg}
            variant={pg === page ? "primary" : "light"}
            onClick={() => setPage(pg)}
            className="me-1"
          >
            {pg}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
