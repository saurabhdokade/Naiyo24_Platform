const mongoose = require('mongoose');

const offerLetterTemplateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    templateContent: { type: String, required: true }, // e.g., "Dear {{candidate_name}}, your salary is {{salary}}"
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Admin/HR
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('OfferLetterTemplate', offerLetterTemplateSchema);
