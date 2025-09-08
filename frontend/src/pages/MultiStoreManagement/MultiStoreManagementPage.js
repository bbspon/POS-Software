import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'; // For store performance chart

const MultiStoreManagementPage = () => {
  // Mock data for stores
  const [stores, setStores] = useState([
    {
      id: 1,
      name: 'Downtown Electronics',
      location: 'Downtown City',
      manager: 'John Doe',
      contact: '123-456-7890',
      products: 500,
      status: 'Active',
      lowStockProducts: 5,
      warehouse: 'Warehouse A',
      lastUpdated: '2025-01-22'
    },
    {
      id: 2,
      name: 'Suburban Grocery',
      location: 'Suburban Area',
      manager: 'Jane Smith',
      contact: '987-654-3210',
      products: 200,
      status: 'Active',
      lowStockProducts: 10,
      warehouse: 'Warehouse B',
      lastUpdated: '2025-01-18'
    }
  ]);

  const [selectedStore, setSelectedStore] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState('Admin'); // Role-based access control

  useEffect(() => {
    // Display low-stock warnings
    const lowStockStores = stores.filter(store => store.lowStockProducts > 0);
    if (lowStockStores.length > 0) {
      alert(`Low-stock alert in stores: ${lowStockStores.map(store => store.name).join(', ')}`);
    }
  }, [stores]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addStore = () => {
    const newStore = {
      id: stores.length + 1,
      name: 'New Store',
      location: 'New City',
      manager: 'Manager Name',
      contact: '123-000-4567',
      products: 0,
      status: 'Active',
      lowStockProducts: 0,
      warehouse: 'New Warehouse',
      lastUpdated: new Date().toISOString().slice(0, 10)
    };
    setStores([...stores, newStore]);
  };

  const handleDelete = (storeId) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      setStores(stores.filter(store => store.id !== storeId));
    }
  };

  const initiateStockTransfer = (storeId) => {
    alert(`Stock transfer initiated for Store ID: ${storeId}`);
  };

  return (
    <div className="multi-store-page">
      <h1 className="page-title">Multi-Store Management</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search Stores..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />

      {/* Admin-only access to add new stores */}
      {role === 'Admin' && (
        <button onClick={addStore} className="add-store-button">
          Add New Store
        </button>
      )}

      {/* Store List Table */}
      <table className="store-table">
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Location</th>
            <th>Manager</th>
            <th>Contact</th>
            <th>Total Products</th>
            <th>Status</th>
            <th>Low-Stock Products</th>
            <th>Warehouse</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map(store => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.location}</td>
              <td>{store.manager}</td>
              <td>{store.contact}</td>
              <td>{store.products}</td>
              <td>{store.status}</td>
              <td className={store.lowStockProducts > 0 ? 'low-stock' : ''}>
                {store.lowStockProducts}
              </td>
              <td>{store.warehouse}</td>
              <td>{store.lastUpdated}</td>
              <td>
                <button onClick={() => initiateStockTransfer(store.id)} className="transfer-button">
                  Transfer Stock
                </button>
                {role === 'Admin' && (
                  <button onClick={() => handleDelete(store.id)} className="delete-button">
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Store Performance Chart */}
      <div className="chart-section">
        <h3>Store Performance Analytics</h3>
        <Bar
          data={{
            labels: stores.map(store => store.name),
            datasets: [
              {
                label: 'Total Products per Store',
                data: stores.map(store => store.products),
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
              }
            ]
          }}
        />
      </div>
      <style>
        {`
        .multi-store-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
}

.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-store-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.add-store-button:hover {
  background-color: #0056b3;
}

.store-table {
  width: 100%;
  border-collapse: collapse;
}

.store-table th, .store-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.low-stock {
  color: red;
  font-weight: bold;
}

.transfer-button {
  background-color: #28a745;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}

.transfer-button:hover {
  background-color: #218838;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
}

.chart-section {
  margin-top: 30px;
  width: 60%; /* Adjusts the width for a medium size */
  max-width: 500px; /* Ensures it doesn't get too large */
  margin-left: auto;
  margin-right: auto;
}

.chart-section canvas {
  width: 70% !important;
  height: 300px !important; /* Sets a medium height */
}

        `}
      </style>
    </div>
  );
};

export default MultiStoreManagementPage;

