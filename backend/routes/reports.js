const express = require('express');
const router = express.Router();
const { callGeminiAPI } = require('../utils/gemini_api');

// レポート生成
router.post('/', async (req, res) => {
    try {
        const analysisResult = await callGeminiAPI("Analyze this data");
        res.json({ result: analysisResult });
    } catch (error) {
        console.error("Gemini API error:", error);
        res.status(500).json({ error: "Failed to analyze data." });
    }
});

// レポート取得
router.get('/:reportId', (req, res) => {
    const reportId = req.params.reportId;
    res.send(`Report for ID: ${reportId}`);
});

module.exports = router;
