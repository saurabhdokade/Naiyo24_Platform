const Interview = require('../Model/interviewModel');
const Question = require('../Model/questionModel');
const User = require("../Model/userModel")
// Create an interview
exports.createInterview = async (req, res) => {
    try {
        const { candidateId, questionIds, startTime, endTime } = req.body;

        // Check if the candidate is a valid user
        const candidate = await User.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // Fetch questions
        const questions = await Question.find({ '_id': { $in: questionIds } });

        const interview = new Interview({
            candidate: candidateId,
            questions: questions.map(q => q._id),
            startTime,
            endTime,
            status: 'pending',
        });

        await interview.save();
        res.status(201).json({ message: "Interview created successfully", interview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all interviews for an admin
exports.getAllInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find().populate('candidate').populate('questions');
        res.status(200).json(interviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update interview status
exports.updateInterviewStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const interview = await Interview.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!interview) {
            return res.status(404).json({ message: "Interview not found" });
        }

        res.status(200).json({ message: "Interview status updated", interview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
