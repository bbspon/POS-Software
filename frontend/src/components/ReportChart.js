import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';

const ReportChartPage = () => {
  const [chartType, setChartType] = useState('Bar');
  const [timePeriod, setTimePeriod] = useState('Monthly');
  const [region, setRegion] = useState('All');
  const [category, setCategory] = useState('All');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Fetch data from API based on selected filters
  useEffect(() => {
    fetchChartData();
  }, [timePeriod, region, category]);

  const fetchChartData = async () => {
    try {
      const response = await axios.get('https://api.example.com/chart-data', {
        params: { timePeriod, region, category },
      });

      const { labels, datasets } = response.data;
      setChartData({ labels, datasets });
    } catch (error) {
      console.error('Error fetching chart data:', error);
      alert('Failed to load chart data. Please try again later.');
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
    alert('Chart data exported successfully!'); // Placeholder for export functionality
  };

  return (
    <div className="report-chart-page">
      <h1 className="page-title">Report and Analytics</h1>

      {/* Time Period Selector */}
      <div className="control-section">
        <label>Time Period:</label>
        <select value={timePeriod} onChange={handleTimePeriodChange} className="dropdown">
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      {/* Region Filter */}
      <div className="control-section">
        <label>Region:</label>
        <select value={region} onChange={handleRegionChange} className="dropdown">
          <option value="All">All</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="control-section">
        <label>Category:</label>
        <select value={category} onChange={handleCategoryChange} className="dropdown">
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Groceries">Groceries</option>
        </select>
      </div>

      {/* Chart Type Selector */}
      <div className="control-section">
        <label>Chart Type:</label>
        <select value={chartType} onChange={handleChartChange} className="dropdown">
          <option value="Bar">Bar Chart</option>
          <option value="Line">Line Chart</option>
          <option value="Pie">Pie Chart</option>
        </select>
      </div>

      {/* Dynamic Chart Display */}
      <div className="chart-container">
        {renderChart()}
      </div>

      {/* Export Button */}
      <button onClick={handleExport} className="export-button">Export Data</button>

      {/* KPI Summary */}
      <div className="kpi-summary">
        <h3>Key Performance Indicators</h3>
        <p>Total Sales: $50,000</p>
        <p>Total Expenses: $30,000</p>
        <p>Net Profit: $20,000</p>
      </div>

      <style>
        {`
        .report-chart-page {
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
}

.control-section label {
  font-size: 16px;
  margin-right: 10px;
}

.dropdown {
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.chart-container {
  margin-bottom: 30px;
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
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.kpi-summary h3 {
  font-size: 22px;
  margin-bottom: 10px;
}

.kpi-summary p {
  font-size: 16px;
  margin-bottom: 8px;
}
`}
      </style>
    </div>
  );
};

export default ReportChartPage;


