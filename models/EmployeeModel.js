const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeSchema = new Schema(
  {
    employeeId: { type: String, unique: true, required: true },
    title: { type: String, default: "" },
    image: {
      type: String,
      default: null,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, default: "" },
    employeeName: { type: String, required: true },
    gender: { type: String },
    password: { type: String },
    rePassword: { type: String },
    mobile: { type: String },
    designation: { type: String, default: "" },
    role: { type: String, default: "" },
    department: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    dob: { type: String },
    education: { type: String, default: "" },
    employmentStartDate: { type: String },
    probationStartDate: { type: String, default: "" },
    address: { type: String, default: "" },
    address1: { type: String, default: "" },
    address2: { type: String, default: "" },
    townCity: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
    postcode: { type: String, default: "" },
    name: { type: String, default: "" },
    relation: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
    nameOnAccount: { type: String, default: "" },
    nameOfBank: { type: String, default: "" },
    bankBranch: { type: String, default: "" },
    accountNumber: { type: String, default: "" },
    sortCodeOrIfscCode: { type: String, default: "" },
    taxCode: { type: String, default: "" },
    niNumber: { type: String, default: "" },
    passportNumber: { type: String, default: "" },
    passportcountryOfIssue: { type: String, default: "" },
    drivingcountryOfIssue: { type: String, default: "" },

    passportExpiryDate: { type: String, default: "" },
    licenseNumber: { type: String, default: "" },
    licenseClass: { type: String, default: "" },
    dateOfExpiry: { type: String, default: "" },
    visaNumber: { type: String, default: "" },
    visaExpiryDate: { type: String, default: "" },
  },
  { timestamps: true }
);

employeeSchema.pre("save", async function (next) {
  const employee = this;
  if (!employee.isNew) return next();
  try {
    const lastEmployee = await mongoose
      .model("Employee")
      .findOne()
      .sort({ employeeId: -1 });
    const lastEmployeeId = lastEmployee ? lastEmployee.employeeId : "HFX0000";
    const numberPart = parseInt(lastEmployeeId.slice(3)) + 1;
    const newEmployeeId = `HFX${String(numberPart).padStart(4, "0")}`;
    employee.employeeId = newEmployeeId;
    next();
  } catch (error) {
    next(error);
  }
});
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
