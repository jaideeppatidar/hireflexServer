const fs = require('fs');
const csvParser = require('csv-parser');
const EmployeeModel = require('../models/EmployeeModel'); 
exports.uploadCSV = (req, res) => {
    try {
        const filePath = req.file.path;

        const results = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data) => {
                results.push({
                    employeeId: data.employeeId,
                    title:data.title,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    middleName:data.middleName,
                    employeeName:data.employeeName,
                    gender:data.gender,
                    password:data.password,
                    rePassword:data.rePassword,
                    mobile:data.mobile,
                    designation:data.designation,
                    department:data.department,
                    email:data.email,
                    role:data.role,
                    dob:data.dob,
                    education:data.education,
                    employmentStartDate:data.employmentStartDate,
                    probationStartDate:data.probationStartDate,
                    address:data.address,
                    address1:data.address1,
                    address2:data.address2,
                    townCity:data.townCity,
                    state:data.state,
                    country:data.country,
                    postcode:data.postcode,
                    name:data.name,
                    relation:data.relation,
                    contactNumber:data.contactNumber,
                    nameOnAccount:data.nameOnAccount,
                    nameOfBank:data.nameOfBank,
                    bankBranch:data.bankBranch,
                    accountNumber:data.accountNumber,
                    sortCodeOrIfscCode:data.sortCodeOrIfscCode,
                    taxCode:data.taxCode,
                    niNumber:data.niNumber,
                    passportNumber:data.passportNumber,
                    countryOfIssue:data.countryOfIssue,
                    passportExpiryDate:data.passportExpiryDate,
                    licenseNumber:data.licenseNumber,
                    licenseClass:data.licenseClass,
                    dateOfExpiry:data.dateOfExpiry,
                    visaNumber:data.visaNumber,
                    visaExpiryDate:data.visaExpiryDate
                });
            })
            .on('end', async () => {
                console.log('Parsed CSV Data:', results);

                if (results.length > 0) {
                    try {
                        await EmployeeModel.insertMany(results);
                        console.log('Data inserted successfully');
                        res.status(200).json({
                            message: 'File uploaded, processed, and data saved successfully',
                            data: results, 
                        });
                    } catch (err) {
                        console.error('Error inserting data into DB:', err); 
                        res.status(500).json({ error: 'Failed to save data to the database', details: err.message });
                    }
                } else {
                    res.status(400).json({ error: 'No data found in the CSV file' });
                }
            })
            .on('error', (error) => {
                console.error('Error parsing CSV:', error);
                res.status(500).json({ error: 'Failed to process CSV file' });
            });
    } catch (error) {
        console.error('Error uploading CSV:', error);
        res.status(500).json({ error: 'An error occurred during file upload' });
    }
};
