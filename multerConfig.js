// // multerConfig.js
// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Specify the uploads folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the file name
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the file name
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    // Validate file type (optional)
    const validTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (validTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Please upload a PDF, JPEG, or PNG file."), false);
    }
  }
});

module.exports = upload;
