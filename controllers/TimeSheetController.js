const TimeSheetModel = require('../models/TimeSheetModel')
exports.TimeSheetDocument = async (req, res) => {
    try {
      const {
        employeeId,
        employeeName,
        inDate,
        inTimeHH,
        inTimeMM,
        inPeriod,
        outDate,
        outTimeHH,
        outTimeMM,
        outPeriod,
        hours,
        attendanceStatus,
        status,
      } = req.body;
      const newTimesheet = new TimeSheetModel({
        employeeId,
        employeeName,
        inDate,
        inTimeHH,
        inTimeMM,
        inPeriod,
        outDate,
        outTimeHH,
        outTimeMM,
        outPeriod,
        hours,
        attendanceStatus,
        status,
      });
  
      const savedTimesheet = await newTimesheet.save();
      res.status(201).json(savedTimesheet);
    } catch (err) {
      res.status(500).json({ message: 'Error creating timesheet', error: err.message });
    }
  };

  exports.getAllTimesheets = async (req, res) => {
    try {
      const timesheets = await TimeSheetModel.find();
      res.status(200).json(timesheets);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching timesheets', error: err.message });
    }
  };

  exports.getTimesheetById = async (req, res) => {
    try {
        const { timesheetId } = req.params;
      const timesheet = await TimeSheetModel.findOne({timesheetId});
      res.status(200).json(timesheet);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching timesheet', error: err.message });
    }
  };

  exports.updateTimesheet = async (req, res) => {
    try {
        const { timesheetId } = req.params;
      const timesheet = await TimeSheetModel.findOneAndUpdate({timesheetId}, req.body, {
        new: true,
        runValidators: true, 
      });
      res.status(200).json(timesheet);
    } catch (err) {
      res.status(500).json({ message: 'Error updating timesheet', error: err.message });
    }
  };

  exports.deleteTimesheet = async (req, res) => {
    try {
        const { timesheetId } = req.params;
      await TimeSheetModel.findOneAndDelete({timesheetId});
      res.status(200).json({ message: 'Timesheet deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting timesheet', error: err.message });
    }
  };
  exports.TimesheetApproveed = async (req, res) => {
    try {
      const { timesheetId } = req.params;
      const updatedTimesheet = await TimeSheetModel.findOneAndUpdate(
        { timesheetId },
        { status: "Approved" },
        { new: true }
      );
      res.status(200).json({
        message: "Timesheet request approved successfully",
        data: updatedTimesheet,
      });
    } catch (err) {
      console.error("Error approving Timesheet request:", err);
      res
        .status(500)
        .json({
          message: "Error approving Timesheet request",
          error: err.message,
        });
    }
  };
  exports.TimesheetReject = async (req, res) => {
    try {
      const { timesheetId } = req.params;
      const updatedTimesheet = await TimeSheetModel.findOneAndUpdate(
        { timesheetId },
        { status: "Rejected" },
        { new: true }
      );
  
      res.status(200).json({
        message: "Timesheet request rejected successfully",
        data: updatedTimesheet,
      });
    } catch (err) {
      console.error("Error rejecting Timesheet request:", err);
      res
        .status(500)
        .json({
          message: "Error rejecting Timesheet request",
          error: err.message,
        });
    }
  };