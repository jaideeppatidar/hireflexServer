const ExpencesModel =  require('../models/ExpencesModel')
exports.ExpencesDocument = async (req, res) => {
    try {
      const { employeeName, employeeId, expenseDate, expenseDescription, expenseType, amount } = req.body;
        const receiptFileName = req.file ? req.file.buffer : null 
      
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
      res.status(201).json(savedExpense);
    } catch (err) {
      res.status(500).json({ message: 'Error creating expense', error: err.message });
    }
  };

  // Edit expense API
exports.ExpencesDocumentEdite = async (req, res) => {
    try {
      const { expenseId } = req.params;
      const { employeeName, employeeId, expenseDate, expenseDescription, expenseType, amount } = req.body;
          const receiptFileName = req.file ? req.file.buffer : null; 
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

  // Delete expense API
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
  
  
  