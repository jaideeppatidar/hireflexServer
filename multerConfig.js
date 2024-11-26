const multer = require("multer");

const storage = multer.memoryStorage(); // Use memoryStorage instead of diskStorage

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
