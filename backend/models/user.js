const { Pool } = require('pg');

async function registerUser(userData, pool) {
  try {
    const client = await pool.connect();
    // ユーザー登録処理（例）
    const result = await client.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [userData.username, userData.password]);
    client.release();
    return result.rows[0];
  } catch (error) {
    throw error; // エラーを上位に伝播
  }
}

async function loginUser(userData, pool) {
  try {
    const client = await pool.connect();
    // ログイン処理（例）
    const result = await client.query('SELECT * FROM users WHERE username = $1', [userData.username]);
    client.release();
    if (result.rows.length > 0) {
      return result.rows[0]; // ユーザー情報を返す
    } else {
      throw new Error('Invalid credentials'); // 認証失敗
    }
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId, pool) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
        client.release();
        return result.rows[0] || null; // ユーザーが見つからない場合はnullを返す
    } catch (error) {
        throw error;
    }
}

module.exports = { registerUser, loginUser, getUserById };
