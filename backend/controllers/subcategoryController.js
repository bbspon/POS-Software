// backend/controllers/subcategoryController.js
const getBbsliveSubcategoryModel = require("../models/BbsliveSubcategory");

function isAdmin(user) {
  return user && (user.role === "admin" || user.role === "super_admin");
}

function buildPayload(body, user) {
  const payload = {
    name: String(body.name || "").trim(),
    description: body.description || "",
    seller_id: null,
    category_id: body.category_id, // required
  };

  if (isAdmin(user)) {
    if (body.seller_id && String(body.seller_id).trim()) {
      payload.seller_id = body.seller_id;
    }
  } else {
    if (!user || !user._id) return null; // must be authenticated vendor
    payload.seller_id = user._id;
  }

  return payload;
}

// GET /api/subcategories?q=&category_id=
exports.getAll = async (req, res) => {
  try {
    const Subcategory = getBbsliveSubcategoryModel();
    const q = String(req.query.q || "").trim();
    const categoryId = req.query.category_id;
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
    if (categoryId) where.category_id = categoryId;

    const list = await Subcategory.find(where).sort({ name: 1 });
    res.json({ success: true, data: list });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// POST /api/subcategories
exports.create = async (req, res) => {
  try {
    const Subcategory = getBbsliveSubcategoryModel();

    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const payload = buildPayload(req.body, req.user);
    if (!payload)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!payload.name)
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    if (!payload.category_id) {
      return res
        .status(400)
        .json({ success: false, message: "category_id is required" });
    }

    const exists = await Subcategory.findOne({ name: payload.name });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "Subcategory name already exists" });
    }

    const created = await Subcategory.create(payload);
    res.status(201).json({ success: true, data: created });
  } catch (e) {
    if (e?.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Subcategory name already exists" });
    }
    res
      .status(400)
      .json({ success: false, message: e.message || "Bad Request" });
  }
};

// PUT /api/subcategories/:id
exports.update = async (req, res) => {
  try {
    const Subcategory = getBbsliveSubcategoryModel();
    const id = req.params.id;

    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const current = await Subcategory.findById(id);
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
    if (!payload)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!payload.name) payload.name = current.name;
    if (!payload.category_id) payload.category_id = current.category_id;

    const nameConflict = await Subcategory.findOne({
      name: payload.name,
      _id: { $ne: id },
    });
    if (nameConflict) {
      return res
        .status(409)
        .json({ success: false, message: "Subcategory name already exists" });
    }

    const updated = await Subcategory.findByIdAndUpdate(id, payload, {
      new: true,
    });
    res.json({ success: true, data: updated });
  } catch (e) {
    if (e?.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Subcategory name already exists" });
    }
    res
      .status(400)
      .json({ success: false, message: e.message || "Bad Request" });
  }
};

// DELETE /api/subcategories/:id
exports.remove = async (req, res) => {
  try {
    const Subcategory = getBbsliveSubcategoryModel();
    const id = req.params.id;

    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const current = await Subcategory.findById(id);
    if (!current)
      return res.status(404).json({ success: false, message: "Not found" });

    if (!isAdmin(req.user)) {
      const allowed =
        !current.seller_id ||
        String(current.seller_id) === String(req.user._id);
      if (!allowed)
        return res.status(403).json({ success: false, message: "Forbidden" });
    }

    await Subcategory.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted" });
  } catch (e) {
    res
      .status(400)
      .json({ success: false, message: e.message || "Bad Request" });
  }
};
