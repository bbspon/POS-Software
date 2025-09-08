// backend/models/BbsliveSubcategory.js
const mongoose = require("mongoose");

let cached = { model: null, conn: null };

function getBbsliveConnection() {
  const uri = (process.env.BBSLIVE_MONGO_URI || "").trim();
  const dbName = process.env.BBSLIVE_DB_NAME || "BBSlive";
  if (uri) {
    if (!cached.conn)
      cached.conn = mongoose.createConnection(uri, { autoIndex: true });
    return cached.conn;
  }
  return mongoose.connection.useDb(dbName, { useCache: true });
}

module.exports = function getBbsliveSubcategoryModel() {
  if (cached.model) return cached.model;

  // Matches your provided attributes
  // name (unique), description, seller_id, category_id
  const SubcategorySchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true, trim: true },
      description: { type: String, default: "" },
      seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    },
    { timestamps: true, collection: "subcategories" }
  );

  const conn = getBbsliveConnection();
  cached.model =
    conn.models.Subcategory || conn.model("Subcategory", SubcategorySchema);
  return cached.model;
};
