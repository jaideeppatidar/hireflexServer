const User = require("../models/userModel");
const helper = require("../utils/helper");
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";
const jwt = require("jsonwebtoken");

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};
exports.findAllUsers = async () => {
  try {
    return await User.find(); // Fetch all users from the collection
  } catch (error) {
    console.error("Error querying the database:", error);
    throw new Error("Error querying the database"); // Rethrow the error to be handled by the controller
  }
};
exports.createUser = async (userData) => {
  const hashedPassword = await helper.hashPassword(userData.password);
  const user = new User({
    ...userData,
    password: hashedPassword,
  });
  return await user.save();
};
exports.findUserById = async (id) => {
  return await User.findOne({ id });
};

exports.deleteUserById = async (id) => {
  return await User.findOneAndDelete({ id });
};
exports.authenticateUser = async ({ id }) => {
  const token = jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: "1h" });
  return { id, token };
};

exports.updateUser = async (userId, userDetails) => {
  return await User.findOneAndUpdate({ id: userId }, userDetails, {
    new: true,
  });
};

exports.findUserByEmployeeID = async (employeeID) => {
  return await User.findOne({ employeeID });
};
