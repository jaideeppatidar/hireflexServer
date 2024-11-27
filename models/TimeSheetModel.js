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
      type: Date,
      required: true,
    },
    inTimeHH: {
      type: Number,
      required: true,
    },
    inTimeMM: {
      type: String,
      required: true,
    },
    inPeriod: {
      type: String,
      enum: ["AM", "PM"],
      required: true,
    },
    outDate: {
      type: Date,
      required: true,
    },
    outTimeHH: {
      type: Number,
      required: true,
    },
    outTimeMM: {
      type: String,
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
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Timesheet = mongoose.model("Timesheet", timesheetSchema);

module.exports = Timesheet;