const OfferLetterTemplate = require('../Model/offerletterModel');

// Create Offer Letter Template
exports.createTemplate = async (req, res) => {
    try {
        const { title, templateContent } = req.body;
        const template = new OfferLetterTemplate({ title, templateContent, createdBy: req.user.id });
        await template.save();
        res.status(201).json({ message: 'Template created successfully', template });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Preview Offer Letter (replace placeholders with candidate data)
exports.previewOfferLetter = async (req, res) => {
    try {
        const { templateId, candidateData } = req.body;
        const template = await OfferLetterTemplate.findById(templateId);
        
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }

        let offerLetter = template.templateContent;

        // Replace placeholders with candidate data
        for (const [key, value] of Object.entries(candidateData)) {
            offerLetter = offerLetter.replace(`{{${key}}}`, value);
        }

        res.status(200).json({ message: 'Preview generated', offerLetter });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Send Offer Letter via Email (use nodemailer or any email service)
const sendEmail = require("../utils/sendEmail");

exports.sendOfferLetter = async (req, res) => {
    try {
        const { candidateEmail, offerLetterContent } = req.body;

        // Prepare the email options
        const emailOptions = {
            to: candidateEmail,
            subject: 'Offer Letter - Congratulations!',
            text: offerLetterContent, // You can also create an HTML version if needed
            html: `<p>${offerLetterContent}</p>`, // HTML version of the content
        };

        // Call the sendEmail utility to send the email
        await sendEmail(emailOptions);

        res.status(200).json({ message: 'Offer letter sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const helloSign = require('hellosign-sdk')({ key: 'YOUR_HELLOSIGN_API_KEY' });

// Send document for signature
exports.sendForSignature = async (req, res) => {
    try {
        const { offerLetterPdf, candidateEmail } = req.body;

        // Replace with actual file data or path
        const file = { file: offerLetterPdf }; // This would be the generated offer letter PDF
        
        const request = {
            test_mode: 1,  // Set to 0 for production mode
            clientId: 'YOUR_HELLOSIGN_CLIENT_ID',
            title: 'Offer Letter',
            subject: 'Please sign your offer letter',
            message: 'Please sign the attached offer letter.',
            signers: [
                {
                    email_address: candidateEmail,
                    name: 'Candidate Name', // You can dynamically replace this
                },
            ],
            files: [file],
        };

        helloSign.signatureRequest.createEmbedded(request)
            .then(response => {
                res.status(200).json({ message: 'Signature request sent', data: response });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};
