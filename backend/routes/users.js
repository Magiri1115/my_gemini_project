const express = require('express');
const router = express.Router();

// ユーザー登録
router.post('/register', (req, res) => {
    // 登録処理
    res.send('User registered');
});

// ログイン
router.post('/login', (req, res) => {
    // ログイン処理
    res.send('User logged in');
});

// ユーザー情報取得
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    // ユーザー情報取得処理
    res.send(`User info for ID: ${userId}`);
});

module.exports = router;
