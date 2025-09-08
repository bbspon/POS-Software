// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       minlength: 2,
//       trim: true,
//     },
//     stock: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     status: {
//       type: String,
//       enum: ["In Stock", "Out of Stock", "Low Stock", "Discontinued"],
//       default: "In Stock",
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     regularPrice: {
//       type: Number,
//       required: true,
//     },
//     salePrice: {
//       type: Number,
//       required: true,
//     },
//     imageUrl: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Product", productSchema);
// backend/models/Product.js
const mongoose = require("mongoose");

let cached = { model: null, conn: null };

function getBbsliveConnection() {
  const uri = (process.env.MONGO_URI_BBSLive || "").trim();
  const dbName = process.env.BBSLIVE_DB_NAME || "BBSlive";

  if (uri) {
    if (!cached.conn) {
      cached.conn = mongoose.createConnection(uri, { autoIndex: true });
    }
    return cached.conn;
  }
  // reuse primary connection; switch DB
  return mongoose.connection.useDb(dbName, { useCache: true });
}

module.exports = function getProductModel() {
  if (cached.model) return cached.model;

  const ReviewSchema = new mongoose.Schema(
    {
      rating: { type: Number, min: 0, max: 5 },
      title: String,
      comment: String,
      reviewer: String,
      location: String,
      date: String,
      likes: { type: Number, default: 0 },
      dislikes: { type: Number, default: 0 },
    },
    { _id: false }
  );

  const ProductSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      SKU: { type: String, required: true, trim: true, unique: true },
      brand: { type: String, trim: true },

      priceInfo: {
        mrp: { type: Number, default: 0 },
        sale: { type: Number, default: 0 },
        discountText: { type: String, default: "" },
      },

      category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
      subcategory_id: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },

      stock: { type: Number, default: 0 },
      description: { type: String, default: "" },

      weight: { type: Number, default: 0 },
      dimensions: {
        length: { type: Number, default: 0 },
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
      },

      product_img: { type: String, default: "" },
      gallery_imgs: [{ type: String }],

      tags: [{ type: String, trim: true }],

      is_variant: { type: Boolean, default: false },
      variants: [{ type: mongoose.Schema.Types.Mixed }],

      is_review: { type: Boolean, default: false },
      rating_avg: { type: Number, default: 0 },
      rating_count: { type: Number, default: 0 },
      specs: [{ key: String, value: String }],

      exchangeOffer: { type: String, default: "" },
      gstInvoice: { type: Boolean, default: false },
      deliveryIn1Day: { type: Boolean, default: false },
      assured: { type: Boolean, default: false },
      bestseller: { type: Boolean, default: false },
      ram: { type: Number, default: 0 },

      ui: {
        seller: {
          name: { type: String, default: "" },
          rating: { type: Number, default: 0 },
          reviewsCount: { type: Number, default: 0 },
        },
        offers: [{ type: String }],
        highlights: [{ type: String }],
        colorOptions: [{ name: String, img: String }],
        sizes: [{ type: String }],
        reviews: [ReviewSchema],
        ratingSummary: {
          counts: { type: Map, of: Number, default: {} },
          total: { type: Number, default: 0 },
          avg: { type: Number, default: 0 },
        },
      },

      seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
    },
    { timestamps: true, minimize: false }
  );

  const conn = getBbsliveConnection();
  cached.model = conn.models.Product || conn.model("Product", ProductSchema);
  return cached.model;
};
