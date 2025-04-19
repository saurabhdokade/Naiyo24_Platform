const express = require('express');
const router = express.Router();
const {createQuestion,getAllQuestions,updateQuestion,deleteQuestion} = require('../controller/questionController');
const {  isAuthenticatedUser } = require('../middlewares/auth');

// Create a new question (Admin only)
router.post('/add', isAuthenticatedUser, createQuestion);

// Get all questions (Admin only)
router.get('/',  isAuthenticatedUser, getAllQuestions);

// Update a question (Admin only)
router.put('/:id',  isAuthenticatedUser, updateQuestion);

// Delete a question (Admin only)
router.delete('/:id',  isAuthenticatedUser, deleteQuestion);

module.exports = router;
