// /backend/controllers/dashboardController.js
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Inventory = require('../models/Inventory');

exports.getDashboardData = async (req, res) => {
  try {
    // Fetch all orders to calculate total sales and orders count
    const orders = await Order.find({});
    const totalSales = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    const totalOrders = orders.length;

    // Count total customers
    const totalCustomers = await Customer.countDocuments();

    // Generate sales chart data (grouped by day)
    const salesChartData = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          dailySales: { $sum: "$totalAmount" },
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Identify low-stock items based on a threshold (e.g., quantity < 10)
    const lowStockThreshold = 10;
    const lowStockItems = await Inventory.find({ quantity: { $lt: lowStockThreshold } });
    const stockAlerts = lowStockItems.map(item => ({
      productName: item.productName,
      quantity: item.quantity,
      batch: item.batch || 'N/A'
    }));

    // Assemble the complete dashboard data
    const dashboardData = {
      totalSales,
      totalOrders,
      totalCustomers,
      salesChartData,
      stockAlerts
    };

    res.json(dashboardData);
  } catch (error) {
    console.error("Error in getDashboardData:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
