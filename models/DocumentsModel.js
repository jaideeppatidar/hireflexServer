const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");

const DocumentSchema = new mongoose.Schema({
  documentId: {
    type: String,
    default: () => uuidv4(), 
    unique: true,          
  },
  employeeId: {
    type: String,
    required: true,
    trim: true,
  },
  employeeName: {
    type: String,
    required: true,
    trim: true,
  },
  documentName: {
    type: String,
    required: true,
    trim: true,
  },
  uploadDate: {
    type: String,
    required: true,
  },
  image: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'], 
      default: 'Pending',
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('EmployeeDocument', DocumentSchema);
