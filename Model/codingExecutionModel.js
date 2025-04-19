const mongoose = require('mongoose');

// Coding Execution Schema
const codingExecutionSchema = new mongoose.Schema({
    interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview' },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    candidateCode: { type: String, required: true },
    judge0Result: {
        stdout: String,
        stderr: String,
        verdict: String, // "AC" for correct, "WA" for wrong answer, etc.
        time: String,
        memory: String,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CodingExecution', codingExecutionSchema);
