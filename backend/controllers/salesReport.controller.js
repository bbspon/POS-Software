const Sale = require("./sales.model");

exports.dailySalesReport = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalSales: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: -1 } },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.partyWiseReport = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: "$customerName",
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.profitSummary = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.productName",
          totalRevenue: { $sum: "$items.total" },
          quantity: { $sum: "$items.quantity" },
        },
      },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
