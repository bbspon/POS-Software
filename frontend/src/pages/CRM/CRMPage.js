import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const CRMPage = () => {
  const [feedbackReminder, setFeedbackReminder] = useState('');
  const [role, setRole] = useState('Admin');
  
  const mockCustomers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', segment: 'High-Spender' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', segment: 'Regular' },
  ];
  
  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
      'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Monthly Sales ($)',
        data: [1200, 1900, 3000, 2500, 2700, 3200, 4000, 3500, 3800, 4200, 4500, 5000],
        backgroundColor: 'rgba(68, 196, 196, 0.6)',
      },
    ],
  };

  const aiRecommendations = (customer) => {
    if (customer.segment === 'High-Spender') {
      return ['Exclusive Watch', 'Gold Jewelry Set'];
    } else if (customer.segment === 'Regular') {
      return ['Discounted Shoes', 'Casual T-shirt'];
    }
    return [];
  };

  const searchQuery = '';
  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addCommunicationLog = (message) => {
    setFeedbackReminder('Feedback reminder sent.');
  };

  const redeemLoyaltyPoints = () => {
    alert('50 points redeemed!');
  };

  const syncWithPlatform = () => {
    alert('Data synced with Shopify, WooCommerce, and Amazon.');
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  return (
    <div className="crm-container">
      <div className="customer-profiles">
        <h3 className="section-title">Customer Profiles</h3>
        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Recommendations</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>
                  <ul>
                    {aiRecommendations(customer).map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sales-dashboard">
        <h3 className="section-title">Sales Dashboard</h3>
        <Bar data={salesData} />
        <p>Track monthly sales performance.</p>
      </div>

      <div className="communication-log">
        <h3 className="section-title">Customer Communication</h3>
        <textarea placeholder="Log communication..." className="input-field"></textarea>
        <button onClick={() => addCommunicationLog('Follow-up email sent')} className="btn-primary">
          Send Log
        </button>
        {feedbackReminder && <p className="feedback-message">{feedbackReminder}</p>}
      </div>

      <div className="loyalty-program">
        <h3 className="section-title">Loyalty Program</h3>
        <button onClick={redeemLoyaltyPoints} className="btn-loyalty">
          Redeem 50 Points
        </button>
      </div>

      <div className="sync-platforms">
        <h3 className="section-title">Sync with E-commerce Platforms</h3>
        <button onClick={syncWithPlatform} className="btn-sync">
          Sync Now
        </button>
      </div>

      <div className="role-control">
        {role === 'Admin' ? (
          <div className="role-message">Admin access granted. You have full control.</div>
        ) : (
          <div className="role-message">Sales Rep access granted.</div>
        )}
        <button onClick={() => handleRoleChange('SalesRep')} className="btn-role">
          Switch to SalesRep
        </button>
      </div>

      <style>
        {`
        /* CRMPage CSS */
.crm-container {
  padding: 20px;
  background-color: #f9f9f9;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.customer-profiles, .sales-dashboard, .communication-log, .loyalty-program, .sync-platforms, .role-control {
  margin-bottom: 30px;
}

.customer-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.customer-table th, .customer-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.customer-table th {
  background-color: #f2f2f2;
}

.customer-table ul {
  list-style-type: disc;
  margin-left: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.feedback-message {
  color: #28a745;
}

.btn-primary, .btn-loyalty, .btn-sync, .btn-role {
  padding: 10px 20px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-primary:hover, .btn-loyalty:hover, .btn-sync:hover, .btn-role:hover {
  background-color: #0056b3;
}

.btn-loyalty {
  background-color: #f39c12;
}

.btn-loyalty:hover {
  background-color: #e67e22;
}

.btn-sync {
  background-color: #8e44ad;
}

.btn-sync:hover {
  background-color: #9b59b6;
}

.role-message {
  color: #f39c12;
}

.btn-role {
  background-color: #2ecc71;
}

.btn-role:hover {
  background-color: #27ae60;
}

.sales-dashboard p {
  color: #7f8c8d;
  font-size: 1rem;
}

.sales-dashboard {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 5px;
  max-width: 500px; /* Limit the maximum width */
  margin: 0 auto; /* Center align the component */
}

`}
      </style>
    </div>
  );
};

export default CRMPage;





