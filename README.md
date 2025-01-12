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
git clone https://github.com/Magiri1115/my_gemini_project
```
2. プロジェクトディレクトリに移動
```Bash
cd my_gemini_project
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
```Bash
npm start # 本番モード
```
ブラウザで以下のURLにアクセス
```URL
http://localhost:5000
```
スキーマ (PostgreSQL)
```PostgreSQL_users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,  -- 自動インクリメントする主キー
    username VARCHAR(255) UNIQUE NOT NULL, -- 重複しないユーザー名 (NULL不可)
    email VARCHAR(255) UNIQUE,           -- 重複しないメールアドレス
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP -- 作成日時 (デフォルトは現在時刻)
    weak_subjects TEXT[]
);
```
```PostgreSQL_scores
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id), -- usersテーブルのidを参照する外部キー
    subject VARCHAR(255),
    score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    topics INTEGER[]
);
```
```PostgreSQL_reports
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id)
    report_data JSONB, -- JSON形式のレポートデータ
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    difficulty INTEGER
);
```
テキストデータから抽出されたトピックとその間の関係性を格納するテーブル
| id | name        |
| -- | ----------- |
| 1  | 2次関数      |
| 2  | 微分積分     |
| 3  | ベクトル      |
| 4  | 三角関数      |
| 5  | 数列         |
```PostgreSQL_topics
CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);
```
トピック間の共起関係（同時に出現する関係）を格納
| id | topic1_id | topic2_id | count |
| -- | --------- | --------- | ----- |
| 1  | 1         | 2         | 5     | （2次関数と微分積分が5回同時に出現）
| 2  | 1         | 4         | 2     | （2次関数と三角関数が2回同時に出現）
| 3  | 2         | 3         | 3     | （微分積分とベクトルが3回同時に出現）
```PostgreSQL_cooccurrence
CREATE TABLE cooccurrence (
    id SERIAL PRIMARY KEY,
    topic1_id INTEGER REFERENCES topics(id),
    topic2_id INTEGER REFERENCES topics(id),
    count INTEGER DEFAULT 0,
    UNIQUE(topic1_id, topic2_id)
);
```
## 開発環境と使用言語
1. OS：Ubuntu 20.04
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
テキストデータの前処理として名詞と動詞のみを抽出します。

## システム設計
1. データ収集・前処理: 過去問のテキストデータ、生徒の成績データ、AIが把握している苦手分野データを収集します。テキストデータはJanomeで前処理を行います。
2. Gemini API連携:問題文をGemini APIに送信し、難易度分析、トピック抽出、解答ヒント生成を行います。抽出されたトピックやキーワード間の関係性データを取得します。
3. データ保存: Gemini APIからの分析結果、前処理されたテキストデータ、成績データなどをデータベースに保存します。
4.  Webアプリケーション:
フロントエンド：ユーザーインターフェース（成績グラフ、ワードクラウド、共起ネットワーク表示、問題表示など）を実装します。JavaScript、HTML/CSS、Chart.jsなどを使用します。
バックエンド：データベースとの連携、Gemini APIとの通信、ワードクラウド生成、共起ネットワークデータ生成などの処理を行います。Python、Node.js、Ruby on RailsなどのWebアプリケーションフレームワークを使用します。
5. AIモデル（苦手分野把握）: 既存のAIモデルから苦手分野情報を取得します。

### 具体的な設計:
1. データベース: 過去問データ（問題文、分野、難易度、関連トピックなど）、生徒の成績データ、キーワードデータ、共起ネットワークデータなどを格納します。
2. APIエンドポイント: フロントエンドとバックエンド間の通信を行うためのAPIエンドポイントを設計します。例えば、get_wordcloud（ワードクラウドデータ取得）、get_cooccurrence_network（共起ネットワークデータ取得）、get_hint（解答ヒント取得）などのエンドポイントが考えられます。
3. フロントエンド: Reactなどのフレームワークを用いて、コンポーネントベースでUIを構築します。成績グラフコンポーネント、ワードクラウドコンポーネント、共起ネットワークコンポーネント、問題表示コンポーネントなどを組み合わせます。
4. バックエンド: PythonのFlaskやDjango、Node.jsのExpressなどを用いて、APIエンドポイントを実装します。Gemini APIとの通信、データベースとの連携、データ処理などを行います。

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
