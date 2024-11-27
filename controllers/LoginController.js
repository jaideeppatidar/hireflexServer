const userService = require("../services/userServices");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret"; 

exports.loginUser = async (req, res) => {
  try {
    const { employeeId, password } = req.body;
    const { user, token } = await userService.authenticateUser(
      employeeId,
      password
    );
    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
exports.SuperAdminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const SUPER_ADMIN_EMAIL = "superadmin@gmail.com";
      const SUPER_ADMIN_PASSWORD = "superadmin";
        if (email !== SUPER_ADMIN_EMAIL || password !== SUPER_ADMIN_PASSWORD) {
        return res.status(403).json({ error: "Access denied. Invalid credentials." });
      }
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2h" });
        res.status(200).json({
        message: "Super Admin login successful",
        jwtToken: token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "An error occurred during login" });
    }
  };
  exports.AdminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const SUPER_ADMIN_EMAIL = "admin@gmail.com";
      const SUPER_ADMIN_PASSWORD = "admin@123";
        if (email !== SUPER_ADMIN_EMAIL || password !== SUPER_ADMIN_PASSWORD) {
        return res.status(403).json({ error: "Access denied. Invalid credentials." });
      }
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2h" });
        res.status(200).json({
        message: " Admin login successful",
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "An error occurred during login" });
    }
  };
