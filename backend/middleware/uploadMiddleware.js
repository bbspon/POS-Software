const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/csv/");
  },
  filename: function (req, file, cb) {
    cb(null, `products-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
