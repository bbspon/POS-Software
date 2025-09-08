import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';

const AnalyticsPage = () => {
  const [kpis, setKpis] = useState({
    totalSales: 25000,
    totalProducts: 500,
    lowStockProducts: 25,
    productsSoldToday: 75,
    totalRevenue: 100000,
    topSellingProducts: ['Laptop', 'Mobile Phone', 'Milk']
  });

  useEffect(() => {
    // Fetch KPIs and chart data from backend API (placeholder)
  }, []);

  const salesTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales Trends ($)',
        data: [5000, 7000, 9000, 8000, 10000, 12000],
        borderColor: '#4CAF50',
        fill: false,
        tension: 0.1
      }
    ]
  };

  const productPerformanceData = {
    labels: ['Laptop', 'Mobile Phone', 'Tablet', 'Headphones', 'Smartwatch'],
    datasets: [
      {
        label: 'Units Sold',
        data: [50, 75, 30, 40, 35],
        backgroundColor: ['#2196F3', '#FF5722', '#FFC107', '#4CAF50', '#9C27B0']
      }
    ]
  };

  const categorySalesData = {
    labels: ['Electronics', 'Groceries', 'Clothing', 'Accessories'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC']
      }
    ]
  };

  return (
    <div className="analytics-page">
      <h1 className="page-title">Store Analytics Dashboard</h1>

      {/* KPI Section */}
      <div className="kpi-section">
        <div className="kpi-card">💰 Total Sales: ${kpis.totalSales}</div>
        <div className="kpi-card">📦 Total Products: {kpis.totalProducts}</div>
        <div className="kpi-card">⚠️ Low-Stock Products: {kpis.lowStockProducts}</div>
        <div className="kpi-card">📊 Products Sold Today: {kpis.productsSoldToday}</div>
        <div className="kpi-card">💵 Total Revenue: ${kpis.totalRevenue}</div>
        <div className="kpi-card">🔥 Top Products: {kpis.topSellingProducts.join(', ')}</div>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        {/* Line Chart on Left */}
        <div className="chart-box">
          <h3>Sales Trends</h3>
          <Line data={salesTrendsData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        {/* Bar Chart on Right */}
        <div className="chart-box">
          <h3>Top Product Performance</h3>
          <Bar data={productPerformanceData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

     {/* Pie Charts Side by Side */}
<div className="pie-charts-container">
  {/* Left Pie Chart */}
  <div className="pie-chart-box">
    <h3>Sales by Category</h3>
    <Pie data={categorySalesData} options={{ responsive: true, maintainAspectRatio: false }} />
  </div>

  {/* Right Pie Chart */}
  <div className="pie-chart-box">
    <h3>Customer Sales</h3>
    <Pie data={categorySalesData} options={{ responsive: true, maintainAspectRatio: false }} />
  </div>
</div>

      <style>
        {`
        .analytics-page {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .page-title {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        /* KPI Cards */
        .kpi-section {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }

        .kpi-card {
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          border: 1px solid #ccc;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        /* Charts Container - Side by Side */
        .charts-container {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 30px;
        }

        .chart-box {
          flex: 1;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 48%;
        }

        .chart-box canvas {
          width: 100% !important;
          height: 300px !important;
        }
          /* Container for the pie charts */
.pie-charts-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
}

          /* Styling for each pie chart box */
.pie-chart-box {
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 48%;
}

/* Ensure Pie Chart fits inside the container */
.pie-chart-box canvas {
  width: 100% !important;
  height: 300px !important;
}

/* Responsive: Stack Pie Charts on smaller screens */
@media (max-width: 768px) {
  .pie-charts-container {
    flex-direction: column;
    gap: 15px;
  }

  .pie-chart-box {
    max-width: 100%;
  }
}

        /* Full-width Pie Chart */
        .pie-chart {
          max-width: 600px;
          margin: 0 auto;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .charts-container {
            flex-direction: column;
            gap: 15px;
          }

          .chart-box {
            max-width: 100%;
          }
        }
        `}
      </style>
    </div>
  );
};

export default AnalyticsPage;
