const PerksDocument = require("../models/PerksModel");
const userService = require("../services/userServices");
const { sendWelcomeEmail } = require("../Nodemailer/Nodemailer");
















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
