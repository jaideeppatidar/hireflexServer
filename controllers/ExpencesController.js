const ExpencesModel =  require('../models/ExpencesModel')
exports.ExpencesDocument = async (req, res) => {
    try {
      const { employeeName, employeeId, expenseDate, expenseDescription, expenseType, amount } = req.body;
        const receiptFileName = req.file ? req.file.filename : null 
      
      const newExpense = new ExpencesModel({
        employeeName,
        employeeId,
        expenseDate,
        expenseDescription,
        expenseType,
        amount,
        receiptFileName, 
        status: 'PENDING', 
      });
  
      const savedExpense = await newExpense.save();
      res.status(201).json({savedExpense: savedExpense});
    } catch (err) {
      res.status(500).json({ message: 'Error creating expense', error: err.message });
    }
  };
exports.ExpencesDocumentEdite = async (req, res) => {
    try {
      const { expenseId } = req.params;
      const { employeeName, employeeId, expenseDate, expenseDescription, expenseType, amount } = req.body;
          const receiptFileName = req.file ? req.file.filename : null; 
        const expense = await ExpencesModel.findOneAndUpdate({expenseId});
      expense.employeeName = employeeName || expense.employeeName;
      expense.employeeId = employeeId || expense.employeeId;
      expense.expenseDate = expenseDate || expense.expenseDate;
      expense.expenseDescription = expenseDescription || expense.expenseDescription;
      expense.expenseType = expenseType || expense.expenseType;
      expense.amount = amount || expense.amount;
      if (receiptFileName) expense.receiptFileName = receiptFileName; 
        const updatedExpense = await expense.save();
      res.status(200).json(updatedExpense);
    } catch (err) {
      res.status(500).json({ message: 'Error updating expense', error: err.message });
    }
  };
exports.DeleteExpencesDocument = async (req, res) => {
    try {
      const { expenseId } = req.params; 
      await ExpencesModel.findOneAndDelete({expenseId});      
      res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting expense', error: err.message });
    }
  };

  exports.getAllExpences = async (req, res) => {
    try {
      const expencesdoc = await ExpencesModel.find();
      res.status(200).json({ message: " Get All Expennces retrieved successfully", expencesdoc });
    } catch (error) {
      console.error("Error fetching meetings:", error);
      res.status(500).json({ error: "An error occurred while fetching the meetings" });
    }
  };
  exports.getPoliciesDocumentById = async (req, res) => {
    try {
      const { expenseId } = req.params;
      const expencesDocument = await ExpencesModel.findOne({expenseId});
      res.status(200).json({
        message: 'Expnences  fetched By Id successfully',
        document: expencesDocument,
      });
    } catch (error) {
      console.error('Error fetching document:', error);
      res.status(500).json({ error: error.message || 'An unexpected error occurred' });
    }
  };
  exports.ExpnencesApproveed = async (req, res) => {
    try {
      const { expenseId } = req.params;
      const ExpnencesTimesheet = await ExpencesModel.findOneAndUpdate(
        { expenseId },
        { status: "Approved" },
        { new: true }
      );
      res.status(200).json({
        message: "Expnences request approved successfully",
        data: ExpnencesTimesheet,
      });
    } catch (err) {
      console.error("Error approving Expnences request:", err);
      res
        .status(500)
        .json({
          message: "Error approving Expnences request",
          error: err.message,
        });
    }
  };
  exports.ExpnencesReject = async (req, res) => {
    try {
      const { expenseId } = req.params;
      const ExpnencesTimesheet = await ExpencesModel.findOneAndUpdate(
        { expenseId },
        { status: "Rejected" },
        { new: true }
      );
  
      res.status(200).json({
        message: "Timesheet request Expnences successfully",
        data: ExpnencesTimesheet,
      });
    } catch (err) {
      console.error("Error rejecting Expnences request:", err);
      res
        .status(500)
        .json({
          message: "Error rejecting Expnences request",
          error: err.message,
        });
    }
  };
  exports.getEmployeedDocumentById = async (req, res) => {
    try {
      const { employeeId } = req.params;
      const expencesDocument = await ExpencesModel.find({employeeId});
      res.status(200).json({
        message: 'employeeId  fetched By Id successfully',
        document: expencesDocument,
      });
    } catch (error) {
      console.error('Error fetching document:', error);
      res.status(500).json({ error: error.message || 'An unexpected error occurred' });
    }
  };
  
  
  