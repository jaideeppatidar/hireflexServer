const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  message: { type: String, required: true },
  sender: { type: String, required: true }, // e.g., 'superadmin' or 'employee'
  recipient: { type: String, required: true }, // e.g., 'superadmin' or employeeId
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MessageAdmin', MessageSchema);
