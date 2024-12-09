const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const timesheetSchema = new Schema(
  {
    timesheetId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    employeeId: {
      type: String,
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    inDate: {
      type: String,
      required: true,
    },
    inTimeHH: {
      type: Number,
      required: true,
    },
    inTimeMM: {
      type: Number,
      required: true,
    },
    inPeriod: {
      type: String,
      required: true,
    },
    outDate: {
      type: String,
      required: true,
    },
    outTimeHH: {
      type: Number,
      required: true,
    },
    outTimeMM: {
      type: Number,
      required: true,
    },
    outPeriod: {
      type: String,
      enum: ["AM", "PM"],
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    attendanceStatus: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'], 
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

const Timesheet = mongoose.model("Timesheet", timesheetSchema);

module.exports = Timesheet;
