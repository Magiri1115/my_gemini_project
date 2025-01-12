//点数入力フォーム
import React, { useState } from 'react';

function ScoreInput() {
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: userId, subject: subject, scoreValue: score})
        })
        const data = await response.json()
        console.log("data",data)
        setSubject('');
        setScore('');
        setUserId('');
    } catch (error) {
        console.error("error",error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="userId">ユーザーID</label>
        <input type="number" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <label htmlFor="subject">教科:</label>
      <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <label htmlFor="score">点数:</label>
      <input type="number" id="score" value={score} onChange={(e) => setScore(e.target.value)} />
      <button type="submit">送信</button>
    </form>
  );
