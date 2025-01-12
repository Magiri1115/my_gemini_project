const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const userRoutes = require('./routes/users');
const scoreRoutes = require('./routes/scores');
const reportRoutes = require('./routes/reports');
const dbConfig = require('./config/db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const wordcloudRoutes = require('./routes/wordcloud');

// データベース接続プールの作成（サーバー起動前に一度だけ実行）
const pool = new Pool(dbConfig);

// データベース接続テストとサーバー起動
async function startServer() {
    try {
        await pool.connect();
        console.log('Database connected successfully!');

        app.use(cors());
        app.use(bodyParser.json());
        app.use('/api/users', userRoutes);
        app.use('/api/scores', scoreRoutes);
        app.use('/api/reports', reportRoutes);
        app.use('/api/wordcloud', wordcloudRoutes);

        app.get('/', function (req, res) {
            res.send('Backend is running!');
        });

        app.listen(port, function () {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1); // データベース接続失敗でプロセス終了
    }
}

startServer();

// SQLインジェクション対策済みクエリ関数の例 (他のルートでも使用可能)
async function queryDatabase(query, params = []) {
    try {
        const client = await pool.connect();
        const result = await client.query(query, params);
        client.release();
        return result.rows; // 結果を返す
    } catch (err) {
        console.error('Error executing query', err);
        throw err; // エラーを上位に伝播
    }
}

//getUser関数の修正
async function getUser(userId) {
    try {
        const users = await queryDatabase('SELECT * FROM users WHERE id = $1', [userId]);
        console.log(users);
        return users; // 結果を返す
    } catch (err) {
        console.error('Error getting user', err);
        throw err;
    }
}
//getUser関数の使用例
getUser(1).then(user => console.log('取得したユーザー情報', user));

module.exports = app;
