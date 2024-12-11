const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const DocumentSchema = new mongoose.Schema({
  perksId: {
    type: String,
    default: () => uuidv4(), 
    unique: true,          
  },
  perksName: {
    type: String,
  },
  description: {
    type: String,
  },
  image: { 
    type: String, 
    default: null 
  },
  url: {
    type: String,
  },
  category: {
    type: String, 
    required: true, // Ensures a category is always provided
   
  },
});

const PerksDocument = mongoose.model("perks", DocumentSchema);

module.exports = PerksDocument;
