const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 600000,
  },
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Please upload an image."));
    }
  },
});

module.exports = { upload };
