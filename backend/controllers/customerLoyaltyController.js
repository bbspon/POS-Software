const CustomerLoyalty = require("../models/customerLoyalty");

// GET all with optional filters
exports.getAllCustomerLoyalty = async (req, res) => {
  try {
    const { search, tag, sort } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { customerId: { $regex: search, $options: "i" } },
      ];
    }
    if (tag && tag !== "all") {
      query.tag = tag;
    }

    const sortOrder = sort === "desc" ? -1 : 1;
    const records = await CustomerLoyalty.find(query).sort({
      customerName: sortOrder,
    });

    res.json(records);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching records", error: err.message });
  }
};

// POST
exports.addCustomerLoyalty = async (req, res) => {
  try {
    const newEntry = new CustomerLoyalty(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating record", error: err.message });
  }
};

// PUT
exports.updateCustomerLoyalty = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await CustomerLoyalty.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

// DELETE
exports.deleteCustomerLoyalty = async (req, res) => {
  try {
    const { id } = req.params;
    await CustomerLoyalty.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err.message });
  }
};
