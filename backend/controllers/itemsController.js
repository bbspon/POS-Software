// const Item = require("../models/Item");

// // normalize helpers
// const toArray = (v) =>
//   Array.isArray(v)
//     ? v
//     : v
//     ? String(v)
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean)
//     : [];
// const toNumber = (v, d = 0) =>
//   v === null || v === undefined || v === "" ? d : Number(v);

// exports.list = async (req, res) => {
//   try {
//     const page = Math.max(1, Number(req.query.page || 1));
//     const limit = Math.max(1, Math.min(50, Number(req.query.limit || 20)));
//     const q = String(req.query.q || "").trim();

//     const where = q
//       ? {
//           $or: [
//             { name: new RegExp(q, "i") },
//             { SKU: new RegExp(q, "i") },
//             { brand: new RegExp(q, "i") },
//             { tags: { $in: [new RegExp(q, "i")] } },
//           ],
//         }
//       : {};

//     const [items, total] = await Promise.all([
//       Item.find(where)
//         .sort({ created_at: -1 })
//         .skip((page - 1) * limit)
//         .limit(limit),
//       Item.countDocuments(where),
//     ]);

//     res.json({
//       success: true,
//       data: items,
//       page,
//       total,
//       pages: Math.ceil(total / limit),
//     });
//   } catch (e) {
//     res.status(500).json({ success: false, message: e.message });
//   }
// };

// exports.getOne = async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     if (!item)
//       return res.status(404).json({ success: false, message: "Not found" });
//     res.json({ success: true, data: item });
//   } catch (e) {
//     res.status(400).json({ success: false, message: e.message });
//   }
// };

// exports.create = async (req, res) => {
//   try {
//     // handle possible multipart fields already parsed by multer
//     const b = { ...req.body };

//     // files
//     if (req.files?.product_img?.[0]) {
//       b.product_img = `/uploads/${req.files.product_img[0].filename}`;
//     }
//     if (req.files?.gallery_imgs?.length) {
//       b.gallery_imgs = req.files.gallery_imgs.map(
//         (f) => `/uploads/${f.filename}`
//       );
//     }

//     // normalize arrays / numbers
//     b.tags = toArray(b.tags);
//     b.gallery_imgs = toArray(b.gallery_imgs);
//     b.is_variant = b.is_variant === "true" || b.is_variant === true;
//     b.is_review = b.is_review === "true" || b.is_review === true;

//     b.gstInvoice = b.gstInvoice === "true" || b.gstInvoice === true;
//     b.deliveryIn1Day = b.deliveryIn1Day === "true" || b.deliveryIn1Day === true;
//     b.assured = b.assured === "true" || b.assured === true;
//     b.bestseller = b.bestseller === "true" || b.bestseller === true;

//     b.price = toNumber(b.price);
//     b.stock = toNumber(b.stock);
//     b.weight = toNumber(b.weight);
//     b.dimensions = {
//       length: toNumber(b.dimensions?.length ?? b.length),
//       width: toNumber(b.dimensions?.width ?? b.width),
//       height: toNumber(b.dimensions?.height ?? b.height),
//     };

//     b.priceInfo = {
//       mrp: toNumber(b.priceInfo?.mrp ?? b.mrp ?? b.price_mrp),
//       sale: toNumber(b.priceInfo?.sale ?? b.sale ?? b.selling_price ?? b.price),
//       discountText: b.priceInfo?.discountText ?? b.discountText ?? "",
//     };

//     // specs from pairs or JSON
//     if (b.specs && typeof b.specs === "string") {
//       try {
//         b.specs = JSON.parse(b.specs);
//       } catch {
//         b.specs = [];
//       }
//     } else if (!Array.isArray(b.specs)) {
//       b.specs = [];
//     }

//     // map UPC/MPN/EAN/ISBN into specs if present
//     [
//       "UPC",
//       "MPN",
//       "EAN",
//       "ISBN",
//       "Unit",
//       "Manufacturer",
//       "PreferredVendor",
//       "InventoryAccount",
//     ].forEach((k) => {
//       if (b[k]) b.specs.push({ key: k, value: b[k] });
//     });

//     // ui normalization
//     if (b.ui && typeof b.ui === "string") {
//       try {
//         b.ui = JSON.parse(b.ui);
//       } catch {
//         b.ui = {};
//       }
//     }
//     b.ui = b.ui || {};
//     b.ui.offers = toArray(b.ui.offers);
//     b.ui.highlights = toArray(b.ui.highlights);
//     b.ui.sizes = toArray(b.ui.sizes);
//     if (b.ui.colorOptions && typeof b.ui.colorOptions === "string") {
//       try {
//         b.ui.colorOptions = JSON.parse(b.ui.colorOptions);
//       } catch {
//         b.ui.colorOptions = [];
//       }
//     }

//     const item = new Item(b);
//     item.computeRatingSummary(); // derive rating summary if ui.reviews provided

//     const saved = await item.save();
//     res.status(201).json({ success: true, data: saved });
//   } catch (e) {
//     res.status(400).json({ success: false, message: e.message });
//   }
// };

// exports.update = async (req, res) => {
//   try {
//     const b = { ...req.body };

//     if (req.files?.product_img?.[0]) {
//       b.product_img = `/uploads/${req.files.product_img[0].filename}`;
//     }
//     if (req.files?.gallery_imgs?.length) {
//       b.gallery_imgs = req.files.gallery_imgs.map(
//         (f) => `/uploads/${f.filename}`
//       );
//     }

//     if (b.tags) b.tags = toArray(b.tags);
//     if (b.gallery_imgs) b.gallery_imgs = toArray(b.gallery_imgs);

//     if (b.priceInfo && typeof b.priceInfo === "string") {
//       try {
//         b.priceInfo = JSON.parse(b.priceInfo);
//       } catch {}
//     }
//     if (b.ui && typeof b.ui === "string") {
//       try {
//         b.ui = JSON.parse(b.ui);
//       } catch {}
//     }

//     const item = await Item.findByIdAndUpdate(req.params.id, b, { new: true });
//     if (!item)
//       return res.status(404).json({ success: false, message: "Not found" });
//     item.computeRatingSummary();
//     await item.save();

//     res.json({ success: true, data: item });
//   } catch (e) {
//     res.status(400).json({ success: false, message: e.message });
//   }
// };

// exports.remove = async (req, res) => {
//   try {
//     const x = await Item.findByIdAndDelete(req.params.id);
//     if (!x)
//       return res.status(404).json({ success: false, message: "Not found" });
//     res.json({ success: true, message: "Deleted" });
//   } catch (e) {
//     res.status(400).json({ success: false, message: e.message });
//   }
// };
// backend/controllers/itemsController.js
const Item = require("../models/Item");
const getProductModel = require("../models/Product");

// normalize helpers
const toArray = (v) =>
  Array.isArray(v)
    ? v
    : v
    ? String(v)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
const toNumber = (v, d = 0) =>
  v === null || v === undefined || v === "" ? d : Number(v);

function mapItemToProductDoc(itemDoc) {
  const it = itemDoc.toObject ? itemDoc.toObject() : itemDoc;

  return {
    name: it.name,
    SKU: it.SKU,
    brand: it.brand || "",

    priceInfo: {
      mrp: Number(it?.priceInfo?.mrp ?? it?.mrp ?? 0),
      sale: Number(it?.priceInfo?.sale ?? it?.sale ?? it?.price ?? 0),
      discountText: String(it?.priceInfo?.discountText ?? it?.discountText ?? ""),
    },

    category_id: it.category_id || null,
    subcategory_id: it.subcategory_id || null,

    stock: Number(it.stock ?? 0),
    description: it.description || "",

    weight: Number(it.weight ?? 0),
    dimensions: {
      length: Number(it?.dimensions?.length ?? 0),
      width: Number(it?.dimensions?.width ?? 0),
      height: Number(it?.dimensions?.height ?? 0),
    },

    product_img: it.product_img || "",
    gallery_imgs: Array.isArray(it.gallery_imgs) ? it.gallery_imgs : toArray(it.gallery_imgs),

    tags: Array.isArray(it.tags) ? it.tags : toArray(it.tags),

    is_variant: !!it.is_variant,
    variants: Array.isArray(it.variants) ? it.variants : [],

    is_review: !!it.is_review,
    rating_avg: Number(it.rating_avg ?? 0),
    rating_count: Number(it.rating_count ?? 0),
    specs: Array.isArray(it.specs) ? it.specs : [],

    exchangeOffer: it.exchangeOffer || "",
    gstInvoice: !!it.gstInvoice,
    deliveryIn1Day: !!it.deliveryIn1Day,
    assured: !!it.assured,
    bestseller: !!it.bestseller,
    ram: Number(it.ram ?? 0),

    ui: it.ui || {},

    seller_id: it.seller_id || null,
  };
}

async function upsertProductFromItem(itemDoc) {
  const Product = getProductModel();
  const data = mapItemToProductDoc(itemDoc);
  if (!data.SKU) return; // guard
  await Product.findOneAndUpdate({ SKU: data.SKU }, { $set: data }, { upsert: true, new: true });
}

async function deleteProductForItem(itemDoc) {
  const Product = getProductModel();
  const it = itemDoc.toObject ? itemDoc.toObject() : itemDoc;
  if (!it?.SKU) return;
  await Product.deleteOne({ SKU: it.SKU });
}

exports.list = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.max(1, Math.min(50, Number(req.query.limit || 20)));
    const q = String(req.query.q || "").trim();

    const where = q
      ? {
          $or: [
            { name: new RegExp(q, "i") },
            { SKU: new RegExp(q, "i") },
            { brand: new RegExp(q, "i") },
            { tags: { $in: [new RegExp(q, "i")] } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      Item.find(where)
        .sort({ created_at: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Item.countDocuments(where),
    ]);

    res.json({
      success: true,
      data: items,
      page,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: item });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

exports.create = async (req, res) => {
  try {
    const b = { ...req.body };

    // files via multer
    if (req.files?.product_img?.[0]) {
      b.product_img = `/uploads/${req.files.product_img[0].filename}`;
    }
    if (req.files?.gallery_imgs?.length) {
      b.gallery_imgs = req.files.gallery_imgs.map((f) => `/uploads/${f.filename}`);
    }

    // normalize
    b.tags = toArray(b.tags);
    b.gallery_imgs = toArray(b.gallery_imgs);
    b.is_variant = b.is_variant === "true" || b.is_variant === true;
    b.is_review = b.is_review === "true" || b.is_review === true;

    b.gstInvoice = b.gstInvoice === "true" || b.gstInvoice === true;
    b.deliveryIn1Day = b.deliveryIn1Day === "true" || b.deliveryIn1Day === true;
    b.assured = b.assured === "true" || b.assured === true;
    b.bestseller = b.bestseller === "true" || b.bestseller === true;

    b.price = toNumber(b.price);
    b.stock = toNumber(b.stock);
    b.weight = toNumber(b.weight);
    b.dimensions = {
      length: toNumber(b.dimensions?.length ?? b.length),
      width: toNumber(b.dimensions?.width ?? b.width),
      height: toNumber(b.dimensions?.height ?? b.height),
    };

    b.priceInfo = {
      mrp: toNumber(b.priceInfo?.mrp ?? b.mrp ?? b.price_mrp),
      sale: toNumber(b.priceInfo?.sale ?? b.sale ?? b.selling_price ?? b.price),
      discountText: b.priceInfo?.discountText ?? b.discountText ?? "",
    };

    if (b.specs && typeof b.specs === "string") {
      try {
        b.specs = JSON.parse(b.specs);
      } catch {
        b.specs = [];
      }
    } else if (!Array.isArray(b.specs)) {
      b.specs = [];
    }

    ["UPC", "MPN", "EAN", "ISBN", "Unit", "Manufacturer", "PreferredVendor", "InventoryAccount"].forEach((k) => {
      if (b[k]) b.specs.push({ key: k, value: b[k] });
    });

    if (b.ui && typeof b.ui === "string") {
      try {
        b.ui = JSON.parse(b.ui);
      } catch {
        b.ui = {};
      }
    }
    b.ui = b.ui || {};
    b.ui.offers = toArray(b.ui.offers);
    b.ui.highlights = toArray(b.ui.highlights);
    b.ui.sizes = toArray(b.ui.sizes);
    if (b.ui.colorOptions && typeof b.ui.colorOptions === "string") {
      try {
        b.ui.colorOptions = JSON.parse(b.ui.colorOptions);
      } catch {
        b.ui.colorOptions = [];
      }
    }

    const item = new Item(b);
    item.computeRatingSummary();
    const saved = await item.save();

    // mirror to BBSlive.products
    await upsertProductFromItem(saved);

    res.status(201).json({ success: true, data: saved });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const b = { ...req.body };

    if (req.files?.product_img?.[0]) {
      b.product_img = `/uploads/${req.files.product_img[0].filename}`;
    }
    if (req.files?.gallery_imgs?.length) {
      b.gallery_imgs = req.files.gallery_imgs.map((f) => `/uploads/${f.filename}`);
    }

    if (b.tags) b.tags = toArray(b.tags);
    if (b.gallery_imgs) b.gallery_imgs = toArray(b.gallery_imgs);

    if (b.priceInfo && typeof b.priceInfo === "string") {
      try {
        b.priceInfo = JSON.parse(b.priceInfo);
      } catch {}
    }
    if (b.ui && typeof b.ui === "string") {
      try {
        b.ui = JSON.parse(b.ui);
      } catch {}
    }

    const item = await Item.findByIdAndUpdate(req.params.id, b, { new: true });
    if (!item) return res.status(404).json({ success: false, message: "Not found" });

    item.computeRatingSummary();
    await item.save();

    // mirror to BBSlive.products
    await upsertProductFromItem(item);

    res.json({ success: true, data: item });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const x = await Item.findByIdAndDelete(req.params.id);
    if (!x) return res.status(404).json({ success: false, message: "Not found" });

    // delete in BBSlive.products by SKU
    await deleteProductForItem(x);

    res.json({ success: true, message: "Deleted" });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
