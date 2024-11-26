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
    type: Date,
    required: true,
  },
  uploaded: {
    type: String,
    required: true,
    enum: ['YES', 'NO'], 
    default: 'NO',
  },
  documentFile: {
    type: Buffer, 
    required: false,
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'], 
    default: 'PENDING',
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('EmployeeDocument', DocumentSchema);
