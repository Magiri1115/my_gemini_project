const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserById } = require('../models/user'); // getUserByIdを追加

// ユーザー登録
router.post('/register', function(req, res) {
    registerUser(req.body, req.app.get('pool'))
        .then(function(result) {
            res.status(201).json(result);
        })
        .catch(function(error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: error.message });
        });
});

// ログイン
router.post('/login', function(req, res) {
    loginUser(req.body, req.app.get('pool'))
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(error) {
            console.error("Error logging in:", error);
            res.status(401).json({ message: error.message });
        });
});

// ユーザー情報取得
router.get('/:id', function(req, res) {
    const userId = req.params.id;
    getUserById(userId, req.app.get('pool')) // モデルからユーザー情報を取得
        .then(function(user) {
            if (user) {
                res.status(200).json(user); // ユーザー情報が見つかった場合
            } else {
                res.status(404).json({ message: 'User not found' }); // 見つからなかった場合
            }
        })
        .catch(function(error) {
            console.error("Error getting user:", error);
            res.status(500).json({ message: error.message });
        });
});

module.exports = router;
