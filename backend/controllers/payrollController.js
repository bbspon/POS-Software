const Payroll = require("../models/payroll");

// GET all payroll records
exports.getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find();
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new payroll
exports.createPayroll = async (req, res) => {
  try {
    const { employeeName, salary, benefits = 0, deductions = 0 } = req.body;
    const netPay = salary + benefits - deductions;

    const newPayroll = new Payroll({
      employeeName,
      salary,
      benefits,
      deductions,
      netPay,
    });

    const saved = await newPayroll.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update payroll
exports.updatePayroll = async (req, res) => {
  try {
    const { employeeName, salary, benefits = 0, deductions = 0 } = req.body;
    const netPay = salary + benefits - deductions;

    const updated = await Payroll.findByIdAndUpdate(
      req.params.id,
      { employeeName, salary, benefits, deductions, netPay },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE payroll
exports.deletePayroll = async (req, res) => {
  try {
    await Payroll.findByIdAndDelete(req.params.id);
    res.json({ message: "Payroll deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
