import React, { useState, useRef } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const FinancialReportPage = () => {
  const [dateRange, setDateRange] = useState('Monthly');
  const reportRef = useRef(); // Reference to capture the report as an image

  // Sample financial summary data
  const financialSummary = {
    totalRevenue: 50000,
    totalExpenses: 35000,
    grossProfit: 15000,
    netProfitMargin: '30%',
    pendingInvoices: 5,
  };

  // Revenue Data for Line Chart
  const revenueData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [10000, 12000, 15000, 13000, 15000],
        borderColor: '#4CAF50',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Expense Breakdown Data for Bar Chart
  const expenseBreakdownData = {
    labels: ['Marketing', 'Operations', 'Salaries', 'Utilities'],
    datasets: [
      {
        label: 'Expenses ($)',
        data: [8000, 10000, 12000, 5000],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  // Handle date range selection
  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  // **Export Report Function (PDF)**
  const exportReport = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4'); // A4 portrait mode
    const element = reportRef.current;

    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0); // Fit image to page width
      pdf.save('Financial_Report.pdf'); // Download the PDF
    }
  };

     // **Export Report as Excel**
  const exportToExcel = () => {
    const worksheetData = [
      ['Financial Report'],
      [],
      ['Total Revenue', financialSummary.totalRevenue],
      ['Total Expenses', financialSummary.totalExpenses],
      ['Gross Profit', financialSummary.grossProfit],
      ['Net Profit Margin', financialSummary.netProfitMargin],
      ['Pending Invoices', financialSummary.pendingInvoices],
      [],
      ['Revenue Trends'],
      ['Month', 'Revenue ($)'],
      ...revenueData.labels.map((month, index) => [month, revenueData.datasets[0].data[index]]),
      [],
      ['Expense Breakdown'],
      ['Category', 'Expense ($)'],
      ...expenseBreakdownData.labels.map((category, index) => [
        category,
        expenseBreakdownData.datasets[0].data[index],
      ]),
    ];

    // Create worksheet and workbook
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Financial Report');

    // Save Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelData, 'Financial_Report.xlsx');
  };


  return (
    <div className="financial-report-page">
      <h1 className="page-title">Financial Reports</h1>

      {/* Wrapper for Export */}
      <div ref={reportRef}>
        {/* Overview Section */}
        <div className="overview-section">
          <div className="overview-card">Total Revenue: ${financialSummary.totalRevenue}</div>
          <div className="overview-card">Total Expenses: ${financialSummary.totalExpenses}</div>
          <div className="overview-card">Gross Profit: ${financialSummary.grossProfit}</div>
          <div className="overview-card">Net Profit Margin: {financialSummary.netProfitMargin}</div>
          <div className="overview-card">Pending Invoices: {financialSummary.pendingInvoices}</div>
        </div>

        {/* Date Range Selection */}
        <div className="date-range-selector">
          <label>Select Date Range: </label>
          <select value={dateRange} onChange={handleDateRangeChange}>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

        {/* Charts Container */}
        <div className="chart-container">
          {/* Revenue Chart - Left Side */}
          <div className="chart-section left-chart">
            <h3>Revenue Trends</h3>
            <Line data={revenueData} options={{ responsive: true }} />
          </div>

          {/* Expense Breakdown Chart - Right Side */}
          <div className="chart-section right-chart">
            <h3>Expense Breakdown</h3>
            <Bar data={expenseBreakdownData} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button className="export-button" onClick={exportReport}>
        Export Report
      </button>
      <button className="export-button excel-button" onClick={exportToExcel}>
          Export as Excel
        </button>
   
      <style>
        {`
        /* Page styling */
.financial-report-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Overview section */
.overview-section {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
}

.overview-card {
  background-color: #f8f9fa;
  padding: 15px 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  flex: 1 1 calc(33% - 10px);
  min-width: 200px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: bold;
}

/* Date range selector */
.date-range-selector {
  margin-bottom: 20px;
}

.date-range-selector label {
  font-size: 16px;
  margin-right: 10px;
}

.date-range-selector select {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

/* Charts layout */
.chart-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap; /* Makes it responsive */
}

.chart-section {
  flex: 1;
  text-align: center;
  max-width: 50%; /* Ensures each chart takes up half the space */
}

/* Smaller size for charts */
.chart-section canvas {
  max-width: 450px;
  max-height: 280px;
  margin: auto;
}

/* Responsive: Stack charts on smaller screens */
@media (max-width: 768px) {
  .chart-container {
    flex-direction: column;
  }
  .chart-section {
    max-width: 100%;
  }
}

/* Export button styling */
.export-button {
  background-color: #007bff;
  color: white;
  padding: 20px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.export-button:hover {
  background-color: #0056b3;
}
  .export-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  
}

.export-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right:20px;
}

.pdf-button {
  background-color: #007bff;
  color: white;
}

.pdf-button:hover {
  background-color: #0056b3;
}

.excel-button {
  background-color: #28a745;
  color: white;
}

.excel-button:hover {
  background-color: #1e7e34;
}

`}
      </style>
    </div>
  );
};

export default FinancialReportPage;
