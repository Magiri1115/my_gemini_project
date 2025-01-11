const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const userRoutes = require('./routes/users');
const scoreRoutes = require('./routes/scores');
const reportRoutes = require('./routes/reports'); // reportRoutesを追加
const dbConfig = require('./config/db');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config(); // .envファイルの読み込み
const pool = new Pool(dbConfig); // config/db.jsから接続情報を取得


//クエリの実行をする関数
async function queryDatabase() {
  try {
    const client = await pool.connect(); // クライアントを取得
    const result = await client.query('SELECT * FROM your_table'); // クエリを実行
    console.log(result.rows); // 結果を表示
    client.release(); // クライアントを解放
  } catch (err) {
    console.error('Error executing query', err);
  }
}
queryDatabase();

// SQLインジェクション対策
async function getUser(userId) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
    console.log(result.rows);
    client.release();
  } catch (err) {
    console.error('Error executing query', err);
  }
}
getUser(1);

queryDatabase();
app.use(cors());
app.use(bodyParser.json());

// ルーティング
app.use('/api/users', userRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/reports', reportRoutes); // reportRoutesを使用

// ルートエンドポイント（テスト用）
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app; // テスト用
