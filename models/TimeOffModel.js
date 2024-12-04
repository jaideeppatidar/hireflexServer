const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const leaveRequestSchema = new Schema({
  timeoffId: {
    type: String,
    default: () => uuidv4(),
    unique: true,
  },
  employeeId: { type: String,required: true },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  partialDays: {
    type: String,
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
    enum: ['PENDING', 'APPROVED', 'REJECTED'], 
    default: 'PENDING',
  },
});
const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);

module.exports = LeaveRequest;
