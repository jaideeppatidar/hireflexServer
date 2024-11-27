const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const leaveRequestSchema = new Schema({
  timeoffId: {
    type: String,
    default: () => uuidv4(),
    unique: true,
  },
  employeeId: { type: String, unique: true, required: true },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  partialDays: {
    type: Number,
    default: 0,
  },
  reason: {
    type: String,
    required: true,
  },
  type: {
    type: String,

    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
});
const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);

module.exports = LeaveRequest;
