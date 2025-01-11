import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import DataInput from './components/DataInput';
import Visualization from './components/Visualization';
import Chat from './components/Chat';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // 管理者かどうか

  const handleLogin = (username, password) => {
    // ここでログイン処理を行う（API連携など）
    if (username === 'admin' && password === 'password') { // 仮の認証
      setIsLoggedIn(true);
      setIsAdmin(true);
    } else if (username === 'user' && password === 'password') {
        setIsLoggedIn(true);
        setIsAdmin(false);
    } else {
      alert('認証に失敗しました。');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          {isAdmin && <DataInput />} {/* 管理者のみデータ入力画面を表示 */}
          <Visualization />
          <Chat />
        </div>
      )}
    </div>
  );
}

export default App;
