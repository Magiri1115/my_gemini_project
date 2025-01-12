//DBに登録し、登録されたスコアデータを返す
const createScore = async function(score, pool) {
    const {userId, subject, scoreValue} = score;
    try {
        const res = await pool.query('INSERT INTO scores (user_id, subject, score) VALUES ($1, $2, $3) RETURNING *', [userId, subject, scoreValue]);
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};
//スコアデータをDBから取得し、スコアデータの配列を返す。
const getScores = async function(userId, pool) {
    try {
        const res = await pool.query('SELECT * FROM scores WHERE user_id = $1', [userId]);
        return res.rows;
    } catch (error) {
        throw error;
    }
};
//データベースの該当スコアを更新し、更新後のスコア情報を返す。
const updateScore = async function(scoreId, score, pool) {
    const {subject, scoreValue} = score;
    try {
        const res = await pool.query('UPDATE scores SET subject = $1, score = $2 WHERE id = $3 RETURNING *', [subject, scoreValue, scoreId]);
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};
//スコアIDを受け取る。データベースから該当スコアを削除する。
const deleteScore = async function(scoreId, pool) {
    try {
        const res = await pool.query('DELETE FROM scores WHERE id = $1', [scoreId]);
        return res;
    } catch (error) {
        throw error;
    }
};

module.exports = {createScore, getScores, updateScore, deleteScore};
