import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

const ReportsPage = () => {
    const [salesData, setSalesData] = useState([]);
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

    useEffect(() => {
        setSalesData([
            { month: 'January', sales: 5000 },
            { month: 'February', sales: 6000 },
            { month: 'March', sales: 4500 },
            { month: 'April', sales: 8000 },
            { month: 'May', sales: 7500 },
        ]);

        setTopSellingProducts([
            { name: 'Apple', quantity: 150 },
            { name: 'Tomato', quantity: 120 },
            { name: 'Milk', quantity: 100 },
            { name: 'Bread', quantity: 90 },
            { name: 'Eggs', quantity: 80 },
        ]);
    }, []);

    const salesChartData = {
        labels: salesData.map(data => data.month),
        datasets: [
            {
                label: 'Monthly Sales ($)',
                data: salesData.map(data => data.sales),
                backgroundColor: '#36A2EB',
                borderColor: '#2176d3',
                borderWidth: 1,
            },
        ],
    };

    const topProductsChartData = {
        labels: topSellingProducts.map(product => product.name),
        datasets: [
            {
                data: topSellingProducts.map(product => product.quantity),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDateRange(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFilterApply = () => {
        alert(`Fetching reports from ${dateRange.startDate} to ${dateRange.endDate}`);
    };

    return (
        <div className="reports-page">
            <h1 className="reports-header">Sales Reports & Analytics</h1>

            <div className="date-filter">
                <label>
                    Start Date:
                    <input type="date" name="startDate" value={dateRange.startDate} onChange={handleDateChange} />
                </label>
                <label>
                    End Date:
                    <input type="date" name="endDate" value={dateRange.endDate} onChange={handleDateChange} />
                </label>
                <button onClick={handleFilterApply}>Apply Filter</button>
            </div>

            <div className="chart-container">
                <h3>Monthly Sales Trends</h3>
                <div className="small-bar-chart">
                    <Bar data={salesChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>

            <div className="top-products-container">
                <h3>Top Selling Products</h3>
                <Pie data={topProductsChartData} options={{ responsive: true }} />
            </div>

            <div className="summary-section">
                <h3>Summary</h3>
                <p>Total Sales This Period: ${salesData.reduce((sum, data) => sum + data.sales, 0)}</p>
                <p>Total Products Sold: {topSellingProducts.reduce((sum, product) => sum + product.quantity, 0)}</p>
            </div>

            <style>
                {`
                .reports-page {
                    padding: 20px;
                    background-color: #f4f4f9;
                }

                .reports-header {
                    font-size: 32px;
                    font-weight: bold;
                    color: #343a40;
                    margin-bottom: 20px;
                }

                .date-filter {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 20px;
                    padding: 10px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .date-filter label {
                    font-size: 16px;
                    font-weight: bold;
                }

                .date-filter input {
                    padding: 5px;
                    font-size: 14px;
                    margin-left: 5px;
                }

                .date-filter button {
                    padding: 8px 15px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 14px;
                    cursor: pointer;
                }

                .date-filter button:hover {
                    background-color: #218838;
                }

                .chart-container {
    margin-bottom: 20px;
    padding: 15px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px; /* Limits the width of the container */
}

.small-bar-chart {
    height: 250px; /* Makes the bar chart smaller */
    width: 100%;
}

.top-products-container {
    padding: 15px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    width: 100%;
    max-width: 400px; /* Smaller pie chart container */
}

.top-products-container canvas {
    max-height: 250px !important; /* Forces pie chart to be smaller */
    max-width: 250px !important;
    margin: auto;
}

.summary-section {
    padding: 15px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 500px;
}

                `}
            </style>
        </div>
    );
};

export default ReportsPage;
