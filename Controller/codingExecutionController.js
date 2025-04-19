const CodingExecution = require('../Model/codingExecutionModel');
const axios = require('axios');

exports.executeCode = async (req, res) => {
    try {
        const { interviewId, questionId, candidateCode } = req.body;

        // Create a new coding execution record with pending status
        const codingExecution = new CodingExecution({
            interviewId,
            questionId,
            candidateCode,
            status: 'pending',
        });

        // Save the coding execution to the database
        await codingExecution.save();

        // Send code to Judge0 API for execution (you can replace with your own Docker endpoint if needed)
        const judge0Response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
            source_code: candidateCode,
            language_id: 71, // ID for Python, change based on the language
            stdin: '', // You can add input to the code if needed
            expected_output: '', // Optional expected output for validation (if required)
            cpu_time_limit: 2, // Optional, time limit for code execution in seconds
            memory_limit: 128000, // Optional, memory limit in KB
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'x-rapidapi-key': '2075adc61fmsh41f6165acc8643dp13fd50jsn5bc7f44b7de6', // Replace with your actual key
            }
        });

        // Use the response data to update the coding execution record
        codingExecution.judge0Result = judge0Response.data;
        codingExecution.status = 'completed';

        // Save the execution result in the database
        await codingExecution.save();

        // Send the execution result back to the client
        res.status(200).json({ message: "Code executed successfully", result: judge0Response.data });
    } catch (error) {
        console.error(error); // Log the error for better debugging
        res.status(500).json({ message: error.message || 'An error occurred while executing the code.' });
    }
};