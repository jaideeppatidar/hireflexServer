const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const assetSchema = new mongoose.Schema(
  {
   
    assetsId: {
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
    assetType: {
      type: String,
      required: true,
      trim: true,
    },
    dateGiven: {
      type: String,
      required: true,
      default: Date.now,
    },
    estimatedValue: {
      type: Number,
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
      trim: true,
    },
    insuranceDetails: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;
