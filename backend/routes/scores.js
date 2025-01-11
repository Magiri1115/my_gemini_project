const express = require('express');
const router = express.Router();

// スコア登録
router.post('/', (req, res) => {
    // スコア登録処理
    res.send('Score registered');
});

// スコア取得
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    // スコア取得処理
    res.send(`Scores for user ID: ${userId}`);
});

//スコア更新
router.put('/:scoreId', (req, res) => {
    const scoreId = req.params.scoreId;
    res.send(`Score updated for ID: ${scoreId}`);
});

//スコア削除
router.delete('/:scoreId', (req, res) => {
    const scoreId = req.params.scoreId;
    res.send(`Score deleted for ID: ${scoreId}`);
});

module.exports = router;
