const mongoose = require('mongoose');

// Question Schema
const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    questionType: {
        type: String,
        enum: ['MCQ', 'Coding', 'Video'],
        required: true,
    },
    options: [String], // For MCQs
    correctAnswer: String, // For MCQs or coding-related answers
    timeLimit: { type: Number, default: 0 }, // Time limit for each question in seconds
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', questionSchema);
