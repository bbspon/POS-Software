import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const VendorProductPage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', price: 50, stock: 20, category: 'Electronics' },
    { id: 2, name: 'Product B', price: 30, stock: 15, category: 'Clothing' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: '' });
  const [editProductId, setEditProductId] = useState(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category) {
      alert('Please fill in all fields.');
      return;
    }

    if (editProductId) {
      setProducts(products.map(product => (product.id === editProductId ? { ...newProduct, id: editProductId } : product)));
      alert('Product updated successfully!');
    } else {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      alert('Product added successfully!');
    }

    setNewProduct({ name: '', price: '', stock: '', category: '' });
    setEditProductId(null);
    setShowForm(false);
  };

  const handleEditProduct = (product) => {
    setNewProduct(product);
    setEditProductId(product.id);
    setShowForm(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
      alert('Product deleted successfully!');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Vendor Product Management</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by product name..."
        className="form-control mb-3"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Add Product Button */}
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(true)}>Add Product</button>
    
      {/* Product Table */}
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditProduct(product)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Product Form Modal */}
      {showForm && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editProductId ? 'Edit Product' : 'Add New Product'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-2">
                  <label>Product Name</label>
                  <input type="text" name="name" className="form-control" value={newProduct.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-2">
                  <label>Price ($)</label>
                  <input type="number" name="price" className="form-control" value={newProduct.price} onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-2">
                  <label>Stock</label>
                  <input type="number" name="stock" className="form-control" value={newProduct.stock} onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-2">
                  <label>Category</label>
                  <input type="text" name="category" className="form-control" value={newProduct.category} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Close</button>
                <button className="btn btn-success" onClick={handleAddProduct}>
                  {editProductId ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>
        {`
        .modal {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-dialog {
          max-width: 400px;
        }
        `}
      </style>
    </div>
  );
};

export default VendorProductPage;
