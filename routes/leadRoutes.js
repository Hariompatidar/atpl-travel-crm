const express= require('express');
const { newLead, getAllLeads, getLead, deleteLead, getUserLeads, acceptLead, changeExecutiveOnLead, changeLeadStatus, createNewQuotation, updateQuotation, deleteQuotation, createComment, getAllComments, deleteComment } = require('../controllers/leadController');
const router= express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router.route('/newLead').post(newLead);
router.route('/leads').get(isAuthenticatedUser,authorizeRoles("admin"),getAllLeads);

router.route('/lead/:id').get(getLead).delete(isAuthenticatedUser, authorizeRoles('dmin'), deleteLead);

// add one update controller for changes in the lead
// but now adding this thing to change the status of the lead 
router.route('/lead/:id').put(isAuthenticatedUser, changeLeadStatus)

router.route('/me/leads').get(isAuthenticatedUser,getUserLeads);


router.route('/acceptlead/:id').put(isAuthenticatedUser,acceptLead);

router.route('/changeexecutive/:id').put(isAuthenticatedUser, authorizeRoles('admin'),changeExecutiveOnLead);

// Quotation related routes
router.route('/quotation/:id').post(isAuthenticatedUser, createNewQuotation).put(updateQuotation).delete(deleteQuotation);

// comments related routes
router.route('/lead/comment/:id').post(createComment).get(getAllComments);
// delete comment- ADMIN
router.route('/lead/comment/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteComment);

// add followup routess

module.exports= router;