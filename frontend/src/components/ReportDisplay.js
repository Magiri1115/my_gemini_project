/*
 *レポートの生成と取得を行う機能。
 */
import React, { useState } from 'react';
 // api/reportsから関数をインポート
import { getReports, createReport } from './api/reports/reportsApi';

//report: APIから取得したレポートデータを格納。
//userId: ユーザーIDの入力値を格納。
//prompt: プロンプトの入力値を格納。
// エラー状態を追加
// ロード状態を追加
function ReportDisplay() {
  const [report, setReport] = useState(null);
  const [userId, setUserId] = useState('');
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

//エンドポイントにPOSTリクエストを送信。レポートの生成を要求。
  const handleGenerateReport = async function () {
    setLoading(true); // ロード開始
    setError(null); // エラーをリセット
　　try {
	const data = await createReport(userId, prompt);
	setRepport(data.report_data);
　　} catch (err) {
      console.error("レポート生成エラー:", err);
      setError("レポートの生成に失敗しました。"); // エラーメッセージを設定	
    } finally {
      setLoading(false); // ロード終了
    }
  };
//ユーザーIDを使ってAPIからレポートを取得
  const handleGetReports = async function () {
    setLoading(true); // ロード開始
    setError(null); // エラーをリセット
    try {
      const data = await getReports(userId);
      console.log("取得データ", data);
      setReport(JSON.stringify(data, null, 2)); // 取得したレポート(JSONデータ)を整形表示
    } catch (err) {
      console.error("レポート取得エラー:", err);
      setError("レポートの取得に失敗しました。"); // エラーメッセージを設定
    } finally {
      setLoading(false); // ロード終了
    }
  };
  // userIdが変更されたらレポートをクリアする。
  userEffect ( function () {
    setReport(null);
  }, [userId]);

  return (
    <div>
      <div>
        <label htmlFor="userId">ユーザーID</label>
        <input
          type="number"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <label htmlFor="prompt">プロンプト:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleGenerateReport} disabled={loading}>レポート生成</button>
        <button onClick={handleGetReports} disabled={loading}>レポート取得</button>
            </div>
            {loading && <p>ロード中...</p>} {/* ロード中メッセージ */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* エラーメッセージ */}
            {report && (
          <div>
          <h2>レポート:</h2>
          <pre>{report}</pre>
        </div>
      )}
    </div>
  );
}
export default ReportDisplay;
