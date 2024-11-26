const User = require("../models/userModel");
const PerksDocument = require("../models/PerksModel");
const userService = require("../services/userServices");
const { sendWelcomeEmail } = require("../Nodemailer/Nodemailer");
// exports.createUser = async (req, res) => {
//   try {
//     const {
//       id,
//       firstName,
//       lastName,
//       gender,
//       mobile,
//       password,
//       rePassword,
//       designation,
//       department,
//       address,
//       email,
//       dob,
//       education,
//       role,
//       joiningDate,
//     } = req.body;

//     // Check for required fields
//     if (
//       !id ||
//       !firstName ||
//       !lastName ||
//       !gender ||
//       !mobile ||
//       !password ||
//       !rePassword ||
//       !designation ||
//       !department ||
//       !address ||
//       !email ||
//       !dob ||
//       !education ||
//       !role ||
//       !joiningDate
//     ) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Check if passwords match
//     if (password !== rePassword) {
//       return res.status(400).json({ error: "Passwords do not match" });
//     }

//     // Check if user already exists
//     const existingUser = await userService.findUserByEmail(email);
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ error: "User already registered with this email" });
//     }

//     // Create new user
//     const newUser = await userService.createUser({
//       id,
//       firstName,
//       lastName,
//       gender,
//       mobile,
//       password,
//       rePassword,
//       designation,
//       department,
//       address,
//       email,
//       dob,
//       education,
//       role,
//       joiningDate,
//     });

//     res.status(201).json({
//       message: "User created successfully",
//       user: newUser,
//     });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res
//       .status(500)
//       .json({ error: error.message || "An unexpected error occurred" });
//   }
// };

exports.createUser = async (req, res) => {
  try {
    const {
      id,
      firstName,
      lastName,
      gender,
      mobile,
      password,
      rePassword,
      designation,
      department,
      address,
      email,
      dob,
      education,
      role,
      joiningDate,
    } = req.body;

    // Check for required fields
    if (
      !id ||
      !firstName ||
      !lastName ||
      !gender ||
      !mobile ||
      !password ||
      !rePassword ||
      !designation ||
      !department ||
      !address ||
      !email ||
      !dob ||
      !education ||
      !role ||
      !joiningDate
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if passwords match
    if (password !== rePassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already registered with this email" });
    }

    // Create new user
    const newUser = await userService.createUser({
      id,
      firstName,
      lastName,
      gender,
      mobile,
      password,
      rePassword,
      designation,
      department,
      address,
      email,
      dob,
      education,
      role,
      joiningDate,
    });
    await sendWelcomeEmail(newUser);

    res.status(201).json({
      message: "User created successfully and email sent",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const updatedUserData = req.body;
    const existingUser = await userService.findUserById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const updatedUser = await userService.updateUser(id, updatedUserData);
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await userService.deleteUserById(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};
// controller.js
exports.getUserById = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params; // Assuming userId is the employeeID

    const user = await userService.findUserById(id); // Query based on employeeID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};














exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await userService.authenticateUser({
      username,
      password,
    });
    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
