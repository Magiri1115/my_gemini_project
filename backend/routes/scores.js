const express = require('express');
const router = express.Router();
const {createScore, getScores, updateScore, deleteScore} = require('../models/score');

router.post('/', async function(req, res) {
    try {
        const result = await createScore(req.body, req.app.get('pool'));
        res.status(201).json(result);
    } catch (error) {
        console.error("error", error);
        res.status(500).json({message: error.message});
    }
});

router.get('/:userId', async function(req, res) {
    try {
        const result = await getScores(req.params.userId, req.app.get('pool'));
        res.status(200).json(result);
    } catch (error) {
        console.error("error", error);
        res.status(500).json({message: error.message});
    }
});

router.put('/:scoreId', async function(req, res) {
    try {
        const result = await updateScore(req.params.scoreId, req.body, req.app.get('pool'));
        res.status(200).json(result);
    } catch (error) {
        console.error("error", error);
        res.status(500).json({message: error.message});
    }
});

router.delete('/:scoreId', async function(req, res) {
    try {
        const result = await deleteScore(req.params.scoreId, req.app.get('pool'));
        res.status(200).json({message: '削除が完了しました'});
    } catch (error) {
        console.error("error", error);
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
