const express = require('express');
const router = express.Router();
const offerLetterController = require('../Controller/offerletterController');
const {isAuthenticatedUser} = require('../middlewares/auth');
router.post('/template',isAuthenticatedUser, offerLetterController.createTemplate);  // Create Template
router.post('/preview', offerLetterController.previewOfferLetter);  // Preview Template
router.post('/send', offerLetterController.sendOfferLetter);  // Send Offer Letter to Candidate
router.post('/send-signature-request', offerLetterController.sendForSignature);  // Send for eSignature

module.exports = router;
