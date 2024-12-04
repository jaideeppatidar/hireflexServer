const TimeOffReqModel = require("../models/TimeOffModel");
exports.TimeOffRequestDoc = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      partialDays,
      reason,
      type,
      status,
      employeeId,
    } = req.body;
    const formatDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;
    };
    const formattedstartDate = formatDate(startDate);
    const formattedendDate = formatDate(endDate);
    const newTimeOff = new TimeOffReqModel({
      employeeId,
      startDate: formattedstartDate,
      endDate: formattedendDate,
      partialDays,
      reason,
      type,
      status: "PENDING",
    });

    const savedTimeOff = await newTimeOff.save();
    res.status(201).json(savedTimeOff);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating expense", error: err.message });
  }
};

exports.TimeOffRequestEdite = async (req, res) => {
  try {
    const { timeoffId } = req.params;
    const { startDate, endDate, partialDays, reason, type, status } = req.body;
    const formatDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;
    };
    const formattedstartDate = formatDate(startDate);
    const formattedendDate = formatDate(endDate);
    const updatedTimeOff = await TimeOffReqModel.findOneAndUpdate(
      { timeoffId },
      {
        employeeId,
        startDate: formattedstartDate,
        endDate: formattedendDate,
        partialDays,
        reason,
        type,
        status,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Timeoff request updated successfully",
      data: updatedTimeOff,
    });
  } catch (err) {
    console.error("Error updating time-off request:", err);
    res
      .status(500)
      .json({ message: "Error updating time-off request", error: err.message });
  }
};

exports.TimeOffRequestDelete = async (req, res) => {
  try {
    const { timeoffId } = req.params;
    await TimeOffReqModel.findOneAndDelete({ timeoffId });
    res.status(200).json({ message: "TimeOff deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting expense", error: err.message });
  }
};

exports.getAllTimeOffRequest = async (req, res) => {
  try {
    const timeoffdoc = await TimeOffReqModel.find();
    res
      .status(200)
      .json({ message: " Get All TimeOff retrieved successfully", timeoffdoc });
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the meetings" });
  }
};

exports.getAllTimeOffRequestById = async (req, res) => {
  try {
    const { timeoffId } = req.params;
    const timeoffDocument = await TimeOffReqModel.findOne({ timeoffId });
    res.status(200).json({
      message: "timeoff  fetched By Id successfully",
      document: timeoffDocument,
    });
  } catch (error) {
    console.error("Error fetching document:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};

exports.TimeOffRequestApproveed = async (req, res) => {
  try {
    const { timeoffId } = req.params;
    
    // Update the query to match the correct field name
    const updatedTimeOff = await TimeOffReqModel.findOneAndUpdate(
      { timeoffId: timeoffId }, // Use singular `timeoffId`
      { status: "APPROVED" },
      { new: true }
    );

    if (!updatedTimeOff) {
      return res.status(404).json({
        message: "Timeoff not found",
        requestedId: timeoffId,
      });
    }

    res.status(200).json({
      message: "Timeoff request approved successfully",
      data: updatedTimeOff,
    });
  } catch (err) {
    console.error("Error approving time-off request:", err);
    res.status(500).json({
      message: "Error approving time-off request",
      error: err.message,
    });
  }
};


exports.TimeOffRequestReject = async (req, res) => {
  try {
    const { timeoffId } = req.params;

    const updatedExpense = await TimeOffReqModel.findOneAndUpdate(
      { timeoffId: timeoffId },
      { status: "REJECTED" },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "timeoffId not found",
        requestedId: timeoffId
      });
    }

    res.status(200).json({
      message: "timeoffId request approved successfully",
      data: updatedExpense,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error approving expenses request",
      error: err.message,
    });
  }
};




exports.getAllEmployeeTimeOffRequestById = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const timeoffDocument = await TimeOffReqModel.findOne({ employeeId });
    res.status(200).json({
      message: "employeeId  fetched By Id successfully",
      document: timeoffDocument,
    });
  } catch (error) {
    console.error("Error fetching document:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};
