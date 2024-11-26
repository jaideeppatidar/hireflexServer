const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    rePassword: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // This should remain unique
    },
    dob: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      required: true,
     
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
