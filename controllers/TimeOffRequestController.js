const TimeOffReqModel = require('../models/TimeOffModel')
exports.TimeOffRequestDoc = async (req, res) => {
    try {
      const { startDate, endDate, partialDays, reason, type, status } = req.body;
      
      const newTimeOff = new TimeOffReqModel({
        startDate,
        endDate,
        partialDays,
        reason,
        type,
        status: 'PENDING', 
      });
  
      const savedTimeOff = await newTimeOff.save();
      res.status(201).json(savedTimeOff);
    } catch (err) {
      res.status(500).json({ message: 'Error creating expense', error: err.message });
    }
  };

  exports.TimeOffRequestEdite = async (req, res) => {
    try {
      const { timeoffId } = req.params; 
      const { startDate, endDate, partialDays, reason, type, status } = req.body;
      const updatedTimeOff = await TimeOffReqModel.findOneAndUpdate(
        {timeoffId},
        {
          startDate,
          endDate,
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
      res.status(500).json({ message: "Error updating time-off request", error: err.message });
    }
  };

  exports.TimeOffRequestDelete = async (req, res) => {
    try {
      const { timeoffId } = req.params; 
      await TimeOffReqModel.findOneAndDelete({timeoffId});      
      res.status(200).json({ message: 'TimeOff deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting expense', error: err.message });
    }
  };

  exports.getAllTimeOffRequest = async (req, res) => {
    try {
      const timeoffdoc = await TimeOffReqModel.find();
      res.status(200).json({ message: " Get All TimeOff retrieved successfully", timeoffdoc });
    } catch (error) {
      console.error("Error fetching meetings:", error);
      res.status(500).json({ error: "An error occurred while fetching the meetings" });
    }
  };

  exports.getAllTimeOffRequestById = async (req, res) => {
    try {
      const { timeoffId } = req.params;
      const timeoffDocument = await TimeOffReqModel.findOne({timeoffId});
      res.status(200).json({
        message: 'timeoff  fetched By Id successfully',
        document: timeoffDocument,
      });
    } catch (error) {
      console.error('Error fetching document:', error);
      res.status(500).json({ error: error.message || 'An unexpected error occurred' });
    }
  };
  