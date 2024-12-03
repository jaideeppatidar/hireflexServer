const { sendWelcomeEmail } = require("../Nodemailer/Nodemailer");
const userService = require("../services/userServices");
const mongoose = require("mongoose");



exports.CreateEmployee = async (req, res) => {
  try {
    const {
      title,
      firstName,
      lastName,
      middleName,
      employeeName,
      gender,
      password,
      rePassword,
      mobile,
      designation,
      department,
      email,
      joiningDate,
      role,
      dob,
      education,
      employmentStartDate,
      probationStartDate,
      address,
      address1,
      address2,
      townCity,
      state,
      country,
      postcode,
      name,
      relation,
      contactNumber,
      nameOnAccount,
      nameOfBank,
      bankBranch,
      accountNumber,
      sortCodeOrIfscCode,
      taxCode,
      niNumber,
      passportNumber,
      countryOfIssue,
      passportExpiryDate,
      licenseNumber,
      licenseClass,
      dateOfExpiry,
      visaNumber,
      visaExpiryDate
    } = req.body;

    // Check if user with the same email already exists
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already registered with this email" });
    }


// date formate 

    const formatDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;
    };
    const formatteddob = formatDate(dob);
    const formattedjoiningDate = formatDate(joiningDate);
    const formattedemploymentStartDate = formatDate(employmentStartDate);
    const formattedprobationStartDate = formatDate(probationStartDate);
    const formattedpassportExpiryDate = formatDate(passportExpiryDate);
    const formatteddateOfExpiry = formatDate(dateOfExpiry);
    const formattedvisaExpiryDate = formatDate(visaExpiryDate);




    // Generate employeeId in the format HFX0001
    const lastEmployee = await mongoose.model('Employee').findOne().sort({ employeeId: -1 });
    const lastEmployeeId = lastEmployee ? lastEmployee.employeeId : "HFX0000";
    const numberPart = parseInt(lastEmployeeId.slice(3)) + 1; // Increment the number part
    const employeeId = `HFX${String(numberPart).padStart(4, '0')}`; // Format the new employeeId

    // Create new user (employee)
    const newUser = await userService.createUser({
      employeeId, // Include the generated employeeId
      title,
      firstName,
      lastName,
      middleName,
      employeeName,
      gender,
      password,
      rePassword,
      mobile,
      designation,
      department,
      joiningDate: formattedjoiningDate,
      email,
      role,
      dob:formatteddob,
      education,
      employmentStartDate: formattedemploymentStartDate,
      probationStartDate: formattedprobationStartDate,
      address1,
      address,
      address2,
      townCity,
      state,
      country,
      postcode,
      name,
      relation,
      contactNumber,
      nameOnAccount,
      nameOfBank,
      bankBranch,
      accountNumber,
      sortCodeOrIfscCode,
      taxCode,
      niNumber,
      passportNumber,
      countryOfIssue,
      passportExpiryDate: formattedpassportExpiryDate,
      licenseNumber,
      licenseClass,
      dateOfExpiry :formatteddateOfExpiry,
      visaNumber,
      visaExpiryDate:formattedvisaExpiryDate
    });
    await sendWelcomeEmail(newUser);
    res.status(201).json({
      message: "User created successfully and email sent",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: error.message || "An unexpected error occurred",
    });
  }
};
  exports.getAllEmployee = async (req, res) => {
    try {
      const users = await userService.findAllUsers();
     
      res.status(200).json({ users });
    } catch (error) {
      console.error("Error fetching all users:", error);
      res
        .status(500)
        .json({ error: error.message || "An unexpected error occurred" });
    }
  };
  exports.deleteEmployee = async (req, res) => {
    const { employeeId } = req.params; 
    try {
       await userService.findUserByEmployeeId(employeeId);
      await userService.deleteUserByEmployeeId(employeeId);
      res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };
    exports.getEmployeeUserById = async (req, res) => {
    try {
      console.log(req.params);
      const { employeeId } = req.params; 
   const user =    await userService.findUserByEmployeeId(employeeId);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };
  
  exports.updateEmployee = async (req, res) => {
    const { employeeId } = req.params; 
    const userDetails = req.body;
    try {
      const updatedUser = await userService.updateUser(employeeId, userDetails);
        res.status(200).json({
        message: "Employee updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };