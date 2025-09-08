import React, { useEffect, useState } from "react";

const CompliancePage = () => {
  const [compliances, setCompliances] = useState([]);
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  // Fetch compliance data from backend API
  useEffect(() => {
    fetch(`${API_URL}/api/compliance`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setCompliances(data))
      .catch((error) => console.error("Error fetching compliances:", error));
  }, []);

  return (
    <div className="compliance-container">
      <h2>Customer Compliance Records</h2>

      {compliances.length === 0 ? (
        <p className="no-data">No compliances found.</p>
      ) : (
        <table className="compliance-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Issue Type</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {compliances.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.customerName}</td>
                <td>{complaint.issueType}</td>
                <td>{complaint.description}</td>
                <td>
                  <span
                    className={`status ${
                      complaint.status === "Pending" ? "pending" : "resolved"
                    }`}
                  >
                    {complaint.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style>
        {`
        .compliance-container {
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

.compliance-container h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.compliance-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.compliance-table th,
.compliance-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.compliance-table th {
  background-color: #007bff;
  color: white;
}

.compliance-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.status {
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
}

.pending {
  background-color: #ffcc00;
  color: black;
}

.resolved {
  background-color: #28a745;
  color: white;
}

.no-data {
  font-size: 18px;
  color: #888;
  margin-top: 20px;
}
`}
      </style>
    </div>
  );
};

export default CompliancePage;
