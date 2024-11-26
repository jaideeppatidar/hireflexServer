const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../multerConfig');
const AsstesController = require('../controllers/AssetsController');
const DocumentConttroller = require('../controllers/DocumentController');
const MeetingController = require('../controllers/MeetingController');
const PerksController = require('../controllers/PerksCotroller')
const EmployeeController = require('../controllers/EmployeeController')
const PoliciesController = require('../controllers/PoliciesController')

const LoginController = require('../controllers/LoginController')



const router = express.Router();

// Employee Rotures Controller
router.post('/employee', EmployeeController.CreateEmployee);
router.get('/employee', EmployeeController.getAllEmployee);
router.get('/employee/:employeeId', EmployeeController.getEmployeeUserById);
router.delete('/employee/:employeeId', EmployeeController.deleteEmployee);
router.put('/employee/:employeeId', EmployeeController.updateEmployee);








// Assets Documents Routers 
router.post('/assets', AsstesController.AsstesDocuments);
router.get('/assets', AsstesController.getAllAsstesDocuments);
router.put("/assets/:assetsId", AsstesController.AsstesDocumentsEdite);
router.delete("/assets/:assetsId", AsstesController.AsstesDocumentsDelete);
router.get("/assets/:assetsId", AsstesController.AsstesDocumentsById);


// Documents Documents Routers 
router.post('/uploaddocument', upload.single('documentFile'), DocumentConttroller.EmployeeDocument);
router.put('/uploaddocument/:documentId', upload.single('documentFile'), DocumentConttroller.EmployeeDocumentEdite);
router.get('/uploaddocument', DocumentConttroller.getAllEmployeeDocuments);
router.get('/uploaddocument/:documentId', DocumentConttroller.getEmployeeDocumentById);
router.delete('/uploaddocument/:documentId', DocumentConttroller.EmployeeDocumentsDelete);


// Meeting Employee Documents 
router.post('/meeting', MeetingController.MeetingEmployee);
router.put("/meeting/:meetingId", MeetingController.MeetingEmployeeEdite);
router.get('/meeting', MeetingController.getAllMeetings);
router.get("/meeting/:meetingId", MeetingController.getMeetingById);
router.delete('/meeting/:meetingId', MeetingController.MeetingEmployeeDelete);
 


// Perks  Employee Documents   
router.post('/perks',upload.single('image'), PerksController.PerksDocument);
router.get('/perks' ,PerksController.getAllPerksDocument);
router.get('/perks/:perksId' ,PerksController.getPerksDocumentById);
router.put('/perks/:perksId',upload.single('image'), PerksController.PerksDocumentEdite);
router.delete('/perks/:perksId', PerksController.deletePerkDocument);


// Policies   Employee Documents   
router.post('/policies',upload.single('file'), PoliciesController.PoliciesCreate);
router.put('/policies/:policiesId',upload.single('file'), PoliciesController.PoliciesDocumentEdite);
router.get('/policies', PoliciesController.getAllPolicies);
router.get('/policies/:policiesId', PoliciesController.getPoliciesDocumentById);
router.delete('/policies/:policiesId', PoliciesController.deletePolicies);































router.post('/login',LoginController.loginUser);
router.post('/super',LoginController.SuperAdminLogin);

module.exports = router;
