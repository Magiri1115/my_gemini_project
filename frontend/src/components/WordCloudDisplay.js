// ワードクラウド表示コンポーネント
import React, { useState } from 'react';

function WordCloudDisplay() {
    const [wordcloudImage, setWordcloudImage] = useState(null);
    const [text, setText] = useState('');

    const generateWordcloud = async function () {
        try {
            const response = await fetch('/api/wordcloud', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });
            const data = await response.json();
            setWordcloudImage(data.image);
        } catch (error) {
            console.error("Error generating wordcloud:", error);
        }
    };

    return (
        <div>
            <label htmlFor="text">テキスト:</label>
            <textarea id="text" value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={generateWordcloud}>ワードクラウド生成</button>
            {wordcloudImage && (
                <img src={`data:image/png;base64,${wordcloudImage}`} alt="Word Cloud" />
            )}
        </div>
    );
}

export default WordCloudDisplay;
