//レポートデータを受け取る。データベースのreportテーブルに新しいレポートを登録。
/*
 *createReport関数を用いてDBにデータを挿入した結果をコンソールに表示

const reportData = {
    user_id: 123,
    report_data: { analysis: "some analysis result" }
};
const createdReport = await createReport(reportData, pool);
console.log(createdReport); // 挿入されたレポートのデータが出力される
*/
const createReport = async function (report, pool) {
    const {user_id, report_data} = report
    try {
        const res = await pool.query('INSERT INTO reports (user_id, report_data) VALUES ($1, $2) RETURNING *', [user_id, report_data])
        return res.rows[0]
    } catch (error) {
        throw error
    }
}
//ユーザーIDを受け取る。IDに対応するレポートデータをDBから取得。
const getReportsByUserId = async function (userId, pool) {
    try {
        const res = await pool.query('SELECT * FROM reports WHERE user_id = $1', [userId])
        return res.rows
    } catch (error) {
        throw error
    }
}
module.exports = {createReport, getReportsByUserId}

// 難易度分析
const updateReportDifficulty = async function (reportId, difficulty, pool) {
    try {
        const res = await pool.query('UPDATE reports SET difficulty = $1 WHERE id = $2 RETURNING *', [difficulty, reportId])
        return res.rows[0]
    } catch (error) {
        throw error
    }
}
module.exports = {createReport, getReportsByUserId, updateReportDifficulty}
