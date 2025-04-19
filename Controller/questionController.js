const Question = require('../Model/questionModel');

// Create a new question
exports.createQuestion = async (req, res) => {
    try {
        const { questionText, questionType, options, correctAnswer, timeLimit } = req.body;

        const question = new Question({
            questionText,
            questionType,
            options,
            correctAnswer,
            timeLimit,
            createdBy: req.user.id,
        });

        await question.save();
        res.status(201).json({ message: "Question created successfully", question });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a question
exports.updateQuestion = async (req, res) => {
    try {
        const { questionText, questionType, options, correctAnswer, timeLimit } = req.body;
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            { questionText, questionType, options, correctAnswer, timeLimit },
            { new: true }
        );

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json({ message: "Question updated successfully", question });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
