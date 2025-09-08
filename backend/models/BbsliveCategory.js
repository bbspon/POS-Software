// backend/models/BbsliveCategory.js
const mongoose = require("mongoose");

let cached = { model: null, conn: null };

function getBbsliveConnection() {
  const uri = (process.env.BBSLIVE_MONGO_URI || "").trim();
  const dbName = process.env.BBSLIVE_DB_NAME || "BBSlive";

  if (uri) {
    if (!cached.conn) {
      cached.conn = mongoose.createConnection(uri, { autoIndex: true });
    }
    return cached.conn;
  }
  return mongoose.connection.useDb(dbName, { useCache: true });
}

module.exports = function getBbsliveCategoryModel() {
  if (cached.model) return cached.model;

  const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    ],
  });

  const conn = getBbsliveConnection();
  cached.model =
    conn.models.Category ||
    conn.model("Category", CategorySchema, "categories");
  return cached.model;
};
