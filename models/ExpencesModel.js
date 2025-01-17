const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const expenseSchema = new mongoose.Schema({
  expencesId: {
    type: String,
    default: () => uuidv4(),
    unique: true,
  },
  employeeName: { type: String, required: true },
  employeeId: { type: String, required: true },
  expenseDate: { type: String, required: true },
  expenseDescription: { type: String, required: true },
  expenseType: { type: String, required: true },
  amount: { type: Number, required: true },
  receiptFileName: { type: String},
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'], 
      default: 'Pending',
  },});
  expenseSchema.index({ expencesId: 1 }, { unique: true });

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
