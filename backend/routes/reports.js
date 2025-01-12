const express = require('express');
const router = express.Router();
const { callGeminiAPI } = require('../utils/gemini_api');
const { createReport, getReportsByUserId } = require('../models/report');
//HTTP POSTリクエストを処理する
router.post('/', async function(req, res) {
  try {
    const { userId, prompt } = req.body;
    const analysisResult = await callGeminiAPI(prompt);
    const report = await createReport({ user_id: userId, report_data: analysisResult }, req.app.get('pool'));
    res.status(201).json(report);
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to analyze data." });
  }
});
//HTTP GETリクエストを処理する
router.get('/:userId', async function(req, res) {
  try {
    const reports = await getReportsByUserId(req.params.userId, req.app.get('pool'));
    res.status(200).json(reports);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// 難易度分析
const { insertTopics, insertCooccurrence } = require('../models/topic')
const { updateReportDifficulty } = require('../models/report')

router.post('/', async function (req, res) {
    try {
        const { userId, prompt } = req.body;
        const analysisResult = await callGeminiAPI(prompt);
        const difficulty = await analyzeDifficulty(prompt)
        const topics = await extractTopics(prompt)
        const report = await createReport({user_id: userId, report_data: analysisResult, difficulty: parseInt(difficulty)}, req.app.get('pool'))
        const topicData = JSON.parse(topics)
        await insertTopics(topicData.topics, req.app.get('pool'))
        await insertCooccurrence(topicData.topics, req.app.get('pool'))
        await updateReportDifficulty(report.id, parseInt(difficulty), req.app.get('pool'))
        res.status(201).json(report);
    } catch (error) {
        console.error("Gemini API error:", error);
        res.status(500).json({ error: "Failed to analyze data.", message: error.message });
    }
});

