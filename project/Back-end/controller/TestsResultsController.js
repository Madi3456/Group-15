import { TestResult } from "../models/TestResultModel.js";

export const addTestResult = async (req, res) => {
    try {
        const { userId, setName, score, totalQuestions, correctAnswers } = req.body;
        
        if (!userId || !setName) {
            return res.status(400).json({ error: "User ID and Set Name are required." });
        }

        const testResult = await TestResult.create({
            userId,
            setName,
            score,
            totalQuestions,
            correctAnswers
        });

        res.status(201).json(testResult);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "failed to add test result" });
    }
};

export const getTestResults = async (req, res) => {
    try {
        const { userId } = req.query;
        
        const results = await TestResult.findAll({ 
            where: { userId },
            order: [['testDate', 'DESC']]
        });

        res.json(results);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "failed to retrieve test results" });
    }
};
