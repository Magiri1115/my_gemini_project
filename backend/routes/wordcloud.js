//ワードクラウドルーティング
const express = require('express');
const router = express.Router();
const { executePythonScript } = require('../utils/py_executor');

router.post('/', async function (req, res) {
    try {
        const { text } = req.body;
        const base64Image = await executePythonScript('./utils/wordcloud_generator.py', text);
        if (base64Image) {
            res.status(200).json({ image: base64Image });
        } else {
            res.status(500).json({ error: "Failed to generate wordcloud." });
        }
    } catch (error) {
        console.error("Error executing Python script:", error);
        res.status(500).json({ error: "Failed to generate wordcloud." });
    }
});

module.exports = router;
