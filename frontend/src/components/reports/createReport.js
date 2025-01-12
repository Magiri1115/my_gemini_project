//レポート作成API呼び出し関数
import axios from 'axios';

const createReport = async function (userId, prompt) {
    try {
        const response = await axios.post('/api/reports', { userId, prompt });
        return response.data;
    } catch (error) {
        console.error("レポート作成エラー:", error);
        throw error;
    }
};

export default createReport;
