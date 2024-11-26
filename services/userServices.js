const helper = require("../utils/helper");
const User = require('../models/EmployeeModel'); 
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";
const jwt = require("jsonwebtoken");
exports.findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email: email });
  } catch (error) {
    throw new Error(error.message || "Error finding user by email");
  }
};

exports.findAllUsers = async () => {
  try {
    return await User.find(); 
  } catch (error) {
    console.error("Error querying the database:", error);
    throw new Error("Error querying the database"); 
  }
};

exports.createUser = async (userData) => {
  try {
    const hashedPassword = await helper.hashPassword(userData.password);
    const user = new User({
      ...userData,
      password: hashedPassword,
    });
    return await user.save();
  } catch (error) {
    throw new Error(error.message || "Error creating user");
  }
};

exports.findUserByEmployeeId = async (employeeId) => {
  try {
    return await User.findOne({ employeeId }); 
  } catch (error) {
    console.error("Error in findUserByEmployeeId:", error);
    throw new Error(error.message || "Database error occurred");
  }
};

exports.deleteUserByEmployeeId = async (employeeId) => {
  try {
    return await User.deleteOne({ employeeId }); 
  } catch (error) {
    console.error("Error deleting user by employeeId:", error);
    throw new Error(error.message || "Error deleting user");
  }
};

exports.authenticateUser = async (userId) => {
  try {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
    return { userId, token };
  } catch (error) {
    throw new Error(error.message || "Authentication error");
  }
};

exports.updateUser = async (employeeId, userDetails) => {
  try {
    return await User.findOneAndUpdate({ employeeId }, userDetails, { new: true });
  } catch (error) {
    throw new Error(error.message || "Error updating user");
  }
};
