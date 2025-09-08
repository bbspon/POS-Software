// backend/controllers/categoryController.js
const getBbsliveCategoryModel = require("../models/BbsliveCategory");

function isAdmin(user) {
  return user && (user.role === "admin" || user.role === "super_admin");
}

function buildPayload(body, user) {
  const payload = {
    name: String(body.name || "").trim(),
    description: body.description || "",
    seller_id: null,
  };

  if (isAdmin(user)) {
    if (body.seller_id && String(body.seller_id).trim().length > 0) {
      payload.seller_id = body.seller_id;
    }
  } else {
    // Vendor scope: require req.user to exist
    if (!user || !user._id) {
      // auth should set req.user; if not, respond 401 in handler below
      return null;
    }
    payload.seller_id = user._id;
  }

  return payload;
}

exports.getAll = async (req, res) => {
  try {
    const Category = getBbsliveCategoryModel();
    const q = String(req.query.q || "").trim();
    const where = {};

    if (!isAdmin(req.user)) {
      if (!req.user || !req.user._id) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      where.$or = [{ seller_id: null }, { seller_id: req.user._id }];
    }

    if (q) where.name = new RegExp(q, "i");

    const list = await Category.find(where).sort({ name: 1 });
    res.json({ success: true, data: list });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.create = async (req, res) => {
  try {
    const Category = getBbsliveCategoryModel();

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const payload = buildPayload(req.body, req.user);
    if (!payload) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!payload.name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    // unique name
    const exists = await Category.findOne({ name: payload.name });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "Category name already exists" });
    }

    const created = await Category.create(payload);
    res.status(201).json({ success: true, data: created });
  } catch (e) {
    // Duplicate key safety net (Mongo 11000)
    if (e?.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Category name already exists" });
    }
    res
      .status(400)
      .json({ success: false, message: e.message || "Bad Request" });
  }
};

exports.update = async (req, res) => {
  try {
    const Category = getBbsliveCategoryModel();
    const id = req.params.id;

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const current = await Category.findById(id);
    if (!current)
      return res.status(404).json({ success: false, message: "Not found" });

    if (!isAdmin(req.user)) {
      const allowed =
        !current.seller_id ||
        String(current.seller_id) === String(req.user._id);
      if (!allowed)
        return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const payload = buildPayload(req.body, req.user);
    if (!payload) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (!payload.name) payload.name = current.name;

    const nameOwnerConflict = await Category.findOne({
      name: payload.name,
      _id: { $ne: id },
    });
    if (nameOwnerConflict) {
      return res
        .status(409)
        .json({ success: false, message: "Category name already exists" });
    }

    const updated = await Category.findByIdAndUpdate(id, payload, {
      new: true,
    });
    res.json({ success: true, data: updated });
  } catch (e) {
    if (e?.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Category name already exists" });
    }
    res
      .status(400)
      .json({ success: false, message: e.message || "Bad Request" });
  }
};

exports.remove = async (req, res) => {
  try {
    const Category = getBbsliveCategoryModel();
    const id = req.params.id;

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const current = await Category.findById(id);
    if (!current)
      return res.status(404).json({ success: false, message: "Not found" });

    if (!isAdmin(req.user)) {
      const allowed =
        !current.seller_id ||
        String(current.seller_id) === String(req.user._id);
      if (!allowed)
        return res.status(403).json({ success: false, message: "Forbidden" });
    }

    await Category.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted" });
  } catch (e) {
    res
      .status(400)
      .json({ success: false, message: e.message || "Bad Request" });
  }
};
