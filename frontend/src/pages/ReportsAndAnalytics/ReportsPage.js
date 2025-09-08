import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';

const ReportPage = () => {
  const [chartType, setChartType] = useState('Bar');
  const [timePeriod, setTimePeriod] = useState('Monthly');
  const [region, setRegion] = useState('All');
  const [category, setCategory] = useState('All');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [tableData, setTableData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    fetchReportData();
  }, [timePeriod, region, category]);

  const fetchReportData = async () => {
    try {
      const response = await axios.get('https://api.example.com/report-data', {
        params: { timePeriod, region, category },
      });

      const { chart, table } = response.data;
      setChartData(chart);
      setTableData(table);
    } catch (error) {
      console.error('Error fetching report data:', error);
      alert('Failed to load report data. Please try again later.');
    }
  };

  const handleChartChange = (e) => setChartType(e.target.value);
  const handleTimePeriodChange = (e) => setTimePeriod(e.target.value);
  const handleRegionChange = (e) => setRegion(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const renderChart = () => {
    switch (chartType) {
      case 'Line':
        return <Line data={chartData} options={{ responsive: true }} />;
      case 'Pie':
        return <Pie data={chartData} options={{ responsive: true }} />;
      default:
        return <Bar data={chartData} options={{ responsive: true }} />;
    }
  };

  const handleExport = () => {
    alert('Report data exported successfully!'); // Placeholder for export functionality
  };

  return (
    <div className="merged-report-page">
      <h1 className="page-title">Merged Report and Analytics</h1>

      {/* Filter Controls */}
      <div className="control-section">
        <label>Time Period:</label>
        <select value={timePeriod} onChange={handleTimePeriodChange} className="dropdown">
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>

        <label>Region:</label>
        <select value={region} onChange={handleRegionChange} className="dropdown">
          <option value="All">All</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>

        <label>Category:</label>
        <select value={category} onChange={handleCategoryChange} className="dropdown">
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Groceries">Groceries</option>
        </select>

        <label>Chart Type:</label>
        <select value={chartType} onChange={handleChartChange} className="dropdown">
          <option value="Bar">Bar Chart</option>
          <option value="Line">Line Chart</option>
          <option value="Pie">Pie Chart</option>
        </select>
      </div>

      {/* Chart Section */}
      <div className="chart-container">
        {renderChart()}
      </div>

      {/* Export Button */}
      <button onClick={handleExport} className="export-button">Export Report</button>

      {/* KPI Summary */}
      <div className="kpi-summary">
        <h3>Key Performance Indicators</h3>
        <p>Total Sales: $50,000</p>
        <p>Total Expenses: $30,000</p>
        <p>Net Profit: $20,000</p>
      </div>

      {/* Data Table Section */}
      <table className="data-table">
        <thead>
          <tr>
            <th>Product/Service</th>
            <th>Revenue ($)</th>
            <th>Expenses ($)</th>
            <th>Net Profit ($)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.revenue}</td>
              <td>{row.expenses}</td>
              <td>{row.netProfit}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <style>
        {`
        .merged-report-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.control-section {
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.control-section label {
  font-size: 16px;
  margin-right: 5px;
}

.dropdown {
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.chart-container {
  margin-bottom: 30px;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.export-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
}

.export-button:hover {
  background-color: #0056b3;
}

.kpi-summary {
  background-color: #f1f3f5;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
}

.kpi-summary h3 {
  font-size: 22px;
  margin-bottom: 10px;
}

.kpi-summary p {
  font-size: 16px;
  margin-bottom: 8px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

.data-table th, .data-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.data-table th {
  background-color: #e9ecef;
}

.data-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

`}
      </style>
    </div>
  );
};

export default ReportPage;


