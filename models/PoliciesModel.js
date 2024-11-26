const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const policySchema = new mongoose.Schema({
  policiesId: {
    type: String,
    default: () => uuidv4(), 
    unique: true,          
  },
  policyName: {
    type: String,
    required: true,
    trim: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  current: {
    type: Boolean,
    required: true,
    default: false,
  },
  file: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
});

const Policy = mongoose.model("Policy", policySchema);

module.exports = Policy;
