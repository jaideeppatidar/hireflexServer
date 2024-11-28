const multer = require("multer");
const path = require("path");

// Disk storage setup for saving files locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure "uploads" directory exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Initialize multer
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const validTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (validTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Please upload a PDF, JPEG, or PNG file."), false);
    }
  },
});

module.exports = upload;