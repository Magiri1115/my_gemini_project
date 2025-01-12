// 共起ネットワーク表示コンポーネント
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CooccurrenceNetwork = function () {
    const chartRef = useRef(null);

    useEffect( function () {
        const createChart = function () {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'scatter', // ネットワーク図は散布図で表現
                data: {
                    datasets: [{
                        label: 'Co-occurrence Network',
                        data: [
                            { x: 10, y: 20, r: 5 }, // r は点の半径
                            { x: 30, y: 40, r: 10 },
                            // ... 共起データに基づいて座標と半径を設定
                        ],
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom'
                        },
                        y: {
                            type: 'linear',
                            position: 'left'
                        }
                    }
                }
            });
        };

        if (chartRef && chartRef.current) {
            createChart();
        }
    }, []);

    return <canvas ref={chartRef} />;
};

export default CooccurrenceNetwork;
