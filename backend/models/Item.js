const mongoose = require("mongoose");

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

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    SKU: { type: String, required: true, trim: true, unique: true },
    brand: { type: String, trim: true },

    price: { type: Number, default: 0 }, // kept for compatibility
    priceInfo: {
      mrp: { type: Number, default: 0 },
      sale: { type: Number, default: 0 },
      discountText: { type: String, default: "" },
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },

    stock: { type: Number, default: 0 },
    description: { type: String, default: "" },

    weight: { type: Number, default: 0 },
    dimensions: {
      length: { type: Number, default: 0 },
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
    },

    product_img: { type: String, default: "" }, // URL or relative path
    gallery_imgs: [{ type: String }],

    tags: [{ type: String, trim: true }],

    is_variant: { type: Boolean, default: false },
    variants: [{ type: mongoose.Schema.Types.Mixed }], // keep flexible

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
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    minimize: false,
  }
);

// helper: recompute rating summary from reviews if present
ItemSchema.methods.computeRatingSummary = function () {
  if (
    !this.ui ||
    !Array.isArray(this.ui.reviews) ||
    this.ui.reviews.length === 0
  )
    return;

  const counts = new Map([
    ["1", 0],
    ["2", 0],
    ["3", 0],
    ["4", 0],
    ["5", 0],
  ]);
  let sum = 0;
  this.ui.reviews.forEach((r) => {
    const k = String(Math.round(r.rating || 0));
    counts.set(k, (counts.get(k) || 0) + 1);
    sum += Number(r.rating || 0);
  });
  const total = this.ui.reviews.length;
  const avg = total ? Number((sum / total).toFixed(1)) : 0;

  this.ui.ratingSummary = { counts, total, avg };
  this.rating_avg = avg;
  this.rating_count = total;
};

module.exports = mongoose.model("Item", ItemSchema);
