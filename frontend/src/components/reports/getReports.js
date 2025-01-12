//レポート取得API呼び出し関数
import axios from 'axios'; // 必要に応じてaxiosなどのHTTPクライアントを使用

const getReports = async function (userId) {
    try {
        const response = await axios.get(`/api/reports/${userId}`);
        return response.data;
    } catch (error) {
        console.error("レポート取得エラー:", error);
        throw error; // エラーを上位に伝播
    }
};

export default getReports;
