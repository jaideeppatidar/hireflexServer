const express = require('express');
const upload = require('../multerConfig');
const AsstesController = require('../controllers/AssetsController');
const DocumentConttroller = require('../controllers/DocumentController');
const MeetingController = require('../controllers/MeetingController');
const PerksController = require('../controllers/PerksCotroller')
const EmployeeController = require('../controllers/EmployeeController')
const PoliciesController = require('../controllers/PoliciesController')
const ExpencesController = require('../controllers/ExpencesController')
const  TimeOffController  = require('../controllers/TimeOffRequestController');
const  TimesheetController  = require('../controllers/TimeSheetController');
const  ChatController  = require('../controllers/ChatController');
const  SuperAdminChatController  = require('../controllers/AdminChatController');
const LoginController = require('../controllers/LoginController')
const UploadCSVController =  require('../controllers/EmployeeBulkController')
const router = express.Router();

// Employee Rotures Controller
router.post('/employee', EmployeeController.CreateEmployee);
router.get('/employee', EmployeeController.getAllEmployee);
router.get('/employee/:employeeId', EmployeeController.getEmployeeUserById);
router.delete('/employee/:employeeId', EmployeeController.deleteEmployee);
router.put('/employee/:employeeId', EmployeeController.updateEmployee);
router.post('/employee/upload', upload.single('file'), UploadCSVController.uploadCSV);




// Super Admin Chat Controller for Admin Chat Controller
router.post('/chat', ChatController.ChatSendEmplooye);
router.get('/chat', ChatController.ChatGetEmployeeMessages);
router.get('/chats/:employeeId', ChatController.ChatGetEmployeeMessagesById);

// Super Admin Chat Controller for Admin Chat Controller
router.post('/chat/send', SuperAdminChatController.ChatSendMessage);
router.get('/chat/messages/superadmin', SuperAdminChatController.ChatGetMessagesForSuperAdmin);
router.get('/chat/messages/:employeeId', SuperAdminChatController.ChatGetMessagesByEmployeeId);




// Assets Documents Routers 
router.post('/assets', AsstesController.AsstesDocuments);
router.get('/assets', AsstesController.getAllAsstesDocuments);
router.put("/assets/:assetsId", AsstesController.AsstesDocumentsEdite);
router.delete("/assets/:assetsId", AsstesController.AsstesDocumentsDelete);
router.get("/assets/:assetsId", AsstesController.AsstesDocumentsById);


// Documents Documents Routers 
router.post('/uploaddocument', upload.single('image'), DocumentConttroller.EmployeeDocument);
router.put('/uploaddocument/:documentId', upload.single('image'), DocumentConttroller.EmployeeDocumentEdite);
router.get('/uploaddocument', DocumentConttroller.getAllEmployeeDocuments);
router.get('/uploaddocument/:documentId', DocumentConttroller.getEmployeeDocumentById);
router.get("/uploaddocuments/:employeeId", DocumentConttroller.getEmployeedDocumentById);
router.delete('/uploaddocument/:documentId', DocumentConttroller.EmployeeDocumentsDelete);
router.put('/uploaddocument/approved/:documentId', DocumentConttroller.EmployeeDocApproveed);
router.put('/uploaddocument/reject/:documentId', DocumentConttroller.EmployeeDocReject);


// Meeting Employee Documents 
router.post('/meeting', MeetingController.MeetingEmployee);
router.put("/meeting/:meetingId", MeetingController.MeetingEmployeeEdite);
router.get('/meeting', MeetingController.getAllMeetings);
router.get("/meeting/:meetingId", MeetingController.getMeetingById);
router.get("/meetings/:employeeId", MeetingController.getEmployeeById);
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


// Exprences   Employee Documents   
router.post('/expences',upload.single('receiptFileName'), ExpencesController.ExpencesDocument);
router.put('/expences/:expencesId',upload.single('receiptFileName'), ExpencesController.ExpencesDocumentEdite);
router.delete('/expences/:expencesId', ExpencesController.DeleteExpencesDocument);
router.get('/expences', ExpencesController.getAllExpences);
router.get('/expences/:expencesId', ExpencesController.getPoliciesDocumentById);
router.get('/expencess/:employeeId', ExpencesController.getEmployeedDocumentById);
router.put('/expences/approved/:expencesId', ExpencesController.ExpensesApproved);
router.put('/expences/reject/:expencesId', ExpencesController.ExpnencesReject);



// TimeoffRequest   Employee Documents   
router.post('/timeoff', TimeOffController.TimeOffRequestDoc);
router.get('/timeoff', TimeOffController.getAllTimeOffRequest);
router.get('/timeoff/:timeoffId', TimeOffController.getAllTimeOffRequestById);
router.get('/timeoffs/:employeeId', TimeOffController.getAllEmployeeTimeOffRequestById);

router.put('/timeoff/:timeoffId', TimeOffController.TimeOffRequestEdite);
router.put('/timeoff/approved/:timeoffId', TimeOffController.TimeOffRequestApproveed);
router.put('/timeoff/reject/:timeoffId', TimeOffController.TimeOffRequestReject);
router.delete('/timeoff/:timeoffId', TimeOffController.TimeOffRequestDelete);



// TimeSheet  Employee Documents  
router.post('/timesheet', TimesheetController.TimeSheetDocument);
router.get('/timesheet', TimesheetController.getAllTimesheets);
router.get('/timesheet/:timesheetId', TimesheetController.getTimesheetById);
router.get('/timesheets/:employeeId', TimesheetController.getTimsheetEmployeeIdById);
router.put('/timesheet/:timesheetId', TimesheetController.updateTimesheet);
router.delete('/timesheet/:timesheetId', TimesheetController.deleteTimesheet);
router.put('/timesheet/approved/:timesheetId', TimesheetController.TimesheetApproveed);
router.put('/timesheet/reject/:timesheetId', TimesheetController.TimesheetReject);


router.post('/login',LoginController.loginUser);
router.post('/super',LoginController.SuperAdminLogin);

module.exports = router;
