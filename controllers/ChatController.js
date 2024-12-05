const Message = require('../models/MessageModel');
const userService = require("../services/userServices");

exports.ChatSendEmplooye = async (req, res) => {
    const { employeeId, message } = req.body;
  
    if (!employeeId || !message) {
      return res.status(400).json({ error: 'Employee ID and message are required' });
    }
  
    try {
      // Check if the user exists
      const user = await userService.findUserByEmployeeId(employeeId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Creating a new message object and saving it to MongoDB
      const newMessage = new Message({
        employeeId,
        message,
      });
        await newMessage.save();
        return res.status(200).json({ success: true, message: newMessage });
    } catch (error) {
      console.error('Error in ChatSendEmplooye:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };




    exports.ChatGetEmployeeMessages = async (req, res) => {
        try {
          const messageEmployee = await Message.find();
          res.status(200).json(messageEmployee);
        } catch (err) {
          res.status(500).json({ message: 'Error fetching timesheets', error: err.message });
        }
      };

      exports.ChatGetEmployeeMessagesById = async (req, res) => {
        try {
            const { employeeId } = req.params;
          const messageEmployee = await Message.find({employeeId});
          res.status(200).json(messageEmployee);
        } catch (err) {
          res.status(500).json({ message: 'Error fetching timesheet', error: err.message });
        }
      };
