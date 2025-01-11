# Gemini APIとワードクラウドを活用した5教科テスト可視化Webシステム プロジェクト
このプロジェクトは、既存の学生情報管理システム（student_info_system）を拡張し、Gemini APIとワードクラウドを用いてテスト結果を多角的に分析・可視化するWebシステムを開発する。

## 機能
1. フォームからのテスト結果入力
2. データベースへのテスト結果保存
3. Gemini APIによるテスト結果の分析とレポート生成
4. Chart.jsを用いたグラフ表示（棒グラフ、折れ線グラフ、円グラフなど）
5. ワードクラウドによるテスト結果の可視化
6. ユーザー認証機能（ログイン、ログアウト）
## 前提条件
1. Node.jsがインストール済みであること
2. PostgreSQLサーバーが動作していること
3. 基本的なターミナル／コマンドライン操作ができること
## インストール手順
1. リポジトリをクローン
```Bash
git clone https://github.com/yourusername/gemini-test-visualization.git
```
2. プロジェクトディレクトリに移動
```Bash
cd gemini-test-visualization
```
3. 必要なモジュールをインストール
```Bash
npm install
```
## 使用方法
1. サーバーを起動
```Bash
npm run dev #開発モード
```
または
npm start # 本番モード
ブラウザで以下のURLにアクセス
```URL
http://localhost:5000
```
スキーマ (PostgreSQL)
```SQL_users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```
```SQL_subjects
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);
```
```SQL_scores
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    subject_id INTEGER REFERENCES subjects(id),
    score INTEGER NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);
```
## 開発環境と使用言語
1. OS：Ubuntu 20.04 (推奨)
2. 開発ツール：Node.js 12.22.9, PostgreSQL, Docker
3. フロントエンド：HTML5, CSS3
4. フレームワーク：React.js
5. バックエンド：JavaScript(ES6+), TypeScript
6. フレームワーク：Node.js (Express.js)
## 依存関係：
```JSON_package.json (backend)
{
  "dependencies": {
    "express": "^4.18.2",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "pg": "^8.11.3",
    "dotenv":"^16.3.1",
    "googleapis": "^126.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "scripts":{
    "start":"node backend/app.js",
    "dev":"nodemon backend/app.js"
  }
}
```
```JSON_package.json (frontend):
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "chart.js": "^4.4.0",
    "web-vitals": "^2.1.4",
    "axios": "^1.6.0",
    "recharts": "^2.9.0"
  },
    "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```
## APIエンドポイント設計
/api/users: ユーザー登録、ログイン、ユーザー情報取得など
/api/scores: 点数登録、取得、更新、削除など
/api/reports: レポート生成、取得など（Gemini APIと連携）
### Gemini API連携
Gemini APIを使用して、点数データから洞察に満ちた文章を生成したり、レポートの文章を生成したりします。例えば、「過去の点数推移から、数学が苦手な傾向が見られるため、集中的な対策が必要です」といったアドバイスを生成することが可能です。

### ワードクラウド連携
テスト結果のキーワードを抽出し、ワードクラウドとして可視化します。これにより、生徒の弱点や傾向を視覚的に把握できます。

## 今後の開発予定と開発タスク (4日間・1day8h想定)
### 1日目: 環境構築とデータベース設計、バックエンドAPIの基本実装
Node.js、PostgreSQL、React.jsの開発環境構築
PostgreSQLデータベースのスキーマ定義と作成
Express.jsを用いたバックエンドAPIの基本構造作成 (ルーティング、モデル)
/api/users (登録、ログイン) の実装
### 2日目: バックエンドAPIのスコア関連機能実装、フロントエンドの基本構成
/api/scores (登録、取得、更新、削除) の実装
フロントエンド (React.js) のプロジェクト作成と基本構成の作成
点数入力フォームの作成
### 3日目: Gemini API連携、レポート生成機能実装
Gemini APIとの連携処理実装 (バックエンド)
レポート生成API (/api/reports) の実装
フロントエンドでのレポート表示機能実装
### 4日目: ワードクラウド連携、グラフ表示、テスト、デプロイ準備
ワードクラウド生成ライブラリの導入と実装
Chart.jsを用いたグラフ表示機能の実装
各機能のテスト
デプロイ準備 (クラウド環境へのデプロイ設定など)
