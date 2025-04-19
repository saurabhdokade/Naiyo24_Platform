const mongoose = require('mongoose');

// Resume Schema
const resumeSchema = new mongoose.Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resumeUrl: { type: String, required: true }, // Resume file URL
    parsedData: {
        skills: [String],
        experience: Number,
        education: [{
            degree: String,
            institution: String,
            year: Number,
        }],
        // Add more parsed details here
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', resumeSchema);
